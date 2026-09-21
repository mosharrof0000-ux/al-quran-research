# Instruction — Project Agent Wrangler Configuration

Path: backend/project-agent/wrangler.toml
Purpose: deployment configuration for the isolated Project Agent Worker.

Rules:
- keep the Worker separate from production chat;
- AGENT_BASE_BRANCH controls task branch origin;
- observability must remain enabled;
- secrets are configured outside source;
- configuration changes require worker validation before promotion.

Status: ACTIVE — v2
