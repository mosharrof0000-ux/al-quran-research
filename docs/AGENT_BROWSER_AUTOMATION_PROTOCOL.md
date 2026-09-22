# Project Agent Browser Automation Protocol v1

## Purpose
The browser layer gives the Project Agent a real browser-based, read-only verification path before a task is considered visually/runtime tested.

## Tool
`scripts/project-agent-browser-check.mjs` uses Playwright in an execution environment that provides Chromium.

## Checks
1. Navigate to the target URL.
2. Require a successful HTTP response.
3. Require a DOM/body.
4. Count interactive controls.
5. Capture a full-page screenshot.
6. Collect browser console errors.
7. Collect page errors.
8. Collect failed network requests.
9. Exit non-zero when a required check fails or browser/page errors occur.

## Safety
- Read-only: the script does not edit repository files or deploy anything.
- Default target is the canonical Qur'an reader URL.
- It does not submit forms, click destructive controls, authenticate, or modify user data.
- A screenshot is evidence, not proof of visual correctness by itself.
- This step remains separate from production deployment.

## Result
The script emits machine-readable JSON suitable for an agent verification pipeline.
