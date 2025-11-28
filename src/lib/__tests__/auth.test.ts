/**
 * @fileoverview Unit tests for Better Auth configuration.
 * @module lib/__tests__/auth.test
 */

import { beforeEach, describe, expect, it, vi } from "vitest";

describe("auth configuration", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  describe("with all environment variables set", () => {
    beforeEach(() => {
      vi.stubEnv("TURSO_DATABASE_URL", "file::memory:");
      vi.stubEnv("BETTER_AUTH_SECRET", "test-secret-key-32-chars-long!!");
      vi.stubEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000");
    });

    it("should export auth instance", async () => {
      const { auth } = await import("../auth");
      expect(auth).toBeDefined();
    });

    it("should have handler method", async () => {
      const { auth } = await import("../auth");
      expect(auth.handler).toBeDefined();
      expect(typeof auth.handler).toBe("function");
    });
  });

  describe("with NEXT_PUBLIC_APP_URL undefined", () => {
    beforeEach(() => {
      vi.stubEnv("TURSO_DATABASE_URL", "file::memory:");
      vi.stubEnv("BETTER_AUTH_SECRET", "test-secret-key-32-chars-long!!");
      delete process.env.NEXT_PUBLIC_APP_URL;
    });

    it("should fall back to default localhost URL", async () => {
      const { auth } = await import("../auth");
      expect(auth).toBeDefined();
    });
  });
});
