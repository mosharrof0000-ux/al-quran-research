# Backend Dependency Verification — 2026-09-08

## Verified facts

- `backend/wrangler.jsonc` sets `main` to `worker-entry.js`.
- `.github/workflows/deploy-worker.yml` deploys from `backend` using `wrangler deploy --config wrangler.jsonc`.
- `worker-entry.js` imports `worker.js`, `research-api.js`, `chat-recovery.js`, and `ai-research-brain.js`.
- `worker-entry.js` is therefore the current Worker entrypoint and those four modules are current direct dependencies.
- `worker-entry-v1.2.js`, `chat-recovery-v3.js`, and `research-api-entry.js` are not the current configured entrypoint and were not found as current direct callers in the inspected main-branch references.

## Safety decision

No backend file was deleted or renamed during this verification. The legacy candidates remain preserved until Git history and workflow references establish that cleanup is safe.

## Backup

Pre-verification snapshot: `backup/pre-backend-dependency-verification-2026-09-08`, created from commit `01ccda48ecae8a670f8f6583a703861a73a6ce6a`.

## Result

The active deployment path is now documented with evidence. Cleanup remains a separate, reversible task and requires another pre-change backup.
