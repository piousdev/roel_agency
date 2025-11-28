import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default withSentryConfig(nextConfig, {
  // Sentry organization and project
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Suppress source map upload logs
  silent: !process.env.CI,

  // Upload source maps for better stack traces
  widenClientFileUpload: true,

  // Tree shake Sentry debug code in production
  disableLogger: true,

  // Automatically instrument API routes
  autoInstrumentServerFunctions: true,

  // Automatically instrument middleware
  autoInstrumentMiddleware: true,

  // Automatically instrument App Router
  autoInstrumentAppDirectory: true,

  // Configure source maps
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },

  // Tunnel Sentry events to avoid ad blockers
  tunnelRoute: "/monitoring",
});
