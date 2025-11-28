/**
 * @fileoverview Global API error handling middleware and utilities.
 * Provides consistent error responses and logging across all API routes.
 * @module lib/api/error-handler
 */

import * as Sentry from "@sentry/nextjs";
import type { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod/v4";

import { logger } from "@/lib/logger";

/**
 * Standard API error response structure.
 */
export interface ApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  details?: unknown;
}

/**
 * Custom application error with HTTP status code.
 */
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}

/**
 * Common error codes.
 */
export const ErrorCode = {
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
} as const;

/**
 * Creates a standardized error response.
 */
function createErrorResponse(
  code: string,
  message: string,
  statusCode: number,
  details?: unknown,
): ApiErrorResponse {
  const response: ApiErrorResponse = {
    error: code,
    message,
    statusCode,
  };

  if (details !== undefined) {
    response.details = details;
  }

  return response;
}

/**
 * Formats Zod validation errors into a readable structure.
 */
function formatZodError(error: ZodError): Record<string, string[]> {
  const formatted: Record<string, string[]> = {};

  for (const issue of error.issues) {
    const path = issue.path.join(".") || "root";
    if (!formatted[path]) {
      formatted[path] = [];
    }
    formatted[path].push(issue.message);
  }

  return formatted;
}

/**
 * Global error handler middleware for Hono.
 * Catches all errors and returns consistent JSON responses.
 *
 * @example
 * ```ts
 * const app = new Hono();
 * app.onError(errorHandler);
 * ```
 */
export function errorHandler(err: Error, c: Context): Response {
  const requestId = c.req.header("x-request-id") ?? crypto.randomUUID();

  // Log error with context
  logger.error(
    {
      err,
      requestId,
      path: c.req.path,
      method: c.req.method,
    },
    "API error occurred",
  );

  // Report to Sentry (non-client errors only)
  if (!(err instanceof AppError && err.statusCode < 500)) {
    Sentry.captureException(err, {
      extra: {
        requestId,
        path: c.req.path,
        method: c.req.method,
      },
    });
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return c.json(
      createErrorResponse(
        ErrorCode.VALIDATION_ERROR,
        "Validation failed",
        400,
        formatZodError(err),
      ),
      400,
    );
  }

  // Handle custom application errors
  if (err instanceof AppError) {
    return c.json(
      createErrorResponse(err.code, err.message, err.statusCode, err.details),
      err.statusCode as 400 | 401 | 403 | 404 | 500,
    );
  }

  // Handle Hono HTTP exceptions
  if (err instanceof HTTPException) {
    return c.json(
      createErrorResponse(
        ErrorCode.BAD_REQUEST,
        err.message,
        err.status,
        undefined,
      ),
      err.status,
    );
  }

  // Handle unknown errors (don't leak internal details)
  return c.json(
    createErrorResponse(
      ErrorCode.INTERNAL_ERROR,
      "An unexpected error occurred",
      500,
    ),
    500,
  );
}

/**
 * Not found handler for undefined routes.
 *
 * @example
 * ```ts
 * const app = new Hono();
 * app.notFound(notFoundHandler);
 * ```
 */
export function notFoundHandler(c: Context): Response {
  return c.json(
    createErrorResponse(
      ErrorCode.NOT_FOUND,
      `Route ${c.req.method} ${c.req.path} not found`,
      404,
    ),
    404,
  );
}

/**
 * Request logging middleware.
 * Logs incoming requests and response times.
 */
export async function requestLogger(c: Context, next: Next): Promise<void> {
  const requestId = c.req.header("x-request-id") ?? crypto.randomUUID();
  const start = Date.now();

  // Add request ID to response headers
  c.header("x-request-id", requestId);

  logger.info(
    {
      requestId,
      method: c.req.method,
      path: c.req.path,
    },
    "Incoming request",
  );

  await next();

  const duration = Date.now() - start;

  logger.info(
    {
      requestId,
      method: c.req.method,
      path: c.req.path,
      status: c.res.status,
      duration,
    },
    "Request completed",
  );
}
