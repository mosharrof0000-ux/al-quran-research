# Instruction — PROJECT_BACKUP_INDEX.md

**Instruction ID:** INST-BACKUP-INDEX
**Target:** `PROJECT_BACKUP_INDEX.md`
**Class:** A — Critical
**Status:** ACTIVE

## Purpose
Index known backup/safe-point records so recovery references remain discoverable.

## Rules
- Never falsely mark a backup as verified.
- Preserve backup identifiers, dates, scope, and known-good references.
- Do not delete historical backup references during cleanup.
- Coordinate with `BACKUP_SYSTEM.md` and `docs/BACKUP_POLICY.md`.

## Verification
Confirm referenced backup/safe-point records actually exist when performing a recovery-related task.

## Update Trigger
A new safe point, backup, restore test, backup policy change, or known-good reference.
