# Safe Workspace State

**Version:** 1.0
**State:** SAFE WORKSPACE CREATED

## Known-Good base
- Branch: `main`
- Commit: `7454163d7920d85cd404094ee78c2ea1126bbf0e`

## Safety backup
- Branch: `backup/before-safe-workspace-2026-09-10`
- Base commit: `7454163d7920d85cd404094ee78c2ea1126bbf0e`

## Current working branch
- `safety/safe-workspace-v1-2026-09-10`
- Purpose: install the safe workspace protocol without changing the website design or research logic.

## Current Known-Good chat page
- `design-preview-work-chat-v3-cloudflare-ai-2026-09-07.html`

## Rules for future work
1. Never experiment directly on `main`.
2. Never overwrite the Known-Good chat page when testing a new design or API integration.
3. Create a new versioned page for risky frontend work.
4. Create a separate branch for every meaningful change.
5. Test before merge.
6. If a test fails, return to Known-Good instead of repeatedly repairing the broken workspace.
7. Keep backend/API changes isolated from frontend changes whenever possible.
8. Keep research data isolated from UI experiments.

## Recovery command pattern
**Frontend/page failure:** open the Known-Good page and create a new version.

**Backend/API failure:** restore the last Known-Good backend branch/commit; do not rewrite research data.

**Large failure:** restore from the latest Known-Good backup branch.

## Success condition
A change becomes part of `main` only after testing and verification. Until then it is experimental.
