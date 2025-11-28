/**
 * @fileoverview Barrel export for all database schema definitions.
 * @module lib/db/schema
 */

export type { Account, NewAccount } from "./accounts";
export { accounts } from "./accounts";
export type { NewSession, Session } from "./sessions";
export { sessions } from "./sessions";

// Type exports
export type { NewUser, User } from "./users";
// Table exports
export { users } from "./users";
export type { NewVerification, Verification } from "./verifications";
export { verifications } from "./verifications";
