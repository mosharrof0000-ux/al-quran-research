# Project Agent — Console Error Testing Protocol v1

## Purpose
Provide a dedicated, read-only console/error gate for Project Agent browser verification.

## Scope
The test runs against a target URL in an isolated verification environment. It does not modify source files, submit forms, authenticate, deploy, merge, or change production data.

## Required checks
1. Navigate to the target page and require a successful HTTP response.
2. Attach listeners before navigation for:
   - browser console messages of type `error`
   - uncaught page errors
   - failed network requests
3. Record the exact message/request URL and failure reason.
4. Treat any console error or page error as a failed console gate.
5. Treat failed network requests as a failed console/network gate unless explicitly classified as an allowed non-critical request by a future, documented rule.
6. Emit machine-readable JSON evidence.
7. Exit non-zero when the gate fails.

## No silent suppression
The test must not hide, rewrite, or ignore errors merely to make a task pass. Any future allow-list must be explicit, narrow, documented, and tied to a known non-critical condition.

## Evidence
The output should include:
- target URL
- HTTP status
- console errors
- page errors
- failed requests
- final pass/fail status

A screenshot may be collected by the browser test, but a screenshot alone does not prove console health.

## Release rule
A task must not be reported as fully browser-verified when the console gate fails. Deployment success alone is not a substitute for console verification.
