# Instruction — Backend and Live UI Protection

- ID: INST-BACKEND-LIVE-UI
- Class: A — Critical production assets
- Status: ACTIVE — v1.1

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

## Live Research-ID execution rule
The Live UI must expose a clear execution path for canonical Research IDs such as `S001-A001` and `S001-A002`.

Required chain:
`Live Page → Research ID input → canonical ID lookup → Research API → actual record → UI result`

Research-ID execution is a shared UI/API capability. If multiple IDs fail at the same execution step, fix that shared layer first rather than treating each ID as a separate defect.

The UI must not claim verification from page availability or ordinary AI-chat output alone. Verification requires actual ID submission, canonical record retrieval, captured result, expected-record establishment, comparison, and recorded evidence.

If the UI cannot execute a supplied Research ID, status is `NOT VERIFIED` until the shared execution path is repaired and tested.

## Protected live path
`https://mosharrof0000-ux.github.io/al-quran-research/`

## Verification
Check intended file changes, dependency integrity, public paths, API contracts, Research-ID execution path, canonical dataset linkage, and absence of unrelated critical changes. After any Live UI change, verify the protected entry path and test representative canonical IDs before promotion.

## Related
`BACKUP_SYSTEM.md`, `docs/BACKUP_POLICY.md`, `docs/BACKEND_DEPENDENCY_MAP_2026-09-08.md`, `docs/BACKEND_DEPENDENCY_VERIFICATION_2026-09-08.md`, `MASTER_INSTRUCTION.md`, `INSTRUCTION_AUDIT_PROTOCOL.md`.
