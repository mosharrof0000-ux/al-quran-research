# Repository File Inventory — 2026-09-13

**Branch:** `test/write-access-2026-09-13`
**Purpose:** durable repository-wide file/path inventory and role classification.

## Root files
Root-level files are intentionally limited to canonical governance, startup, runtime, and dependency-sensitive assets. Historical documentation that was verified safe to move is stored under `docs/`.

| Class | Handling |
|---|---|
| Governance / project authority | Protected at Root; do not move without dependency/governance verification. |
| AI/session startup | Protected at Root because new sessions use these canonical paths. |
| Registry/audit | Protected at Root as canonical indexes. |
| Website/runtime | Protected at Root unless a complete deployment/reference analysis proves a move safe. |
| Research/database | Protected; no organizational move without dedicated migration verification. |
| Static site asset | Protected when deployment automation depends on the path. |

## Safe historical moves completed
- `CHATBOX-DESIGN-2026-09-08.md` + instruction → `docs/design-history/`
- `CHATBOX-V2.8-STATUS-2026-09-10.md` + instruction → `docs/design-history/`
- `BACKUP-POINT-2026-09-05.md` → `docs/backup-history/`

The original blob contents were preserved; these were path-only organizational moves on the safety branch.

## Protected examples
- `index.html` — live website entry; not moved.
- `1.html` — pilot ayah page; retained until path/deployment dependency verification is complete.
- `.github/workflows/*` — GitHub Actions canonical workflow paths; not moved.
- backend/runtime files, database files, and research data — not moved in this organization pass.
- canonical Master/governance files such as `MASTER_INSTRUCTION.md`, `PROJECT_STATE.md`, `MASTER_PROJECT.md`, `AI_ENTRY_PROTOCOL.md`, `INSTRUCTION_REGISTRY.md`, `PROJECT_WORK_LOG.md`, and `LIVE_CONNECTION_MAP.md` — retained at Root because their paths are part of the project continuity/governance contract.

## Folder governance
All governed top-level folders and known nested folders have local `MASTER/` governance. Historical/design archives are organized under `docs/design-history/`; backup-point history is under `docs/backup-history/`.

## Dictionary-first organization
The research-data chain remains:
`আরবি শব্দ → Lemma → Root → শব্দরূপ/মরফোলজি → ব্যাকরণ → অর্থের পরিসর → কুরআনে ব্যবহার → আয়াত → প্রসঙ্গ → প্রমাণ → গবেষণা/বিশ্লেষণ → সংস্করণ ইতিহাস`.

## Safety rule
A file is moved only when its role is clearly historical/documentary and its move does not alter a live dependency. For dependency-sensitive files, leave the file in place and document why.

## Status
**SAFE ORGANIZATION IN PROGRESS.** Historical/documentation files proven safe have been moved. Remaining Root files require individual dependency verification before any further move.
