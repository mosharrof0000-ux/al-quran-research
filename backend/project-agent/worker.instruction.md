# Instruction — backend/project-agent/worker.js
- ID: INST-PROJECT-AGENT-WORKER
- Class: B — Isolated agent runtime
- Status: ACTIVE
- Purpose: Run the isolated Project Agent engine without changing production chat.
- Scope: Project Agent HTTP API, Gemini tool loop, GitHub safe-write layer and task identity metadata.
- Allowed: read project files; write only agent/* branches; expose task identity.
- Forbidden: main writes, merge, production deploy, protected workflow/database/migration/validation writes.
- Verification: health endpoint, authorization, branch/path restrictions, tool loop and task identity must remain functional.
- Update trigger: agent capabilities, security boundary, identity or tool contract changes.