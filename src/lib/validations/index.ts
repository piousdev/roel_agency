/**
 * @fileoverview Zod validation schemas for API inputs and responses.
 * @module lib/validations
 */

import { z } from "zod/v4";

/**
 * Standard API error response schema.
 */
export const ApiErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number().int().min(400).max(599),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

/**
 * Standard API success response wrapper.
 */
export const ApiSuccessSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    data: dataSchema,
  });

/**
 * Health check response schema.
 */
export const HealthResponseSchema = z.object({
  ok: z.boolean(),
  timestamp: z.string().datetime(),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;

/**
 * Pagination query parameters schema.
 */
export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type Pagination = z.infer<typeof PaginationSchema>;

/**
 * UUID/CUID identifier schema.
 */
export const IdSchema = z.string().min(1);

/**
 * Email validation schema.
 */
export const EmailSchema = z.email();

/**
 * Common string constraints.
 */
export const StringSchemas = {
  /** Non-empty trimmed string */
  required: z.string().trim().min(1, "This field is required"),
  /** Optional string that can be empty */
  optional: z.string().trim().optional(),
  /** Name field (2-100 chars) */
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  /** URL field */
  url: z.url(),
} as const;
