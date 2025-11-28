# Authentication Module

Authentication system using Better Auth with Drizzle adapter.

## Overview

This module provides:

- **Better Auth** - Modern authentication library
- **Drizzle adapter** - Type-safe database integration
- **Email/password** - Traditional credential authentication
- **Session management** - Secure cookie-based sessions

## Directory Structure

```
src/lib/
├── auth.ts            # Server-side auth configuration
├── auth-client.ts     # Client-side auth utilities
└── auth/
    └── README.md
```

## Server Configuration

```typescript
// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "@/env";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite", schema }),
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  baseURL: env.NEXT_PUBLIC_APP_URL,
  secret: env.BETTER_AUTH_SECRET,
});
```

## Client Usage

```typescript
// In React components
import { authClient } from "@/lib/auth-client";

// Sign up
await authClient.signUp.email({
  email: "user@example.com",
  password: "securepassword",
  name: "John Doe",
});

// Sign in
await authClient.signIn.email({
  email: "user@example.com",
  password: "securepassword",
});

// Get session
const session = await authClient.getSession();

// Sign out
await authClient.signOut();
```

## API Routes

Authentication is handled via Hono at `/api/auth/*`:

| Endpoint                   | Method | Description            |
| -------------------------- | ------ | ---------------------- |
| `/api/auth/sign-up/email`  | POST   | Register new user      |
| `/api/auth/sign-in/email`  | POST   | Sign in with email     |
| `/api/auth/sign-out`       | POST   | Sign out               |
| `/api/auth/session`        | GET    | Get current session    |
| `/api/auth/user`           | GET    | Get current user       |

## Environment Variables

| Variable              | Required | Description                        |
| --------------------- | -------- | ---------------------------------- |
| `BETTER_AUTH_SECRET`  | Yes      | Secret key for signing (min 32 chars) |
| `NEXT_PUBLIC_APP_URL` | Yes      | Base URL for auth callbacks        |

## Security Features

- **Password hashing** - bcrypt with configurable rounds
- **Session cookies** - HttpOnly, Secure, SameSite=Lax
- **CSRF protection** - Built-in token validation
- **Session caching** - 5-minute cookie cache for performance
