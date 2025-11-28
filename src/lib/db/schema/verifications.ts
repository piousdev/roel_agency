/**
 * @fileoverview Verifications table schema definition.
 * @module lib/db/schema/verifications
 */

import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Verifications table - temporary verification tokens.
 * Used for email verification, password reset, magic links, etc.
 * Tokens are automatically cleaned up after expiration.
 */
export const verifications = sqliteTable("verifications", {
  /** Unique verification identifier */
  id: text("id").primaryKey(),

  /** Identifier for what is being verified (e.g., email address) */
  identifier: text("identifier").notNull(),

  /** Verification token value (hashed) */
  value: text("value").notNull(),

  /** Unix timestamp when this verification expires */
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),

  /** Unix timestamp when verification was created */
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),

  /** Unix timestamp when verification was last updated */
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

/** Type for selecting a verification from the database */
export type Verification = typeof verifications.$inferSelect;

/** Type for inserting a new verification into the database */
export type NewVerification = typeof verifications.$inferInsert;
