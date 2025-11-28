/**
 * @fileoverview Better Auth client for React/Next.js.
 * Provides client-side authentication hooks and utilities.
 * @module lib/auth-client
 */

import { createAuthClient } from "better-auth/react";

/**
 * Better Auth client instance.
 * Provides React hooks for authentication state management.
 *
 * @example
 * ```tsx
 * "use client";
 *
 * import { authClient } from "@/lib/auth-client";
 *
 * export function LoginButton() {
 *   const { signIn } = authClient;
 *
 *   return (
 *     <button onClick={() => signIn.email({ email, password })}>
 *       Sign In
 *     </button>
 *   );
 * }
 * ```
 */
export const authClient = createAuthClient({
  /** Base URL for auth API requests */
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
});

/**
 * Destructured exports for convenience.
 * These can be used directly in components.
 */
export const {
  /** Sign in methods (email, social providers) */
  signIn,
  /** Sign up method for new users */
  signUp,
  /** Sign out method to end session */
  signOut,
  /** Hook to get current session */
  useSession,
} = authClient;
