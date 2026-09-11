# Instruction — docs/BACKEND_DEPENDENCY_MAP_2026-09-08.md

- Instruction ID: `INST-BACKEND-DEPENDENCY-MAP`
- Class: B — Important
- Status: ACTIVE

## Purpose
Preserve evidence-based knowledge of active backend dependencies and prevent unsafe cleanup based on filenames alone.

## Rules
1. Treat configured entrypoints and verified callers as evidence of active use.
2. Do not delete or rename a candidate merely because it appears legacy.
3. Preserve historical/rollback value until deployment, workflow, and Git history are evaluated.
4. Separate active production path from legacy candidates and proposals.
5. Any cleanup proposal must be reversible and preceded by backup and dependency verification.
6. Do not change the current Worker endpoint or deployment entrypoint while merely documenting dependencies.

## Verification
Re-check `wrangler` configuration, deployment workflow, imports/callers, and relevant history before changing dependency status.

## Update triggers
Update when backend entrypoints, imports, deployment workflow, provider integration, or legacy-file evidence changes.
