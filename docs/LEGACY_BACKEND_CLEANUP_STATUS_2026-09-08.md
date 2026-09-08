# Legacy Backend Cleanup Status — 2026-09-08

- Legacy candidates verified: `worker-entry-v1.2.js`, `chat-recovery-v3.js`, `research-api-entry.js`.
- None is the current Wrangler entrypoint or current caller in main-branch code.
- No backend file has been deleted or renamed.
- A cleanup proposal exists at `docs/LEGACY_BACKEND_CLEANUP_PROPOSAL_2026-09-08.md`.
- Cleanup remains a separate decision-gated task; archival is preferred over direct deletion.
- `research-api-entry.js` should receive the most conservative treatment because it may retain standalone Research API value.
