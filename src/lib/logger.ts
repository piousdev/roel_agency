/**
 * @fileoverview Structured logging with Pino.
 * Provides a singleton logger instance with environment-aware configuration.
 * @module lib/logger
 */

import pino, { type Logger } from "pino";

/**
 * Environment detection.
 * Using process.env directly to avoid circular dependency with env.ts
 */
const NODE_ENV = process.env.NODE_ENV ?? "development";
const isDev = NODE_ENV === "development";

/**
 * Log level configuration.
 * Defaults: debug (development), info (production)
 */
const LOG_LEVEL = process.env.LOG_LEVEL ?? (isDev ? "debug" : "info");

/**
 * Base logger configuration.
 */
const baseConfig: pino.LoggerOptions = {
  level: LOG_LEVEL,
  base: {
    env: NODE_ENV,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => ({ level: label }),
  },
};

/**
 * Creates the logger instance with environment-appropriate transport.
 * - Development: Pretty printed output for readability
 * - Production: JSON output for log aggregation
 */
function createLogger(): Logger {
  if (isDev) {
    return pino({
      ...baseConfig,
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      },
    });
  }

  return pino(baseConfig);
}

/**
 * Singleton logger instance.
 * Use this for all application logging.
 *
 * @example
 * ```ts
 * import { logger } from "@/lib/logger";
 *
 * logger.info({ userId: "123" }, "User logged in");
 * logger.error({ err }, "Failed to process request");
 * logger.debug({ data }, "Debug information");
 * ```
 */
export const logger: Logger = createLogger();

/**
 * Creates a child logger with additional context.
 * Useful for adding request-specific or module-specific context.
 *
 * @param bindings - Additional context to include in all logs
 * @returns Child logger instance
 *
 * @example
 * ```ts
 * const reqLogger = createChildLogger({ requestId: "abc123" });
 * reqLogger.info("Processing request");
 * ```
 */
export function createChildLogger(bindings: pino.Bindings): Logger {
  return logger.child(bindings);
}

/**
 * Log levels available.
 */
export const LogLevel = {
  TRACE: "trace",
  DEBUG: "debug",
  INFO: "info",
  WARN: "warn",
  ERROR: "error",
  FATAL: "fatal",
} as const;

export type LogLevelType = (typeof LogLevel)[keyof typeof LogLevel];
