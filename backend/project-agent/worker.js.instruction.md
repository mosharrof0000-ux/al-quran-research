# Instruction — backend/project-agent/worker.js

## Scope
Isolated Project Agent runtime only.

## Rules
- Never permit main-branch writes, merge, or production deployment from the agent runtime.
- Preserve protected paths: .github/workflows, database, migrations, validation, quran_research.db, schema.sql.
- Read project context before edits.
- Every request must expose Agent Name, Agent ID, Task ID, Work Type, and branch metadata.
- Never report VERIFIED or LIVE_VERIFIED without actual evidence.
- UTF-8 file handling must remain lossless.
