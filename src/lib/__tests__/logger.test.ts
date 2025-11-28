/**
 * @fileoverview Unit tests for logger module.
 * @module lib/__tests__/logger.test
 */

import { describe, expect, it } from "vitest";

import { createChildLogger, LogLevel, logger } from "../logger";

describe("logger", () => {
  it("should be defined", () => {
    expect(logger).toBeDefined();
  });

  it("should have standard log methods", () => {
    expect(typeof logger.info).toBe("function");
    expect(typeof logger.error).toBe("function");
    expect(typeof logger.warn).toBe("function");
    expect(typeof logger.debug).toBe("function");
    expect(typeof logger.trace).toBe("function");
    expect(typeof logger.fatal).toBe("function");
  });

  it("should have a level property", () => {
    expect(logger.level).toBeDefined();
  });
});

describe("createChildLogger", () => {
  it("should create a child logger with bindings", () => {
    const child = createChildLogger({ module: "test" });

    expect(child).toBeDefined();
    expect(typeof child.info).toBe("function");
  });

  it("should inherit parent logger level", () => {
    const child = createChildLogger({ requestId: "123" });

    expect(child.level).toBe(logger.level);
  });
});

describe("LogLevel", () => {
  it("should have all standard log levels", () => {
    expect(LogLevel.TRACE).toBe("trace");
    expect(LogLevel.DEBUG).toBe("debug");
    expect(LogLevel.INFO).toBe("info");
    expect(LogLevel.WARN).toBe("warn");
    expect(LogLevel.ERROR).toBe("error");
    expect(LogLevel.FATAL).toBe("fatal");
  });
});
