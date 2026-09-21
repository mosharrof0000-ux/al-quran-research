# Instruction — backend/project-agent/wrangler.toml
- ID: INST-PROJECT-AGENT-WRANGLER
- Class: B — Isolated deployment configuration
- Status: ACTIVE
- Purpose: Configure the separate Project Agent Worker.
- Rules: Keep worker name isolated from the production chat Worker; never store secrets in repository variables.
- Verification: Worker name and entrypoint remain the dedicated project-agent service.
- Update trigger: deployment target or runtime configuration changes.