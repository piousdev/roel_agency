# database Specification

## Purpose
TBD - created by archiving change 001-foundation. Update Purpose after archive.
## Requirements
### Requirement: Database Schema Definition
The system SHALL define the database schema using Drizzle ORM optimized for Turso (SQLite), including tables for users, sessions, accounts, and verifications.

#### Scenario: User Table Creation
- **WHEN** the database is initialized
- **THEN** a `users` table SHALL exist with id, name, email, emailVerified, image, createdAt, updatedAt columns

#### Scenario: Session Table Creation
- **WHEN** the database is initialized
- **THEN** a `sessions` table SHALL exist with id, userId, token, expiresAt, ipAddress, userAgent columns

#### Scenario: Account Table Creation
- **WHEN** the database is initialized
- **THEN** an `accounts` table SHALL exist with id, userId, providerId, accountId, accessToken, refreshToken columns

#### Scenario: Verification Table Creation
- **WHEN** the database is initialized
- **THEN** a `verifications` table SHALL exist with id, identifier, value, expiresAt, createdAt columns

### Requirement: Database Migrations
The system SHALL provide Drizzle migrations to apply and manage schema changes.

#### Scenario: Apply Initial Migration
- **WHEN** running the migration command
- **THEN** all defined tables SHALL be created in the Turso database

