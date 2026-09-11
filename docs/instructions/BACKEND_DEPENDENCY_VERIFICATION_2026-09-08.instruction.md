# Instruction — docs/BACKEND_DEPENDENCY_VERIFICATION_2026-09-08.md

- Instruction ID: `INST-BACKEND-DEPENDENCY-VERIFICATION`
- Class: B — Important
- Status: ACTIVE

## Purpose
Preserve verified backend deployment facts and keep cleanup separate from verification.

## Rules
1. Record only facts supported by current configuration, workflow, code references, or history.
2. Keep legacy candidates preserved until cleanup safety is independently established.
3. Verification alone must not delete or rename backend files.
4. Any future cleanup requires a new pre-change backup and rollback path.
5. Distinguish current entrypoint/dependencies from historical candidates.

## Verification
Confirm Worker main configuration, deployment workflow, direct imports/callers, and backup reference before changing status.

## Update triggers
Update when deployment configuration, direct dependencies, workflow, or cleanup evidence changes.
