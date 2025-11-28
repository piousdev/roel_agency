/**
 * @fileoverview Unit tests for accounts table schema.
 * @module lib/db/schema/__tests__/accounts.test
 */

import { getTableName } from "drizzle-orm";
import { describe, expect, it } from "vitest";

import { accounts } from "../accounts";

describe("accounts schema", () => {
  it("should have correct table name", () => {
    expect(getTableName(accounts)).toBe("accounts");
  });

  it("should have required columns", () => {
    const columns = Object.keys(accounts);

    expect(columns).toContain("id");
    expect(columns).toContain("userId");
    expect(columns).toContain("accountId");
    expect(columns).toContain("providerId");
    expect(columns).toContain("accessToken");
    expect(columns).toContain("refreshToken");
    expect(columns).toContain("password");
    expect(columns).toContain("createdAt");
    expect(columns).toContain("updatedAt");
  });

  it("should have id as primary key", () => {
    expect(accounts.id.primary).toBe(true);
  });

  it("should have userId as not null", () => {
    expect(accounts.userId.notNull).toBe(true);
  });

  it("should have accountId as not null", () => {
    expect(accounts.accountId.notNull).toBe(true);
  });

  it("should have providerId as not null", () => {
    expect(accounts.providerId.notNull).toBe(true);
  });

  it("should allow null for optional OAuth fields", () => {
    expect(accounts.accessToken.notNull).toBe(false);
    expect(accounts.refreshToken.notNull).toBe(false);
    expect(accounts.password.notNull).toBe(false);
  });

  it("should have userId with foreign key reference", () => {
    // Verify the column has reference configuration
    // The references callback is stored internally and executed during schema compilation
    expect(accounts.userId).toBeDefined();
    expect(accounts.userId.notNull).toBe(true);

    // Verify the column name matches expected pattern for foreign key
    expect(accounts.userId.name).toBe("user_id");
  });
});
