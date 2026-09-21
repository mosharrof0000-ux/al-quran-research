# Instruction — Agent Work Ledger

- ID: INST-AGENT-WORK-LEDGER
- Target: `docs/AGENT_WORK_LEDGER.md`
- Class: A — Critical Project Agent audit trail
- Status: ACTIVE

## Purpose
Preserve the visible operational history of Project Agent work.

## Rules
1. Record task identity, command, branch, files, commits, tests, status, blockers, and handoff.
2. Never convert an incomplete/blocked task into completed status without evidence.
3. Deployment success is not live verification.
4. Successor work must reference the predecessor Task ID.
5. Do not store hidden chain-of-thought; store observable actions and evidence only.

## Verification
Every significant entry must map to an actual branch/file/commit or documented decision.

## Update trigger
Every new task lifecycle event and handoff.
