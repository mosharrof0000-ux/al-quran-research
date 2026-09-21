# Instruction — Project Agent Worker

## Identity
Path: backend/project-agent/worker.js
Role: isolated autonomous Project Agent runtime.

## Required behavior
- Inspect before edit.
- Use human-like Agent Name + unique Agent ID + Task ID + Session ID.
- Work only on agent/* branches.
- Preserve task history and handoff record.
- Never merge or deploy.
- Never write .github/workflows, database, migrations, validation, quran_research.db or schema.sql.
- Never claim live verification without evidence.

## Verification
Syntax/runtime checks must be performed before promotion. Any behavior change requires this instruction to remain aligned with the worker.

Status: ACTIVE — v1.1 candidate on safety branch.
