# Validations Module

Type-safe input validation using Zod schemas.

## Overview

This module provides:

- **Zod schemas** - Runtime validation with TypeScript inference
- **Reusable patterns** - Common validation schemas
- **API integration** - Automatic error formatting in API routes

## Directory Structure

```
src/lib/validations/
├── index.ts          # Common schemas (pagination, errors, etc.)
├── auth.ts           # Authentication schemas
├── __tests__/        # Unit tests
└── README.md
```

## Common Schemas

### API Response Schemas

```typescript
import { ApiErrorSchema, HealthResponseSchema } from "@/lib/validations";

// Validate API error response
const error = ApiErrorSchema.parse({
  error: "NOT_FOUND",
  message: "Resource not found",
  statusCode: 404,
});

// Health check response
const health = HealthResponseSchema.parse({
  ok: true,
  timestamp: new Date().toISOString(),
});
```

### Pagination Schema

```typescript
import { PaginationSchema } from "@/lib/validations";

// Parse query params (auto-coerces strings)
const pagination = PaginationSchema.parse({
  page: "2",   // → number 2
  limit: "50", // → number 50
});

// Defaults: page=1, limit=20
// Max limit: 100
```

### String Validators

```typescript
import { StringSchemas, EmailSchema, IdSchema } from "@/lib/validations";

// Required non-empty string
StringSchemas.required.parse("hello");

// Name (2-100 chars)
StringSchemas.name.parse("John Doe");

// Email
EmailSchema.parse("user@example.com");

// ID (non-empty string)
IdSchema.parse("cuid_xxx");
```

## Auth Schemas

### Sign Up

```typescript
import { SignUpSchema, type SignUpInput } from "@/lib/validations/auth";

const data: SignUpInput = SignUpSchema.parse({
  name: "John Doe",
  email: "john@example.com",
  password: "securepassword123",
});
```

### Sign In

```typescript
import { SignInSchema, type SignInInput } from "@/lib/validations/auth";

const data: SignInInput = SignInSchema.parse({
  email: "john@example.com",
  password: "password123",
});
```

### Password Reset

```typescript
import {
  ResetPasswordRequestSchema,
  ResetPasswordSchema,
} from "@/lib/validations/auth";

// Request reset
ResetPasswordRequestSchema.parse({ email: "john@example.com" });

// Confirm reset (validates password match)
ResetPasswordSchema.parse({
  token: "reset-token",
  password: "newpassword123",
  confirmPassword: "newpassword123",
});
```

## Usage in API Routes

```typescript
import { Hono } from "hono";
import { SignUpSchema } from "@/lib/validations/auth";

app.post("/users", async (c) => {
  const body = await c.req.json();
  
  // Throws ZodError if invalid (auto-handled by errorHandler)
  const { name, email, password } = SignUpSchema.parse(body);
  
  // ... create user
});
```

## Best Practices

1. **Always validate user input** - Never trust client data
2. **Use `.safeParse()` for conditional handling** - Returns `{ success, data, error }`
3. **Export inferred types** - `type SignUpInput = z.infer<typeof SignUpSchema>`
4. **Add descriptive error messages** - `z.string().min(8, "Password too short")`
