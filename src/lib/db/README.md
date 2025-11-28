# Database Module

Type-safe database layer using Drizzle ORM with Turso (libSQL).

## Overview

This module provides:

- **Drizzle ORM** - Type-safe SQL query builder
- **Turso/libSQL** - SQLite-compatible edge database
- **Modular schema** - One table per file for maintainability
- **Environment validation** - Configuration validated via t3-env

## Directory Structure

```
src/lib/db/
├── index.ts           # Database client and exports
├── schema/
│   ├── index.ts       # Schema barrel export
│   ├── users.ts       # Users table
│   ├── sessions.ts    # Sessions table (FK → users)
│   ├── accounts.ts    # OAuth accounts table (FK → users)
│   ├── verifications.ts # Email verification tokens
│   └── __tests__/     # Schema unit tests
└── README.md
```

## Usage

### Basic Queries

```typescript
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Select all users
const allUsers = await db.select().from(users);

// Select by condition
const user = await db
  .select()
  .from(users)
  .where(eq(users.email, "user@example.com"))
  .get();

// Insert
await db.insert(users).values({
  id: "cuid_xxx",
  name: "John Doe",
  email: "john@example.com",
});
```

### Relational Queries

```typescript
import { db } from "@/lib/db";

// Get user with sessions
const userWithSessions = await db.query.users.findFirst({
  where: eq(users.id, userId),
  with: {
    sessions: true,
  },
});
```

## Environment Variables

| Variable             | Required | Description                         |
| -------------------- | -------- | ----------------------------------- |
| `TURSO_DATABASE_URL` | Yes      | Turso URL or `file:local.db`        |
| `TURSO_AUTH_TOKEN`   | No\*     | Auth token (\*required in production) |

## Commands

```bash
# Generate migrations
pnpm db:generate

# Push schema to database
pnpm db:push

# Open Drizzle Studio
pnpm db:studio
```

## Schema Design

All tables follow these conventions:

- Primary keys use `text("id")` (cuid2 format)
- Timestamps use `integer("...", { mode: "timestamp" })` with Unix epoch
- Foreign keys use `references(() => table.id, { onDelete: "cascade" })`
- All schemas export inferred types: `User`, `NewUser`, etc.
