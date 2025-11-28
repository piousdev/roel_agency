/**
 * @fileoverview Unit tests for users table schema.
 * @module lib/db/schema/__tests__/users.test
 */

import { getTableName } from "drizzle-orm";
import { describe, expect, it } from "vitest";

import { users } from "../users";

describe("users schema", () => {
  it("should have correct table name", () => {
    expect(getTableName(users)).toBe("users");
  });

  it("should have required columns", () => {
    const columns = Object.keys(users);

    expect(columns).toContain("id");
    expect(columns).toContain("name");
    expect(columns).toContain("email");
    expect(columns).toContain("emailVerified");
    expect(columns).toContain("image");
    expect(columns).toContain("createdAt");
    expect(columns).toContain("updatedAt");
  });

  it("should have id as primary key", () => {
    expect(users.id.primary).toBe(true);
  });

  it("should have email as unique", () => {
    expect(users.email.isUnique).toBe(true);
  });

  it("should have name as not null", () => {
    expect(users.name.notNull).toBe(true);
  });

  it("should have email as not null", () => {
    expect(users.email.notNull).toBe(true);
  });

  it("should default emailVerified to false", () => {
    expect(users.emailVerified.default).toBe(false);
  });
});
