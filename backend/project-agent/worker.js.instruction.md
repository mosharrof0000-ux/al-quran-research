# Instruction — Project Agent Worker

- ID: INST-PROJECT-AGENT-WORKER
- Target: `backend/project-agent/worker.js`
- Class: A — Critical isolated automation
- Status: ACTIVE

## Purpose
Provide the isolated Project Agent engine without modifying production chat.

## Safety
- Never write to main.
- Writes are limited to agent/* branches.
- Protected paths remain blocked.
- No merge or production deployment capability.
- User-visible claims must distinguish branch work from live publication.

## Required behavior
- Inspect before edit.
- Record Task ID, Bengali Agent Name, Agent ID, Session ID, branch and status.
- Maintain visible work history and handoff information.
- Validate inputs and prevent path traversal.
- Fail closed when required secrets are absent.

## Verification
Syntax, tool loop, branch isolation, protected-path blocking, identity recording, and health endpoint must be tested before promotion.
