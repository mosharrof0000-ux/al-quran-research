# Instruction — Private Research UI Browser Test

## Identity
Path: scripts/test-private-research-ui-browser.mjs
Status: ACTIVE — Chromium interaction test using synthetic fixtures

## Purpose
Exercise the actual home iframe and composer controls in Chromium to verify that uninstalled sources cannot be unlocked and that a successful synthetic token response does not claim Chat retrieval is active.

## Allowed
- Start a local static server for the repository.
- Intercept Private Research API requests with synthetic JSON responses.
- Use a dummy PIN and dummy Bearer token that never reach production.

## Forbidden
- Send private source text to Gemini or any external provider.
- Call production unlock/content routes.
- Treat this browser test as proof of production source installation or Android-device acceptance.

## Verification
Run with Playwright installed: `node scripts/test-private-research-ui-browser.mjs`.
