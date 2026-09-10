# Safe Workspace State

**Version:** 1.1
**State:** SAFE / READY FOR NEXT WORK

## Current Known-Good base
- Branch: `main`
- Commit: `80caa3bc77edc8bf0dd243353dd35261a3855d5b`

## Safety backups
- Latest: `backup/known-good-safe-workspace-2026-09-10`
- Earlier: `backup/before-safe-workspace-2026-09-10`

## Active working branch
- None. A new isolated branch must be created for the next meaningful change.

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

## Recovery levels
- Page failure → return to the Known-Good page and create a new version.
- Frontend failure → restore the last Known-Good frontend commit/branch.
- Worker/API failure → restore the last Known-Good backend commit/deployment.
- Large failure → restore from the latest Known-Good backup branch.

## Standard workflow
`KNOWN-GOOD → BACKUP → NEW BRANCH → NEW VERSION/PAGE → TEST → VERIFY → MERGE`

## Failure workflow
`EXPERIMENT FAILS → STOP → KNOWN-GOOD → VERIFY → NEW BRANCH → CONTINUE`

## Success condition
A change becomes part of `main` only after testing and verification. Until then it remains experimental.
