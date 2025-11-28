/**
 * @fileoverview Vitest configuration for unit testing.
 * @see https://vitest.dev/config/
 */

import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Test file patterns - tests in __tests__ folders
    include: ["src/**/__tests__/**/*.test.ts", "src/**/__tests__/**/*.spec.ts"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/.next/**"],

    // Environment
    environment: "node",
    globals: true,

    // Setup file - runs before all tests
    setupFiles: ["./src/test/setup.ts"],

    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      include: ["src/lib/**/*.ts"],
      exclude: ["**/*.test.ts", "**/*.spec.ts", "**/index.ts"],
    },

    // Cleanup between tests
    clearMocks: true,
    restoreMocks: true,
  },

  // Path aliases matching tsconfig
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
