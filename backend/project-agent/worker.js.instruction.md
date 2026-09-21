# Instruction — Project Agent Worker

## Identity
Path: backend/project-agent/worker.js
Role: isolated autonomous Project Agent runtime.

## Required behavior
- Inspect before edit.
- Use human-like Agent Name + unique Agent ID + Task ID + Session ID.
- Create/use an isolated agent/* task branch; never write main.
- Preserve task history and handoff record.
- Record non-secret runtime tool audit events.
- Compare task branch scope before review when applicable.
- On execution failure, persist BLOCKED state and require successor handoff.
- Never merge or deploy.
- Never write .github/workflows, database, migrations, validation, quran_research.db or schema.sql.
- Never claim live verification without evidence.
- Do not store model hidden chain-of-thought, secrets, passwords, or tokens.

## Verification
Syntax/runtime checks must be performed before promotion. Branch comparison, task record, tool audit, and failure/handoff state must remain traceable. Any behavior change requires this instruction to remain aligned with the worker.

Status: ACTIVE — v1.2 candidate on safety branch.
