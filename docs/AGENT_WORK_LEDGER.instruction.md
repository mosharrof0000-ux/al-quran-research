# Instruction — AGENT_WORK_LEDGER.md

## Identity
Path: docs/AGENT_WORK_LEDGER.md
Purpose: Human-readable audit ledger for Project Agent tasks.

## Required fields
Task ID, Agent Name, Agent ID, role, requester, parent task, branch, status, scope, completed, remaining, verification, and handoff.

## Rules
- Never store secrets, API keys, tokens, passwords, or hidden chain-of-thought.
- Never erase prior task history; append or version it.
- A successor must reference the predecessor Task ID.
- Deployment claims require actual deployment/live evidence.

## Verification
Ledger entries must match repository branch/commit evidence where available.

## Change history
v1.0 — initial Project Agent work ledger.
