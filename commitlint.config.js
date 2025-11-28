/**
 * @fileoverview Commitlint configuration for conventional commits.
 * @see https://commitlint.js.org/
 */

export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Type must be one of these
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation only
        "style", // Formatting, no code change
        "refactor", // Code change that neither fixes bug nor adds feature
        "perf", // Performance improvement
        "test", // Adding missing tests
        "build", // Build system or external dependencies
        "ci", // CI configuration
        "chore", // Other changes that don't modify src or test files
        "revert", // Reverts a previous commit
      ],
    ],
    // Subject should not be empty
    "subject-empty": [2, "never"],
    // Subject should not end with period
    "subject-full-stop": [2, "never", "."],
    // Subject should be lowercase
    "subject-case": [2, "always", "lower-case"],
    // Header max length
    "header-max-length": [2, "always", 100],
  },
};
