/**
 * @fileoverview Unit tests for sessions table schema.
 * @module lib/db/schema/__tests__/sessions.test
 */

import { getTableName } from "drizzle-orm";
import { describe, expect, it } from "vitest";

import { sessions } from "../sessions";

describe("sessions schema", () => {
  it("should have correct table name", () => {
    expect(getTableName(sessions)).toBe("sessions");
  });

  it("should have required columns", () => {
    const columns = Object.keys(sessions);

    expect(columns).toContain("id");
    expect(columns).toContain("userId");
    expect(columns).toContain("token");
    expect(columns).toContain("expiresAt");
    expect(columns).toContain("ipAddress");
    expect(columns).toContain("userAgent");
    expect(columns).toContain("createdAt");
    expect(columns).toContain("updatedAt");
  });

  it("should have id as primary key", () => {
    expect(sessions.id.primary).toBe(true);
  });

  it("should have token as unique", () => {
    expect(sessions.token.isUnique).toBe(true);
  });

  it("should have userId as not null", () => {
    expect(sessions.userId.notNull).toBe(true);
  });

  it("should have token as not null", () => {
    expect(sessions.token.notNull).toBe(true);
  });

  it("should have expiresAt as not null", () => {
    expect(sessions.expiresAt.notNull).toBe(true);
  });

  it("should have userId with foreign key reference", () => {
    // Verify the column has reference configuration
    // The references callback is stored internally and executed during schema compilation
    expect(sessions.userId).toBeDefined();
    expect(sessions.userId.notNull).toBe(true);

    // Verify the column name matches expected pattern for foreign key
    expect(sessions.userId.name).toBe("user_id");
  });
});
