/**
 * @fileoverview Unit tests for common validation schemas.
 * @module lib/validations/__tests__/index.test
 */

import { describe, expect, it } from "vitest";

import {
  ApiErrorSchema,
  EmailSchema,
  HealthResponseSchema,
  IdSchema,
  PaginationSchema,
  StringSchemas,
} from "../index";

describe("ApiErrorSchema", () => {
  it("should validate valid error response", () => {
    const result = ApiErrorSchema.safeParse({
      error: "NOT_FOUND",
      message: "Resource not found",
      statusCode: 404,
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid status code", () => {
    const result = ApiErrorSchema.safeParse({
      error: "OK",
      message: "Success",
      statusCode: 200,
    });
    expect(result.success).toBe(false);
  });
});

describe("HealthResponseSchema", () => {
  it("should validate valid health response", () => {
    const result = HealthResponseSchema.safeParse({
      ok: true,
      timestamp: new Date().toISOString(),
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid timestamp format", () => {
    const result = HealthResponseSchema.safeParse({
      ok: true,
      timestamp: "not-a-date",
    });
    expect(result.success).toBe(false);
  });
});

describe("PaginationSchema", () => {
  it("should use defaults when not provided", () => {
    const result = PaginationSchema.parse({});
    expect(result.page).toBe(1);
    expect(result.limit).toBe(20);
  });

  it("should coerce string values to numbers", () => {
    const result = PaginationSchema.parse({ page: "2", limit: "50" });
    expect(result.page).toBe(2);
    expect(result.limit).toBe(50);
  });

  it("should reject page less than 1", () => {
    const result = PaginationSchema.safeParse({ page: 0 });
    expect(result.success).toBe(false);
  });

  it("should reject limit greater than 100", () => {
    const result = PaginationSchema.safeParse({ limit: 101 });
    expect(result.success).toBe(false);
  });
});

describe("IdSchema", () => {
  it("should accept valid id", () => {
    const result = IdSchema.safeParse("abc123");
    expect(result.success).toBe(true);
  });

  it("should reject empty string", () => {
    const result = IdSchema.safeParse("");
    expect(result.success).toBe(false);
  });
});

describe("EmailSchema", () => {
  it("should accept valid email", () => {
    const result = EmailSchema.safeParse("test@example.com");
    expect(result.success).toBe(true);
  });

  it("should reject invalid email", () => {
    const result = EmailSchema.safeParse("not-an-email");
    expect(result.success).toBe(false);
  });
});

describe("StringSchemas", () => {
  describe("required", () => {
    it("should reject empty string", () => {
      const result = StringSchemas.required.safeParse("");
      expect(result.success).toBe(false);
    });

    it("should trim whitespace", () => {
      const result = StringSchemas.required.parse("  hello  ");
      expect(result).toBe("hello");
    });
  });

  describe("name", () => {
    it("should reject name less than 2 chars", () => {
      const result = StringSchemas.name.safeParse("A");
      expect(result.success).toBe(false);
    });

    it("should accept valid name", () => {
      const result = StringSchemas.name.safeParse("John Doe");
      expect(result.success).toBe(true);
    });
  });

  describe("url", () => {
    it("should accept valid URL", () => {
      const result = StringSchemas.url.safeParse("https://example.com");
      expect(result.success).toBe(true);
    });

    it("should reject invalid URL", () => {
      const result = StringSchemas.url.safeParse("not-a-url");
      expect(result.success).toBe(false);
    });
  });
});
