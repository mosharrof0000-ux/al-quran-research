# Instruction — docs/BACKUP_POLICY.md

- Instruction ID: `INST-BACKUP-POLICY`
- Class: A — Critical
- Status: ACTIVE

## Purpose
Govern what must be preserved, when safe points are mandatory, and how restoration is recorded.

## Rules
1. Follow the documented sequence: backup/safe point → change → test → result → approval → next chain.
2. Treat website, database, documentation, and research-chain history as separate protected assets.
3. Before website, database/schema, AI integration, restructuring, replacement, or new research-engine changes, require a safe point.
4. Never erase history or overwrite a previous safe point to hide a failure.
5. Never place secrets or API keys in repository files.
6. A restore is itself a new documented research/operational event.

## Verification
Confirm the safe point, commit, affected assets, restore scope, and post-restore tests.

## Update triggers
Update when backup policy, protected assets, restore procedure, or mandatory safe-point triggers change.
