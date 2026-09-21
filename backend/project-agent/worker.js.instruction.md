# Instruction — Project Agent Worker v3
- Path: backend/project-agent/worker.js
- Scope: isolated autonomous project-agent runtime only.
- Writes: agent/* branches only; never main.
- Protected: .github, database, migrations, validation, schema/db, wrangler.
- Required flow: inspect → minimal change → read-back → compare → handoff if incomplete.
- No merge or production deployment capability.
- Secrets are runtime bindings and must never be written to repository files.
- Update this instruction when runtime safety or tool behavior changes.
