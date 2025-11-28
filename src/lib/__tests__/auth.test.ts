/**
 * @fileoverview Unit tests for Better Auth configuration.
 * @module lib/__tests__/auth.test
 */

import { describe, expect, it } from "vitest";

import { auth } from "../auth";

describe("auth configuration", () => {
  it("should export auth instance", () => {
    expect(auth).toBeDefined();
  });

  it("should have handler method", () => {
    expect(auth.handler).toBeDefined();
    expect(typeof auth.handler).toBe("function");
  });

  it("should have api methods", () => {
    expect(auth.api).toBeDefined();
  });
});
