/**
 * @fileoverview Type-safe environment variable validation.
 * Uses t3-env for runtime validation and TypeScript inference.
 * @module env
 *
 * @example
 * ```ts
 * import { env } from "@/env";
 *
 * // Server-side only
 * const dbUrl = env.TURSO_DATABASE_URL;
 *
 * // Client-side accessible
 * const appUrl = env.NEXT_PUBLIC_APP_URL;
 * ```
 */

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod/v4";

export const env = createEnv({
  /**
   * Server-side environment variables schema.
   * These are only available on the server and will throw if accessed on client.
   */
  server: {
    // Node environment
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    // Database (Turso)
    TURSO_DATABASE_URL: z.string().min(1, "TURSO_DATABASE_URL is required"),
    TURSO_AUTH_TOKEN: z.string().optional(),

    // Authentication (Better Auth)
    BETTER_AUTH_SECRET: z
      .string()
      .min(32, "BETTER_AUTH_SECRET must be at least 32 characters"),

    // Logging
    LOG_LEVEL: z
      .enum(["trace", "debug", "info", "warn", "error", "fatal"])
      .default("info"),

    // Error Tracking (Sentry)
    SENTRY_DSN: z.string().url().optional(),
    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
    SENTRY_AUTH_TOKEN: z.string().optional(),
  },

  /**
   * Client-side environment variables schema.
   * These are exposed to the browser and must be prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
    NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  },

  /**
   * Runtime environment variables.
   * Required for Next.js >= 13.4.4.
   */
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },

  /**
   * Skip validation in certain environments.
   * Useful for Docker builds where env vars aren't available at build time.
   */
  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",

  /**
   * Treat empty strings as undefined.
   * Prevents issues with optional env vars that are set but empty.
   */
  emptyStringAsUndefined: true,
});
