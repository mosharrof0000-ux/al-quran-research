# Instruction — worker.js

## Purpose
Runtime for the isolated Autonomous Project Agent.

## Rules
- Never write main.
- Only agent/* branches may be written.
- Protected paths remain blocked.
- Read relevant context before edits.
- Preserve Agent Name, Task ID, Session ID and parent-task continuity.
- Do not claim merge or production deployment.
- Any new capability must remain auditable and safe.

## Verification
Validate JavaScript syntax, endpoint health, authentication, tool-call behavior, branch isolation and response identity fields.

## Status
ACTIVE on safety branch; promotion pending.
