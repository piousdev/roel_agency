/**
 * @fileoverview Unit tests for authentication validation schemas.
 * @module lib/validations/__tests__/auth.test
 */

import { describe, expect, it } from "vitest";

import {
  ResetPasswordRequestSchema,
  ResetPasswordSchema,
  SignInSchema,
  SignUpSchema,
  UpdateProfileSchema,
} from "../auth";

describe("SignUpSchema", () => {
  it("should validate valid signup data", () => {
    const result = SignUpSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "securepassword123",
    });
    expect(result.success).toBe(true);
  });

  it("should reject short name", () => {
    const result = SignUpSchema.safeParse({
      name: "J",
      email: "john@example.com",
      password: "securepassword123",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid email", () => {
    const result = SignUpSchema.safeParse({
      name: "John Doe",
      email: "not-an-email",
      password: "securepassword123",
    });
    expect(result.success).toBe(false);
  });

  it("should reject short password", () => {
    const result = SignUpSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "short",
    });
    expect(result.success).toBe(false);
  });

  it("should trim name whitespace", () => {
    const result = SignUpSchema.parse({
      name: "  John Doe  ",
      email: "john@example.com",
      password: "securepassword123",
    });
    expect(result.name).toBe("John Doe");
  });
});

describe("SignInSchema", () => {
  it("should validate valid signin data", () => {
    const result = SignInSchema.safeParse({
      email: "john@example.com",
      password: "anypassword",
    });
    expect(result.success).toBe(true);
  });

  it("should reject empty password", () => {
    const result = SignInSchema.safeParse({
      email: "john@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
  });
});

describe("ResetPasswordRequestSchema", () => {
  it("should validate valid email", () => {
    const result = ResetPasswordRequestSchema.safeParse({
      email: "john@example.com",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid email", () => {
    const result = ResetPasswordRequestSchema.safeParse({
      email: "invalid",
    });
    expect(result.success).toBe(false);
  });
});

describe("ResetPasswordSchema", () => {
  it("should validate matching passwords", () => {
    const result = ResetPasswordSchema.safeParse({
      token: "reset-token-123",
      password: "newpassword123",
      confirmPassword: "newpassword123",
    });
    expect(result.success).toBe(true);
  });

  it("should reject non-matching passwords", () => {
    const result = ResetPasswordSchema.safeParse({
      token: "reset-token-123",
      password: "newpassword123",
      confirmPassword: "differentpassword",
    });
    expect(result.success).toBe(false);
  });

  it("should reject short password", () => {
    const result = ResetPasswordSchema.safeParse({
      token: "reset-token-123",
      password: "short",
      confirmPassword: "short",
    });
    expect(result.success).toBe(false);
  });
});

describe("UpdateProfileSchema", () => {
  it("should validate valid profile update", () => {
    const result = UpdateProfileSchema.safeParse({
      name: "New Name",
      image: "https://example.com/image.jpg",
    });
    expect(result.success).toBe(true);
  });

  it("should allow partial updates", () => {
    const result = UpdateProfileSchema.safeParse({
      name: "New Name",
    });
    expect(result.success).toBe(true);
  });

  it("should allow empty object", () => {
    const result = UpdateProfileSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("should reject invalid image URL", () => {
    const result = UpdateProfileSchema.safeParse({
      image: "not-a-url",
    });
    expect(result.success).toBe(false);
  });
});
