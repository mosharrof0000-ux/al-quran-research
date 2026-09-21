# Project Agent — Network/API Testing Protocol v1

## Purpose
Verify that the Project Agent browser path has healthy network responses and that the Project Agent API exposes the expected isolated-service identity.

## Checks
1. Open the canonical Qur'an reader URL.
2. Record every browser response status and content type.
3. Fail the page network gate on any failed request or HTTP status 400+.
4. Probe the Project Agent API health endpoint.
5. Require a successful API response.
6. Require valid JSON.
7. Require the expected isolated identity:
   - `isolated: true`
   - `merge: false`
   - `deploy: false`
   - string `version`
8. Collect console and uncaught page errors.
9. Emit machine-readable JSON and exit non-zero on failure.

## Safety
- Read-only.
- No authentication, writes, merges, deployments, or production-data changes.
- API URL is configurable with `API_URL`.
- Network failure is evidence of a verification failure, not a reason to silently pass.

## Runtime limitation
The implementation is the test gate. A PASS claim requires actually executing the script in an environment with Playwright/Chromium and network access.
