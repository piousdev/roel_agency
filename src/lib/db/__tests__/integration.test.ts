/**
 * @fileoverview Integration tests for database schema and connections.
 * These tests use an in-memory SQLite database to verify schema integrity.
 * @module lib/db/__tests__/integration.test
 */

import { createClient } from "@libsql/client";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import * as schema from "../schema";

describe("database integration", () => {
  // Create an in-memory database for testing
  const client = createClient({ url: ":memory:" });
  const db = drizzle(client, { schema });

  beforeAll(async () => {
    // Create tables manually for testing
    await client.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        email_verified INTEGER NOT NULL DEFAULT 0,
        image TEXT,
        created_at INTEGER NOT NULL DEFAULT (unixepoch()),
        updated_at INTEGER NOT NULL DEFAULT (unixepoch())
      )
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY NOT NULL,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token TEXT NOT NULL UNIQUE,
        expires_at INTEGER NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        created_at INTEGER NOT NULL DEFAULT (unixepoch()),
        updated_at INTEGER NOT NULL DEFAULT (unixepoch())
      )
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS accounts (
        id TEXT PRIMARY KEY NOT NULL,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        account_id TEXT NOT NULL,
        provider_id TEXT NOT NULL,
        access_token TEXT,
        refresh_token TEXT,
        access_token_expires_at INTEGER,
        refresh_token_expires_at INTEGER,
        scope TEXT,
        password TEXT,
        created_at INTEGER NOT NULL DEFAULT (unixepoch()),
        updated_at INTEGER NOT NULL DEFAULT (unixepoch())
      )
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS verifications (
        id TEXT PRIMARY KEY NOT NULL,
        identifier TEXT NOT NULL,
        value TEXT NOT NULL,
        expires_at INTEGER NOT NULL,
        created_at INTEGER NOT NULL DEFAULT (unixepoch()),
        updated_at INTEGER NOT NULL DEFAULT (unixepoch())
      )
    `);
  });

  afterAll(async () => {
    client.close();
  });

  describe("users table", () => {
    it("should insert and query a user", async () => {
      const userId = "test-user-1";

      await db.insert(schema.users).values({
        id: userId,
        name: "Test User",
        email: "test@example.com",
        emailVerified: false,
      });

      const users = await db.select().from(schema.users);
      expect(users).toHaveLength(1);
      expect(users[0]?.name).toBe("Test User");
    });
  });

  describe("sessions table with foreign key", () => {
    it("should insert a session linked to a user", async () => {
      const sessionId = "test-session-1";
      const userId = "test-user-1";

      await db.insert(schema.sessions).values({
        id: sessionId,
        userId: userId,
        token: "test-token-123",
        expiresAt: new Date(Date.now() + 86400000),
      });

      const sessions = await db.select().from(schema.sessions);
      expect(sessions).toHaveLength(1);
      expect(sessions[0]?.userId).toBe(userId);
    });

    it("should cascade delete sessions when user is deleted", async () => {
      // Create a new user and session for this test
      const userId = "test-user-cascade";
      const sessionId = "test-session-cascade";

      await db.insert(schema.users).values({
        id: userId,
        name: "Cascade Test",
        email: "cascade@example.com",
      });

      await db.insert(schema.sessions).values({
        id: sessionId,
        userId: userId,
        token: "cascade-token",
        expiresAt: new Date(Date.now() + 86400000),
      });

      // Delete the user
      await db.delete(schema.users).where(sql`id = ${userId}`);

      // Session should be deleted due to CASCADE
      const sessions = await db
        .select()
        .from(schema.sessions)
        .where(sql`id = ${sessionId}`);
      expect(sessions).toHaveLength(0);
    });
  });

  describe("accounts table with foreign key", () => {
    it("should insert an account linked to a user", async () => {
      const accountId = "test-account-1";
      const userId = "test-user-1";

      await db.insert(schema.accounts).values({
        id: accountId,
        userId: userId,
        accountId: "oauth-123",
        providerId: "google",
      });

      const accounts = await db.select().from(schema.accounts);
      expect(accounts).toHaveLength(1);
      expect(accounts[0]?.providerId).toBe("google");
    });

    it("should cascade delete accounts when user is deleted", async () => {
      // Create a new user and account for this test
      const userId = "test-user-account-cascade";
      const accountId = "test-account-cascade";

      await db.insert(schema.users).values({
        id: userId,
        name: "Account Cascade Test",
        email: "account-cascade@example.com",
      });

      await db.insert(schema.accounts).values({
        id: accountId,
        userId: userId,
        accountId: "oauth-cascade",
        providerId: "github",
      });

      // Delete the user
      await db.delete(schema.users).where(sql`id = ${userId}`);

      // Account should be deleted due to CASCADE
      const accounts = await db
        .select()
        .from(schema.accounts)
        .where(sql`id = ${accountId}`);
      expect(accounts).toHaveLength(0);
    });
  });

  describe("verifications table", () => {
    it("should insert and query a verification", async () => {
      const verificationId = "test-verification-1";

      await db.insert(schema.verifications).values({
        id: verificationId,
        identifier: "test@example.com",
        value: "verification-token-123",
        expiresAt: new Date(Date.now() + 3600000),
      });

      const verifications = await db.select().from(schema.verifications);
      expect(verifications).toHaveLength(1);
      expect(verifications[0]?.identifier).toBe("test@example.com");
    });
  });
});
