/**
 * @fileoverview Sessions table schema definition.
 * @module lib/db/schema/sessions
 */

import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from "./users";

/**
 * Sessions table - active user session tracking.
 * Used for session-based authentication with Better Auth.
 */
export const sessions = sqliteTable("sessions", {
  /** Unique session identifier */
  id: text("id").primaryKey(),

  /** Reference to the user who owns this session */
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  /** Unique session token for validation */
  token: text("token").unique().notNull(),

  /** Unix timestamp when this session expires */
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),

  /** IP address of the client that created the session */
  ipAddress: text("ip_address"),

  /** User agent string of the client browser/app */
  userAgent: text("user_agent"),

  /** Unix timestamp when session was created */
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),

  /** Unix timestamp when session was last updated */
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

/** Type for selecting a session from the database */
export type Session = typeof sessions.$inferSelect;

/** Type for inserting a new session into the database */
export type NewSession = typeof sessions.$inferInsert;
