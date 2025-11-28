/**
 * @fileoverview Drizzle Kit configuration for database migrations.
 * @see https://orm.drizzle.team/docs/drizzle-config-file
 */

import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // Schema location - glob pattern for modular schema files
  schema: "./src/lib/db/schema/*.ts",

  // Migration output directory
  out: "./drizzle",

  // Database dialect for Turso (libSQL)
  dialect: "turso",

  // Database credentials from environment
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL ?? "file:local.db",
    authToken: process.env.TURSO_AUTH_TOKEN,
  },

  // Enable verbose logging during migrations
  verbose: true,

  // Require confirmation for destructive changes
  strict: true,
});
