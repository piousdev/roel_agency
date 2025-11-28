/**
 * @fileoverview Unit tests for Better Auth client configuration.
 * @module lib/__tests__/auth-client.test
 */

import { beforeEach, describe, expect, it, vi } from "vitest";

describe("auth client configuration", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  describe("with NEXT_PUBLIC_APP_URL set", () => {
    beforeEach(() => {
      vi.stubEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000");
    });

    it("should export authClient", async () => {
      const { authClient } = await import("../auth-client");
      expect(authClient).toBeDefined();
    });

    it("should export signIn method", async () => {
      const { signIn } = await import("../auth-client");
      expect(signIn).toBeDefined();
    });

    it("should export signUp method", async () => {
      const { signUp } = await import("../auth-client");
      expect(signUp).toBeDefined();
    });

    it("should export signOut method", async () => {
      const { signOut } = await import("../auth-client");
      expect(signOut).toBeDefined();
    });

    it("should export useSession hook", async () => {
      const { useSession } = await import("../auth-client");
      expect(useSession).toBeDefined();
    });
  });

  describe("with NEXT_PUBLIC_APP_URL undefined", () => {
    beforeEach(() => {
      delete process.env.NEXT_PUBLIC_APP_URL;
    });

    it("should fall back to default localhost URL", async () => {
      const { authClient } = await import("../auth-client");
      expect(authClient).toBeDefined();
    });
  });
});
