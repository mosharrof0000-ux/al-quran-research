# Repository File Inventory — 2026-09-13

**Branch:** `test/write-access-2026-09-13`  
**Inventory source:** GitHub recursive repository tree for this branch  
**Tree SHA:** `a925f22d8662831c98058d1df082f783d77cfdaa`  
**Purpose:** establish a durable, non-destructive inventory reference so files can scale without losing identity or purpose.

## Inventory rule
The recursive Git tree is the authoritative path inventory. Every repository path is classified by location and role; no file is moved, renamed, deleted, or overwritten merely for organization.

## Root files
Root-level files fall into these controlled classes:

| Class | Covered assets | Handling |
|---|---|---|
| Governance | `MASTER_INSTRUCTION.md`, `MASTER_PROJECT.md`, `PROJECT_STATE.md`, `PROJECT_WORK_LOG.md`, `PROJECT_HISTORY.md`, `PROJECT_CONTINUITY_PROTOCOL.md`, `PROJECT_BACKUP_INDEX.md`, `BACKUP_SYSTEM.md`, `SAFE_WORKSPACE_PROTOCOL.md`, `WORKSPACE_STATE.md` | Protected; governed by colocated `.instruction.md` files where present and central governance rules |
| AI/session continuity | `AI_ENTRY_PROTOCOL.md`, `NEW_AI_SESSION_START_GUIDE.md`, `UNIVERSAL_AI_GOVERNANCE_GATE.md` | Startup/continuity governance; do not weaken without approval |
| Registry/audit | `INSTRUCTION_REGISTRY.md`, `INSTRUCTION_AUDIT_PROTOCOL.md`, `INSTRUCTION_CHANGE_LOG.md` | Canonical instruction coverage and change history |
| Website/runtime | `index.html`, `1.html`, `chat.html`, `chat-system.js`, `chatbox-*.js`, `chatbox-v28-bridge.js`, `chatbox-v28-live.html`, `our-thinking.html`, `page-*.html`, `surah-index.html`, `tafsir-library.html`, `research-approval.html`, `tool-engine.js` | Runtime/site assets; dependency-sensitive; no organizational moves without verification |
| Design/history | `design-preview*.html`, `sufi-*.html` | Preserved historical/design work; not assumed production |
| Research/database | `quran_research.db`, `schema.sql` | Protected research/database assets; no destructive changes |
| Static asset | `favicon.svg` | Site asset; synchronized through governed automation |

## `.github/`
- `MASTER/README.md` and instruction: folder governance.
- `workflows/MASTER/README.md` and instruction: workflow governance.
- `workflows/GITHUB_ACTIONS_AND_AUTOMATION.instruction.md`: workflow-specific governance.
- Active/legacy workflows are preserved in place. `live-entrypoint-sync.yml` is the canonical automatic live-entrypoint writer; legacy writers remain historical/manual.

## `assets/`
- `MASTER/README.md` and instruction: folder governance.
- `tiya-ai-logo.svg`: project visual asset; preserved in place.

## `backend/`
- `MASTER/README.md` and instruction: folder governance.
- `BACKEND_AND_LIVE_UI.instruction.md`: active backend/live UI scope.
- `ai-research-brain.js`: research reasoning/orchestration logic.
- `chat-recovery.js`, `chat-recovery-v3.js`: chat recovery paths.
- `cors-entry.js`: CORS entry handling.
- `research-api-contract-v1.md`: API contract.
- `research-api-entry.js`, `research-api.js`: research API entry/implementation.
- `research-memory.js`: research memory layer.
- `research-output-style.js`: output formatting/style layer.
- `research-project-context.js`: project context layer.
- `research-record-gate.js`: research-record save/approval gate.
- `worker-entry.js`, `worker-entry-v1.2.js`, `worker.js`: Worker entry/runtime variants; dependency-sensitive.
- `wrangler.jsonc`: Worker deployment configuration.

## `data/`
- `MASTER/README.md` and instruction: data governance.
- `dictionary/MASTER/README.md`, instruction, and `DICTIONARY_STRUCTURE.md` + instruction: dictionary-first research index.
- `fatiha-master-v1.json`: protected pilot/master dataset.
- `fatiha.json` + instruction: Fatiha dataset governed as a research data asset.
- `research-records/README.md`, `MASTER/README.md`, instruction, `.gitkeep`: research-record storage area.
- `research-records/RR-Q001001-V1.json`: versioned pilot research record.
- `research-records/RR-Q001001-V1.schema.json`: schema for the pilot research record.

## `database/`
- `MASTER/README.md` and instruction: database governance.
- `schema.sql`: database schema.
- `pilot_fatiha_v0.1.sql`: pilot seed/data script.

## `docs/`
The directory contains research architecture, methodology, governance, backup/restore, backend dependency, AI/research, chat, approval, and historical project documentation. Each existing governed document is retained at its current path; colocated `.instruction.md` files govern the critical instruction-bearing documents.

Notable controlled documents include:
- AI/research: `AI_RESEARCH_AGENT_SYSTEM_V1.md`, `AI_RESEARCH_BRAIN_V1.md`, `RESEARCH_CHAIN_OF_COMMAND.md`, `RESEARCH_MEMORY_V1.md`.
- Architecture/data: `master-architecture-v1.md`, `master-database-schema-v1.sql`, `data_dictionary.md`, `website-data-map-v1.md`, `workspace-data-model-v1.md`, `multi-workspace-versioning-v1.md`.
- Dependency/live connection: `BACKEND_DEPENDENCY_MAP_2026-09-08.md`, `BACKEND_DEPENDENCY_VERIFICATION_2026-09-08.md`, `worker-research-api-integration-v1.md`, `worker-wrapper-integration-v1.md`, `chat-connection-research-v1.md`.
- Research governance: `RESEARCH_CHAIN_OF_COMMAND.md`, `RESEARCH_RECORD_APPROVAL_HANDOFF_V1.md`, `RESEARCH_RECORD_APPROVAL_INTERFACE_V1.md`, `RESEARCH_RECORD_APPROVAL_V2.md`, `RESEARCH_RECORD_SAVE_GATE_V1.md`, `RESEARCH_RECORD_SAVE_GATE_TEST_2026-09-08.md`.
- Backup/restore: `BACKUP_POLICY.md`, `backup-restore-commands-v1.md`, `backup-restore-policy-v1.md`, `RESTORE_MANIFEST.json`, `SAFE_POINT.md`.
- Methodology: `methodology/research_rules.md`.
- Historical/proposal records: legacy backend cleanup, technology watch/audit, project comments, project vision, tafsir classification, and related dated records remain preserved as historical/reference material.
- `MASTER/README.md` and instruction: folder governance.

## `exports/`
- `MASTER/README.md` and instruction: export governance.
- `schema_manifest.json`: exported schema manifest.

## `migrations/`
- `MASTER/README.md` and instruction: migration governance.
- `002_workspace_versioning.sql`: workspace/versioning migration.

## `scripts/`
- `MASTER/README.md` and instruction: script governance.
- `test-research-record-gate.py`: save-gate contract test.

## `validation/`
- `MASTER/README.md` and instruction: validation governance.
- `pilot_validation.md`: pilot validation record.

## Documentation status
**COMPLETE for the repository-organization/documentation phase.**

The inventory establishes:
1. authoritative repository path coverage;
2. folder ownership/governance;
3. role classification for runtime, data, database, documentation, workflow, design, and historical assets;
4. protected/no-move rule;
5. dictionary-first data direction;
6. separation of active assets from historical/legacy assets.

### Important boundary
This document does **not** claim that every future Qur'an research feature is implemented. It claims that the repository documentation/organization baseline is now documented and that remaining product/research development is a separate workstream.
