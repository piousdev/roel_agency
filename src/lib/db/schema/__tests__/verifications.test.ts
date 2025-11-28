/**
 * @fileoverview Unit tests for verifications table schema.
 * @module lib/db/schema/__tests__/verifications.test
 */

import { getTableName } from "drizzle-orm";
import { describe, expect, it } from "vitest";

import { verifications } from "../verifications";

describe("verifications schema", () => {
  it("should have correct table name", () => {
    expect(getTableName(verifications)).toBe("verifications");
  });

  it("should have required columns", () => {
    const columns = Object.keys(verifications);

    expect(columns).toContain("id");
    expect(columns).toContain("identifier");
    expect(columns).toContain("value");
    expect(columns).toContain("expiresAt");
    expect(columns).toContain("createdAt");
    expect(columns).toContain("updatedAt");
  });

  it("should have id as primary key", () => {
    expect(verifications.id.primary).toBe(true);
  });

  it("should have identifier as not null", () => {
    expect(verifications.identifier.notNull).toBe(true);
  });

  it("should have value as not null", () => {
    expect(verifications.value.notNull).toBe(true);
  });

  it("should have expiresAt as not null", () => {
    expect(verifications.expiresAt.notNull).toBe(true);
  });
});
