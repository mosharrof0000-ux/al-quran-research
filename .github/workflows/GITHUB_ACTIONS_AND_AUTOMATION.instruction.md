# Instruction — GitHub Actions and Automation

- ID: INST-GITHUB-ACTIONS-AUTOMATION
- Class: A — Critical automation governance
- Status: ACTIVE

## Purpose
Control repository automation so GitHub Actions cannot silently damage protected website, backend, research, or historical assets.

## Scope
All `.github/workflows/*.yml` and `.github/workflows/*.yaml` files, with special protection for workflows that write to `index.html`, live UI, backend deployment assets, research data, or project governance files.

## Canonical live-entrypoint rule
`.github/workflows/live-entrypoint-sync.yml` is the single canonical automatic writer for the protected live-entrypoint integrations.

It is responsible for the controlled integration of:
- Tafsir Library navigation;
- site favicon synchronization;
- chat-system script-tag normalization.

## Rules
1. Existing workflow files must not be deleted, renamed, or moved merely for cleanup.
2. Only the canonical live-entrypoint workflow may automatically write the protected `index.html` integration points.
3. Legacy live-entrypoint workflows may be preserved as manual/read-only notices, but must not retain automatic repository-write behavior.
4. Any workflow with `permissions: contents: write` is production-impacting and requires explicit impact review.
5. Before changing automation, inspect trigger, paths, permissions, files read/written, commit/push behavior, and dependency chain.
6. Duplicate or overlapping automation must be consolidated only after its behavior has been mapped and a rollback point exists.
7. Use concurrency controls for automation that mutates the same production entrypoint.
8. Never add secrets/API keys to workflow source.
9. Automated commits must not overwrite unrelated human changes.
10. Preserve rollback and backup mechanisms before altering production automation.
11. Production automation changes require minimal diff, syntax/logic review, and post-change verification.

## Current state
The former automatic live-entrypoint writers are retained as manual/read-only legacy workflows:
- `connect-tafsir-library.yml`
- `connect-tafsir-library-now.yml`
- `set-site-favicon.yml`
- `install-chat-system.yml`

They no longer automatically write to the repository.

## Verification checklist
- Trigger and path filters checked.
- Write permissions checked.
- Target files identified.
- Overlap/duplication assessed.
- Live-site impact assessed.
- Backup/rollback path confirmed.
- Workflow syntax and intended behavior reviewed.
- Only the canonical live-entrypoint writer retains automatic write behavior.

## Related
`BACKEND_AND_LIVE_UI.instruction.md`, `BACKUP_POLICY.instruction.md`, `INSTRUCTION_AUDIT_PROTOCOL.md`, `MASTER_INSTRUCTION.md`, `PROJECT_HISTORY.instruction.md`, `docs/INSTRUCTION_AUDIT_AUTOMATION_2026-09-11.md`.
