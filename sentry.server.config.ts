/**
 * @fileoverview Sentry server-side configuration.
 * Initializes Sentry for Node.js error tracking.
 * @module sentry.server.config
 */

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Performance monitoring sample rate
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Only enable in production with valid DSN
  enabled: process.env.NODE_ENV === "production" && !!process.env.SENTRY_DSN,

  // Debug mode for development
  debug: process.env.NODE_ENV === "development",
});
