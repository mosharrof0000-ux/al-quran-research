# Instruction — Project Agent Worker
Status: ACTIVE
Purpose: Isolated autonomous project-agent runtime.
Rules: read context first; write only agent/*; never main; protected paths are .github/workflows, database, migrations, validation, quran_research.db, schema.sql; preserve task identity and handoff records; no merge/deploy claims.
Verification: syntax/build, Worker health, tool-loop behavior, branch isolation, and task-record persistence must be checked before promotion.
