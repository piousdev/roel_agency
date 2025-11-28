/**
 * @fileoverview Unit tests for schema barrel exports.
 * @module lib/db/schema/__tests__/index.test
 */

import { describe, expect, it } from "vitest";

import * as schema from "../index";

describe("schema barrel exports", () => {
  it("should export users table", () => {
    expect(schema.users).toBeDefined();
  });

  it("should export sessions table", () => {
    expect(schema.sessions).toBeDefined();
  });

  it("should export accounts table", () => {
    expect(schema.accounts).toBeDefined();
  });

  it("should export verifications table", () => {
    expect(schema.verifications).toBeDefined();
  });

  it("should export all four tables", () => {
    const tableKeys = ["users", "sessions", "accounts", "verifications"];
    for (const key of tableKeys) {
      expect(schema).toHaveProperty(key);
    }
  });
});
