/**
 * @fileoverview Database connection and client initialization.
 * Provides a singleton Drizzle ORM instance connected to Turso/libSQL.
 * @module lib/db
 */

import { type Client, createClient } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";

import { env } from "@/env";

import * as schema from "./schema";

/**
 * LibSQL client instance connected to Turso.
 * Configuration is validated at startup via t3-env.
 */
const client: Client = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

/**
 * Drizzle ORM database instance with full schema.
 * Use this for all type-safe database operations.
 *
 * @example
 * ```ts
 * import { db } from "@/lib/db";
 * import { users } from "@/lib/db/schema";
 *
 * // Query all users
 * const allUsers = await db.select().from(users);
 *
 * // Relational query
 * const userWithSessions = await db.query.users.findFirst({
 *   with: { sessions: true }
 * });
 * ```
 */
export const db: LibSQLDatabase<typeof schema> = drizzle(client, { schema });

/**
 * Raw libSQL client for direct database access.
 * Prefer using `db` (Drizzle) for type-safe queries.
 * Use only for operations not supported by Drizzle ORM.
 */
export { client };

// Re-export schema for convenience
export * from "./schema";
