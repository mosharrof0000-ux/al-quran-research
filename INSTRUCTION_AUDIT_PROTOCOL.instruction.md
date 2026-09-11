# Instruction — INSTRUCTION_AUDIT_PROTOCOL.md

- ID: INST-INSTRUCTION-AUDIT-PROTOCOL
- Class: P0 — Critical governance protocol
- Status: ACTIVE

## Purpose
Detect missing, stale, unregistered, conflicting, duplicated, incomplete, or unsafe instructions before project changes.

## Rules
1. Identify affected files and load their applicable instructions.
2. Compare current file/repository state against instruction scope and dependencies.
3. Detect drift, missing verification, duplicate rules, scope drift, and dependency changes.
4. Propose and apply instruction updates before affected project work when governance is incomplete.
5. Never use an audit as an automatic license to delete, rename, move, or erase historical assets.
6. Update the Registry and Change Log after instruction-system changes.

## Verification
Confirm affected files, instruction coverage, registry accuracy, dependency consistency, and change history.

## Update Trigger
Any change to instruction hierarchy, file scope, dependencies, governance rules, or audit workflow.
