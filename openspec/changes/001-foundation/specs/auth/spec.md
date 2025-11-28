# Authentication Specification

## ADDED Requirements

### User Registration
- **Description:** Implement a user registration endpoint using Better Auth, allowing new users to create accounts.

#### Scenario: Successful User Registration
A POST request to `/api/auth/register` with valid email and password should:
- Create a new user record in the `users` table.
- Return a success response (e.g., 201 Created) and potentially a session token.

#### Scenario: Duplicate Email Registration
A POST request to `/api/auth/register` with an already registered email should:
- Return a 409 Conflict error.

### User Login
- **Description:** Implement a user login endpoint using Better Auth, allowing existing users to authenticate.

#### Scenario: Successful User Login
A POST request to `/api/auth/login` with valid email and password should:
- Authenticate the user.
- Create a new session record in the `sessions` table.
- Return a success response (e.g., 200 OK) and a session token.

#### Scenario: Invalid Credentials Login
A POST request to `/api/auth/login` with invalid email or password should:
- Return a 401 Unauthorized error.
