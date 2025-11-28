/**
 * @fileoverview Unit tests for API error handler.
 * @module lib/api/__tests__/error-handler.test
 */

import { describe, expect, it } from "vitest";

import { AppError, ErrorCode } from "../error-handler";

describe("AppError", () => {
  it("should create an error with status code and code", () => {
    const error = new AppError(400, ErrorCode.BAD_REQUEST, "Bad request");

    expect(error.statusCode).toBe(400);
    expect(error.code).toBe("BAD_REQUEST");
    expect(error.message).toBe("Bad request");
    expect(error.name).toBe("AppError");
  });

  it("should accept optional details", () => {
    const details = { field: "email", reason: "invalid" };
    const error = new AppError(
      400,
      ErrorCode.VALIDATION_ERROR,
      "Validation failed",
      details,
    );

    expect(error.details).toEqual(details);
  });
});

describe("ErrorCode", () => {
  it("should have all standard error codes", () => {
    expect(ErrorCode.BAD_REQUEST).toBe("BAD_REQUEST");
    expect(ErrorCode.UNAUTHORIZED).toBe("UNAUTHORIZED");
    expect(ErrorCode.FORBIDDEN).toBe("FORBIDDEN");
    expect(ErrorCode.NOT_FOUND).toBe("NOT_FOUND");
    expect(ErrorCode.CONFLICT).toBe("CONFLICT");
    expect(ErrorCode.VALIDATION_ERROR).toBe("VALIDATION_ERROR");
    expect(ErrorCode.INTERNAL_ERROR).toBe("INTERNAL_ERROR");
    expect(ErrorCode.SERVICE_UNAVAILABLE).toBe("SERVICE_UNAVAILABLE");
  });
});
