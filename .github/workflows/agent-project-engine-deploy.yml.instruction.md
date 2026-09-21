# Instruction — Isolated Project Agent Deployment Workflow

- ID: INST-AGENT-ENGINE-WORKFLOW
- Target: `.github/workflows/agent-project-engine-deploy.yml`
- Class: A — Critical automation
- Status: ACTIVE

## Rules
- Deploy only the isolated Project Agent Worker.
- Do not deploy the production chat Worker.
- Run health smoke tests after deployment.
- Preserve branch isolation and least-privilege permissions.

## Verification
Workflow target URL must remain distinct from the production chat Worker and health checks must require isolated=true, merge=false, deploy=false.
