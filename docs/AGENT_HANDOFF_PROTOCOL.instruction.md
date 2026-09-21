# Instruction — Agent Handoff Protocol

- ID: INST-AGENT-HANDOFF
- Target: `docs/AGENT_HANDOFF_PROTOCOL.md`
- Class: A — Critical continuity protocol
- Status: ACTIVE

## Purpose
Ensure incomplete Project Agent work can be safely continued by another agent.

## Rules
1. Handoff is mandatory on pause, blocker, failure, or transfer.
2. Record completed, remaining, files, branch, commit, tests, errors, and next action.
3. Successor must re-verify source state before editing.
4. Preserve the original agent record unchanged.

## Verification
Handoff must identify both predecessor and successor when succession occurs.

## Update trigger
Any change to continuity or takeover behavior.
