/**
 * @fileoverview Accounts table schema definition.
 * @module lib/db/schema/accounts
 */

import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from "./users";

/**
 * Accounts table - OAuth provider and credential connections.
 * Links external identity providers (Google, GitHub, etc.) to user accounts.
 * Also stores hashed passwords for email/password authentication.
 */
export const accounts = sqliteTable("accounts", {
  /** Unique account identifier */
  id: text("id").primaryKey(),

  /** Reference to the user who owns this account */
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  /** External account ID from the OAuth provider */
  accountId: text("account_id").notNull(),

  /** OAuth provider name (e.g., "google", "github", "credential") */
  providerId: text("provider_id").notNull(),

  /** OAuth access token (encrypted at rest by Better Auth) */
  accessToken: text("access_token"),

  /** OAuth refresh token (encrypted at rest by Better Auth) */
  refreshToken: text("refresh_token"),

  /** Unix timestamp when the access token expires */
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),

  /** Unix timestamp when the refresh token expires */
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),

  /** OAuth scope granted by the provider */
  scope: text("scope"),

  /** Hashed password for email/password authentication */
  password: text("password"),

  /** Unix timestamp when account was created */
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),

  /** Unix timestamp when account was last updated */
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

/** Type for selecting an account from the database */
export type Account = typeof accounts.$inferSelect;

/** Type for inserting a new account into the database */
export type NewAccount = typeof accounts.$inferInsert;
