# Instruction — LIVE_CONNECTION_MAP.md

- ID: INST-LIVE-CONNECTION-MAP
- Class: Critical production reference
- Status: ACTIVE

## Purpose
Govern the canonical production connection map used to diagnose live-site chat and AI connection failures.

## Scope
Applies to `LIVE_CONNECTION_MAP.md` and the documented GitHub Pages → chat UI → Worker → backend → AI/Research API path.

## Allowed operations
- Update when the canonical live entrypoint, Worker endpoint, deployment path, backend entry, Research API path, or recovery path changes.
- Add verified troubleshooting evidence and production fix history references.

## Forbidden operations
- Do not invent a live endpoint or dependency.
- Do not remove the documented fallback without an approved replacement.
- Do not treat a successful page load as proof that the AI/Research API path works.
- Do not use this map as permission to modify production code.

## Verification
After changes, verify the relevant repository files, live entrypoint references, Worker configuration, and deployment workflow. For a production incident, record the observed error, failing layer, fix, and verification.

## Update triggers
Update this map whenever the canonical live path or its important dependency chain changes, or when a new verified root cause materially improves future troubleshooting.

## Related governance
`MASTER_INSTRUCTION.md`, `MASTER_PROJECT.md`, `PROJECT_STATE.md`, `PROJECT_CONTINUITY_PROTOCOL.md`, `backend/BACKEND_AND_LIVE_UI.instruction.md`, `.github/workflows/GITHUB_ACTIONS_AND_AUTOMATION.instruction.md`
