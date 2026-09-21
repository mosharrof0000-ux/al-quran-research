# Instruction — agent-project-engine-deploy.yml
- ID: INST-PROJECT-AGENT-DEPLOY-WORKFLOW
- Class: B — Isolated automation
- Status: ACTIVE
- Purpose: Deploy and smoke-test only the isolated Project Agent Worker.
- Rules: Do not target the production chat Worker; preserve isolation checks; do not grant unnecessary repository write permission.
- Verification: deployment URL, isolated=true, merge=false and deploy=false health assertions.
- Update trigger: workflow target, permission, smoke-test or deployment behavior changes.