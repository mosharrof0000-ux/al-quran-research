# Instruction — PROJECT_AGENT_ENGINE_V1.md

## Purpose
Describe the isolated Project Agent Engine architecture and safety boundaries.

## Rules
- Keep production chat Worker isolated.
- Main write, merge and production deployment remain forbidden to the engine.
- Document every added tool and safety constraint.
- Identity and handoff behavior must match the Agent Identity Registry and Work Ledger.

## Verification
Confirm documented tools and safety rules match backend/project-agent implementation.

## Status
ACTIVE on safety branch; promotion pending.
