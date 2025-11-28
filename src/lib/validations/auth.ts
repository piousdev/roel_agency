/**
 * @fileoverview Zod validation schemas for authentication.
 * @module lib/validations/auth
 */

import { z } from "zod/v4";

/**
 * Sign up request body schema.
 */
export const SignUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters"),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;

/**
 * Sign in request body schema.
 */
export const SignInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInInput = z.infer<typeof SignInSchema>;

/**
 * Password reset request schema.
 */
export const ResetPasswordRequestSchema = z.object({
  email: z.email("Invalid email address"),
});

export type ResetPasswordRequestInput = z.infer<
  typeof ResetPasswordRequestSchema
>;

/**
 * Password reset confirmation schema.
 */
export const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, "Reset token is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be less than 128 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

/**
 * Update profile schema.
 */
export const UpdateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .optional(),
  image: z.url("Invalid image URL").optional(),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
