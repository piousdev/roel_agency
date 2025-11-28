/**
 * @fileoverview Better Auth server configuration.
 * Configures authentication with Drizzle adapter for Turso.
 * @module lib/auth
 */

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "./db";
import * as schema from "./db/schema";

/**
 * Better Auth instance configured with:
 * - Drizzle adapter for SQLite/Turso database
 * - Email and password authentication
 * - Session-based authentication
 *
 * @example
 * ```ts
 * // In API route
 * import { auth } from "@/lib/auth";
 *
 * app.on(["GET", "POST"], "/auth/*", (c) => {
 *   return auth.handler(c.req.raw);
 * });
 * ```
 */
export const auth = betterAuth({
  /**
   * Database adapter configuration.
   * Uses Drizzle ORM with SQLite provider for Turso compatibility.
   */
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),

  /**
   * Email and password authentication.
   * Enables user registration and login with email/password.
   */
  emailAndPassword: {
    enabled: true,
    /** Minimum password length for security */
    minPasswordLength: 8,
  },

  /**
   * Session configuration.
   */
  session: {
    /** Cookie name for session token */
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },

  /**
   * Base URL for auth callbacks.
   * Used for redirects after authentication.
   */
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",

  /**
   * Secret key for signing tokens.
   * Must be set in production environment.
   */
  secret: process.env.BETTER_AUTH_SECRET,
});

/**
 * Type export for auth instance.
 * Useful for type inference in middleware and handlers.
 */
export type Auth = typeof auth;
