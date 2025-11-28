/**
 * @fileoverview Hono API route handler for Next.js App Router.
 * Handles all /api/* routes using Hono framework.
 * @module app/api/route
 */

import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

import {
  errorHandler,
  notFoundHandler,
  requestLogger,
} from "@/lib/api/error-handler";
import { auth } from "@/lib/auth";

/**
 * Hono application instance with /api base path.
 * All routes are prefixed with /api automatically.
 */
const app = new Hono().basePath("/api");

/**
 * Global middleware: Request logging.
 */
app.use("*", requestLogger);

/**
 * Global error handlers.
 */
app.onError(errorHandler);
app.notFound(notFoundHandler);

/**
 * CORS middleware for auth routes.
 * Required for cross-origin authentication requests.
 */
app.use(
  "/auth/*",
  cors({
    origin: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  }),
);

/**
 * Health check endpoint.
 * @route GET /api/health
 * @returns {object} Status object with ok boolean and timestamp
 */
app.get("/health", (c) => {
  return c.json({
    ok: true,
    timestamp: new Date().toISOString(),
  });
});

/**
 * Better Auth handler.
 * Handles all authentication routes: /api/auth/*
 * @route GET|POST /api/auth/*
 */
app.on(["GET", "POST"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

// Export handlers for Next.js App Router
export const GET = handle(app);
export const POST = handle(app);
export const OPTIONS = handle(app);
