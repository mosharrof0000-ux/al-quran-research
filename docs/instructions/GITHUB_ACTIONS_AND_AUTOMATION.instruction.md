# Instruction — GitHub Actions and Automation

- ID: INST-GITHUB-ACTIONS-AUTOMATION
- Class: A — Critical automation governance
- Status: ACTIVE

## Purpose
Control repository automation so GitHub Actions cannot silently damage protected website, backend, research, or historical assets.

## Scope
All `.github/workflows/*.yml` and `.github/workflows/*.yaml` files, with special protection for workflows that write to `index.html`, live UI, backend deployment assets, research data, or project governance files.

## Rules
1. Existing workflows must not be deleted, renamed, disabled, or rewritten merely for cleanup.
2. Before changing an automation workflow, inspect its trigger, paths, permissions, files read/written, commit/push behavior, and dependency chain.
3. Any workflow with `permissions: contents: write` is production-impacting and requires explicit impact review.
4. Workflows that automatically modify `index.html` or other live entrypoints are classified as `LIVE-ENTRYPOINT-WRITE` and require focused review before modification.
5. Duplicate or overlapping workflows are not automatically redundant; determine trigger/path behavior and history first.
6. A safer replacement must exist and be verified before retiring an automation path.
7. Never add secrets/API keys to workflow source.
8. Workflow changes require minimal diff, syntax/logic review, and post-change verification.
9. Automated commits must not overwrite unrelated human changes.
10. Preserve rollback and backup mechanisms before altering production automation.

## Current audit finding
The repository contains multiple workflows capable of writing `index.html`. This is an audit finding, not approval to delete or disable them.

## Verification checklist
- Trigger and path filters checked.
- Write permissions checked.
- Target files identified.
- Overlap/duplication assessed.
- Live-site impact assessed.
- Backup/rollback path confirmed.
- Workflow syntax and intended behavior reviewed.

## Related
`BACKEND_AND_LIVE_UI.instruction.md`, `BACKUP_POLICY.instruction.md`, `INSTRUCTION_AUDIT_PROTOCOL.md`, `MASTER_INSTRUCTION.md`, `PROJECT_HISTORY.instruction.md`.
