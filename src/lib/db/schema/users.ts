/**
 * @fileoverview Users table schema definition.
 * @module lib/db/schema/users
 */

import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Users table - core user account information.
 * Primary entity for authentication and user management.
 */
export const users = sqliteTable("users", {
  /** Unique identifier (cuid2 format from Better Auth) */
  id: text("id").primaryKey(),

  /** User's display name */
  name: text("name").notNull(),

  /** Unique email address for authentication */
  email: text("email").unique().notNull(),

  /** Whether the email has been verified */
  emailVerified: integer("email_verified", { mode: "boolean" })
    .notNull()
    .default(false),

  /** URL to user's profile image */
  image: text("image"),

  /** Unix timestamp when user was created */
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),

  /** Unix timestamp when user was last updated */
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

/** Type for selecting a user from the database */
export type User = typeof users.$inferSelect;

/** Type for inserting a new user into the database */
export type NewUser = typeof users.$inferInsert;
