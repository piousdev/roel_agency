/**
 * @fileoverview Database connection and client initialization.
 * Provides a singleton Drizzle ORM instance connected to Turso/libSQL.
 * @module lib/db
 */

import { type Client, createClient } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";

import * as schema from "./schema";

/**
 * Database configuration from environment variables.
 */
interface DatabaseConfig {
  /** Turso database URL or local file path */
  url: string;
  /** Authentication token for Turso (optional for local) */
  authToken: string | undefined;
}

/**
 * Retrieves and validates database configuration from environment.
 * @throws {Error} If TURSO_DATABASE_URL is not set
 * @returns {DatabaseConfig} Validated database configuration
 */
function getDatabaseConfig(): DatabaseConfig {
  const url = process.env.TURSO_DATABASE_URL;

  if (!url) {
    throw new Error(
      "TURSO_DATABASE_URL is required. " +
        "Set to 'file:local.db' for development or your Turso URL for production.",
    );
  }

  return {
    url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  };
}

/**
 * Creates a libSQL client with the provided configuration.
 * @param {DatabaseConfig} config - Database connection configuration
 * @returns {Client} Configured libSQL client instance
 */
function createDatabaseClient(config: DatabaseConfig): Client {
  return createClient({
    url: config.url,
    authToken: config.authToken,
  });
}

// Initialize database connection
const config = getDatabaseConfig();
const client = createDatabaseClient(config);

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
