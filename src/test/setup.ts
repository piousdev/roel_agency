/**
 * @fileoverview Vitest setup file.
 * Sets up environment variables and global test configuration.
 * @module test/setup
 */

// Set required environment variables for tests
process.env.TURSO_DATABASE_URL = "file::memory:";
process.env.BETTER_AUTH_SECRET =
  "test-secret-key-that-is-at-least-32-characters-long";
process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000";
// NODE_ENV is automatically set to "test" by Vitest
