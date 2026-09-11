# Instruction — Backend and Live UI Protection

- ID: INST-BACKEND-LIVE-UI
- Class: A — Critical production assets
- Status: ACTIVE

## Scope
Covers the active backend deployment path and live website/core UI assets, including `backend/wrangler.jsonc`, `backend/worker-entry.js`, its active dependencies, GitHub Pages entry files such as `index.html`, `chatbox-v28-live.html`, and related runtime JavaScript.

## Purpose
Prevent accidental breakage of the deployed research system and GitHub Pages site while allowing controlled improvements.

## Rules
1. Never delete, rename, move, or replace a production file merely for organization.
2. Before backend or live UI changes, identify the exact dependency/caller path.
3. Preserve stable API contracts, Worker endpoint configuration, public routes, and GitHub Pages entry paths unless a deliberate migration is separately approved.
4. Existing legacy candidates must remain preserved until deployment, rollback, and archival value are independently assessed.
5. Never overwrite active files with generated/index automation unless the exact target and resulting content are verified.
6. Production changes require backup/safe point, minimal diff, test, and verification.
7. Research data and UI code must remain logically separate.
8. Do not place secrets/API keys in repository files.
9. If a change may affect the live site, verify the relevant entry path and links after the change.
10. A documentation claim of ACTIVE/LEGACY must be supported by current configuration or repository evidence.

## Protected live path
`https://mosharrof0000-ux.github.io/al-quran-research/`

## Verification
Check intended file changes, dependency integrity, public paths, API contracts, and absence of unrelated critical changes.

## Related
`BACKUP_SYSTEM.md`, `docs/BACKUP_POLICY.md`, `docs/BACKEND_DEPENDENCY_MAP_2026-09-08.md`, `docs/BACKEND_DEPENDENCY_VERIFICATION_2026-09-08.md`, `MASTER_INSTRUCTION.md`, `INSTRUCTION_AUDIT_PROTOCOL.md`.
