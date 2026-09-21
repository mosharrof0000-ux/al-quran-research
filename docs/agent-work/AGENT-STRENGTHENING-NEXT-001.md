# AGENT-STRENGTHENING-NEXT-001 — Verification & Recovery Layer

- Agent Name: নাঈম
- Agent ID: NAIM-AGENT-VERIFY-001
- Parent Task: AI-STRENGTHENING-004
- Status: STARTED
- Branch: agent/naim-agent-verify-001

## Objective
Strengthen the Project Agent with an explicit verification/recovery phase before any work can be considered complete.

## Execution contract
1. Read the parent task/handoff before acting.
2. Inspect current branch and relevant project files.
3. Never treat a successful model response as proof of implementation success.
4. Verify changed files, branch isolation and task record persistence.
5. Record failures as BLOCKED/INCOMPLETE rather than hiding them.
6. A successor receives a new Agent ID and links to this task as parent.
7. Merge/deploy/live claims require separate evidence and remain outside this task unless explicitly authorized.

## Planned verification gates
- Source integrity
- Branch isolation
- Protected-path enforcement
- Tool-call error capture
- Task/handoff persistence
- Runtime response contract
- Recovery/rollback state recording

## Current state
Implementation work started in a fresh isolated branch from the current main line.
