# API Module

Edge-ready REST API using Hono framework with comprehensive error handling.

## Overview

This module provides:

- **Hono** - Lightweight, edge-ready web framework
- **Error handling** - Global error handler with Zod integration
- **Request logging** - Structured logging with request IDs
- **Sentry integration** - Automatic error reporting

## Directory Structure

```
src/
├── app/api/[[...route]]/
│   └── route.ts          # Hono route handler
└── lib/api/
    ├── error-handler.ts  # Error handling middleware
    ├── __tests__/        # Unit tests
    └── README.md
```

## API Routes

| Endpoint       | Method     | Description              |
| -------------- | ---------- | ------------------------ |
| `/api/health`  | GET        | Health check endpoint    |
| `/api/auth/*`  | GET, POST  | Authentication routes    |

## Error Handling

### AppError Class

```typescript
import { AppError, ErrorCode } from "@/lib/api/error-handler";

// Throw custom errors
throw new AppError(404, ErrorCode.NOT_FOUND, "User not found");

// With details
throw new AppError(400, ErrorCode.VALIDATION_ERROR, "Invalid input", {
  field: "email",
  reason: "Invalid format",
});
```

### Error Codes

```typescript
ErrorCode.BAD_REQUEST;        // 400
ErrorCode.UNAUTHORIZED;       // 401
ErrorCode.FORBIDDEN;          // 403
ErrorCode.NOT_FOUND;          // 404
ErrorCode.CONFLICT;           // 409
ErrorCode.VALIDATION_ERROR;   // 400
ErrorCode.INTERNAL_ERROR;     // 500
ErrorCode.SERVICE_UNAVAILABLE // 503
```

### Error Response Format

```json
{
  "error": "NOT_FOUND",
  "message": "User not found",
  "statusCode": 404,
  "details": { ... }  // Optional
}
```

## Request Logging

All requests are automatically logged with:

- Request ID (UUID)
- HTTP method
- Path
- Response status
- Duration (ms)

```typescript
// Access request ID in handlers
const requestId = c.req.header("x-request-id");
```

## Adding New Routes

```typescript
// src/app/api/[[...route]]/route.ts
import { Hono } from "hono";
import { z } from "zod/v4";
import { AppError, ErrorCode } from "@/lib/api/error-handler";

const app = new Hono().basePath("/api");

// Define input schema
const CreateUserSchema = z.object({
  email: z.email(),
  name: z.string().min(2),
});

// Add route with validation
app.post("/users", async (c) => {
  const body = await c.req.json();
  const parsed = CreateUserSchema.safeParse(body);
  
  if (!parsed.success) {
    throw parsed.error; // Auto-handled by errorHandler
  }
  
  // ... create user
  return c.json({ id: user.id }, 201);
});
```

## Middleware Stack

1. `requestLogger` - Logs requests and adds request ID
2. `cors` - CORS headers for auth routes
3. `errorHandler` - Global error handler
4. `notFoundHandler` - 404 for undefined routes
