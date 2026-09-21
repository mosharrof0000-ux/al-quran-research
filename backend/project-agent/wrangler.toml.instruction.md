# Instruction — Project Agent Wrangler Configuration

- ID: INST-PROJECT-AGENT-WRANGLER
- Target: `backend/project-agent/wrangler.toml`
- Class: A — Isolated deployment configuration
- Status: ACTIVE

## Rules
Keep the Project Agent Worker separate from the production chat Worker. Do not silently retarget production services.

## Verification
Confirm worker name, entry file, compatibility date, repository variable, and agent version remain consistent with the isolated engine.
