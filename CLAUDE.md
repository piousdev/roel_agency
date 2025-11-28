<!-- OPENSPEC:START -->

# Git Commit Rules

## STRICTLY NO CLAUDE ATTRIBUTIONS

**NEVER include any of the following in commit messages or PR descriptions:**
- `Co-Authored-By: Claude <noreply@anthropic.com>`
- `🤖 Generated with [Claude Code](https://claude.com/claude-code)`
- Any mention of Claude, AI, or automated generation

Commit messages must be clean and appear as written by the developer only.

---

# OpenSpec Instructions

You MUST always use the AskUserQuestion tool with multiple choice options when
asking ANY questions. This is mandatory for speed and accuracy. Always include a
"Type custom response" option for questions requiring additional context or
nuance.

These instructions are for AI assistants working in this project.

# MCP Servers - When to Use

## **serena**

**Use when:** Managing project context and documentation

- Maintaining project memory across sessions
- Storing and retrieving project-specific knowledge
- Managing architectural decisions and patterns
- Keeping track of conventions and standards
- Building institutional knowledge for the codebase

## **context7**

**Use when:** Handling broader codebase context

- Analyzing large-scale code relationships
- Understanding cross-file dependencies
- Getting holistic views of your architecture
- Searching across multiple repositories or projects
- Maintaining context for complex, multiservice systems

## **chrome-devtools**

**Use when:** Debugging web applications in real-time

- Inspecting DOM elements and styles
- Monitoring network requests and responses
- Debugging JavaScript in the browser
- Analyzing performance and runtime behavior
- Testing responsive designs and mobile views

## **playwright**

**Use when:** Automating browser testing and interactions

- Writing end-to-end tests
- Automating repetitive browser tasks
- Testing across multiple browsers (Chrome, Firefox, Safari)
- Capturing screenshots and videos for debugging
- Simulating user interactions programmatically

---

**Typical Workflow Integration:**

- **chrome-devtools** for debugging Next.js/React applications
- **playwright** for automated testing of client projects
- **serena/context7** for maintaining project knowledge as your agency scales

CRITICAL RULE - Documentation First: Before providing implementation advice for
any framework, library, or tool:

1. Use Context7 to fetch the current official documentation
2. Never rely solely on training data for framework-specific patterns
3. If you're unsure whether docs have changed, default to checking

Trigger this rule when:

- User asks about "best practices" or "recommended approach"
- User mentions specific framework versions (Next.js, React, etc.)
- Implementation involves third-party libraries or APIs
- You detect potential outdated patterns in your knowledge

Exception: Only skip doc check for truly stable, fundamental concepts (e.g.,
JavaScript fundamentals, HTTP basics) that are unlikely to change.

Always use context7 when I need code generation, setup or configuration steps,
or library/API documentation. This means you should automatically use the
Context7 MCP tools to resolve library id and get library docs without me having
to explicitly ask.

---

# Implementation Patterns

## Environment Variables

**Always use t3-env for environment validation:**

```typescript
import { env } from "@/env";

// Type-safe, validated at startup
const dbUrl = env.TURSO_DATABASE_URL;
```

- Server vars: `env.TURSO_DATABASE_URL`, `env.BETTER_AUTH_SECRET`
- Client vars: `env.NEXT_PUBLIC_APP_URL`
- Never use `process.env` directly (except in logger.ts to avoid circular deps)

## Database Operations

```typescript
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

// Query
const user = await db.select().from(users).where(eq(users.id, id)).get();

// Insert
await db.insert(users).values({ id, name, email });
```

## API Routes

```typescript
import { AppError, ErrorCode } from "@/lib/api/error-handler";
import { SomeSchema } from "@/lib/validations";

// Validate input
const data = SomeSchema.parse(await c.req.json());

// Throw errors (auto-handled)
throw new AppError(404, ErrorCode.NOT_FOUND, "Resource not found");
```

## Logging

```typescript
import { logger, createChildLogger } from "@/lib/logger";

logger.info({ userId }, "User logged in");
logger.error({ err }, "Operation failed");
```

## Module Structure

Each module should have:
- `index.ts` - Main exports
- `__tests__/` - Unit tests
- `README.md` - Module documentation

## Code Quality Checklist

- [ ] Type-safe (no `any`)
- [ ] Zod validation for inputs
- [ ] JSDoc for public functions
- [ ] Unit tests in `__tests__/`
- [ ] Uses validated `env` (not `process.env`)