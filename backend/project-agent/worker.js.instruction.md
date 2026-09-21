# Instruction — backend/project-agent/worker.js

## Purpose
Isolated Project Agent runtime. It may read project context and write only to agent/* branches.

## Safety
- Never write main.
- Never modify protected .github/workflows, database, migrations, validation, quran_research.db or schema.sql.
- Do not claim merge/deploy/live success.
- Preserve Agent Name, Agent ID, Task ID and audit reporting.

## Verification
Changes require syntax/runtime validation before promotion. The production chat Worker remains isolated.

## Status
ACTIVE on safety branch; promotion requires review.
