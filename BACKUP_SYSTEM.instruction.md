# Instruction — BACKUP_SYSTEM.md

- Instruction ID: `INST-BACKUP-SYSTEM`
- Class: A — Critical
- Status: ACTIVE

## Purpose
Govern the backup/recovery architecture and safe-point rules.

## Scope
Applies to `BACKUP_SYSTEM.md`, backup branches, recovery decisions, and changes that rely on a documented safe snapshot.

## Rules
1. Before a critical change, establish and identify a current safe backup/snapshot.
2. Never claim a backup is verified unless its branch/commit/reference is actually verified.
3. Do not delete, overwrite, rename, or repurpose historical backups without explicit approval.
4. Preserve research data, UI, and derived information as distinct recovery concerns.
5. A failed change must leave enough evidence to identify the bad state and the recovery point.
6. Recovery must be reversible and documented; do not silently rewrite history.

## Verification
Check the referenced backup branch/commit, affected files, and post-change integrity before marking a safe point usable.

## Update triggers
Update this instruction when backup architecture, recovery workflow, branch conventions, or safe-point policy changes.
