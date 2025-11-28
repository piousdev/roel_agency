# Tasks for 001-foundation

## Database & Auth Setup

- [x] Define database schema for core entities (users, sessions, accounts, verifications)
- [x] Implement database migrations for the initial schema
- [x] Set up Hono API routes for health checks and authentication endpoints
- [x] Integrate Better Auth with Hono for user registration and login
- [x] Write unit tests for database schema and authentication logic

## Robust Development Practices

- [x] Add type-safe environment validation (t3-env)
- [x] Add pre-commit hooks (husky + lint-staged with biome)
- [x] Create Zod validation schemas for API inputs
- [x] Add GitHub Actions CI/CD workflow (lint, typecheck, test, build)
- [x] Set up structured logging (pino with pretty/JSON output)
- [x] Add Sentry error tracking (client/server/edge)
- [x] Create global API error handler with request logging

## Documentation

- [x] Add README.md to each module (db, auth, api, validations)
- [x] Update CLAUDE.md with implementation patterns
- [x] Update OpenSpec tasks with completion status

## Implementation Summary

### Tech Stack

| Layer          | Technology         | Purpose                          |
| -------------- | ------------------ | -------------------------------- |
| Database       | Turso + Drizzle    | Edge-compatible SQLite           |
| Auth           | Better Auth        | Modern authentication            |
| API            | Hono               | Edge-ready REST framework        |
| Validation     | Zod + t3-env       | Type-safe runtime validation     |
| Logging        | Pino               | Structured JSON logging          |
| Monitoring     | Sentry             | Error tracking & APM             |
| CI/CD          | GitHub Actions     | Automated testing & builds       |
| Code Quality   | Biome + husky      | Linting & pre-commit hooks       |

### File Structure

```
src/
├── env.ts                      # t3-env configuration
├── instrumentation.ts          # Sentry server init
├── app/
│   └── api/[[...route]]/
│       └── route.ts            # Hono API handler
└── lib/
    ├── auth.ts                 # Better Auth server
    ├── auth-client.ts          # Better Auth client
    ├── logger.ts               # Pino logger
    ├── api/
    │   ├── error-handler.ts    # Global error handling
    │   └── README.md
    ├── db/
    │   ├── index.ts            # Drizzle client
    │   ├── schema/             # Table definitions
    │   └── README.md
    └── validations/
        ├── index.ts            # Common schemas
        ├── auth.ts             # Auth schemas
        └── README.md
```
