# Instruction Registry — v1.8

This registry is the dictionary/index of project instructions. It records which instructions govern which project assets.

## Central Instructions

| Instruction | Role | Status |
|---|---|---|
| `AI_ENTRY_PROTOCOL.md` | Bootstrap entry point and mandatory reading order for new AI/session | ACTIVE |
| `UNIVERSAL_AI_GOVERNANCE_GATE.md` | Universal startup gate and master-first governance check | REVIEW — safety branch candidate; not promoted to `main` |
| `NEW_AI_SESSION_START_GUIDE.md` | Legacy/operational startup guide for new AI, ID, agent, or chat | ACTIVE — preserved historical/operational guide |
| `MASTER_INSTRUCTION.md` | Operational governance and instruction hierarchy | ACTIVE |
| `INSTRUCTION_REGISTRY.md` | Instruction index and coverage map | ACTIVE |
| `INSTRUCTION_AUDIT_PROTOCOL.md` | Detect missing, stale, conflicting, or incomplete instructions | ACTIVE |
| `INSTRUCTION_CHANGE_LOG.md` | History of instruction-system changes | ACTIVE |

## Colocated governance instructions

| Instruction | Governs | Status |
|---|---|---|
| `AI_ENTRY_PROTOCOL.instruction.md` | `AI_ENTRY_PROTOCOL.md` | ACTIVE |
| `MASTER_INSTRUCTION.instruction.md` | `MASTER_INSTRUCTION.md` | ACTIVE |
| `INSTRUCTION_REGISTRY.instruction.md` | `INSTRUCTION_REGISTRY.md` | ACTIVE |
| `INSTRUCTION_AUDIT_PROTOCOL.instruction.md` | `INSTRUCTION_AUDIT_PROTOCOL.md` | ACTIVE |
| `INSTRUCTION_CHANGE_LOG.instruction.md` | `INSTRUCTION_CHANGE_LOG.md` | ACTIVE |
| `UNIVERSAL_AI_GOVERNANCE_GATE.instruction.md` | `UNIVERSAL_AI_GOVERNANCE_GATE.md` | ACTIVE — governs safety-branch candidate gate |

## Individual Critical Instructions

| Instruction | Governs | Status |
|---|---|---|
| `MASTER_PROJECT.instruction.md` | `MASTER_PROJECT.md` | ACTIVE |
| `PROJECT_STATE.instruction.md` | `PROJECT_STATE.md` | ACTIVE |
| `PROJECT_WORK_LOG.instruction.md` | `PROJECT_WORK_LOG.md` | ACTIVE |
| `PROJECT_CONTINUITY_PROTOCOL.instruction.md` | `PROJECT_CONTINUITY_PROTOCOL.md` | ACTIVE |
| `PROJECT_BACKUP_INDEX.instruction.md` | `PROJECT_BACKUP_INDEX.md` | ACTIVE |
| `PROJECT_HISTORY.instruction.md` | `PROJECT_HISTORY.md` | ACTIVE |
| `BACKUP_SYSTEM.instruction.md` | `BACKUP_SYSTEM.md` | ACTIVE |
| `docs/AI_RESEARCH_BRAIN_V1.instruction.md` | `docs/AI_RESEARCH_BRAIN_V1.md` | ACTIVE |
| `docs/AI_RESEARCH_AGENT_SYSTEM_V1.instruction.md` | `docs/AI_RESEARCH_AGENT_SYSTEM_V1.md` | ACTIVE |
| `docs/RESEARCH_CHAIN_OF_COMMAND.instruction.md` | `docs/RESEARCH_CHAIN_OF_COMMAND.md` | ACTIVE |
| `docs/RESEARCH_MEMORY_V1.instruction.md` | `docs/RESEARCH_MEMORY_V1.md` | ACTIVE |
| `docs/RESEARCH_RECORD_APPROVAL_HANDOFF_V1.instruction.md` | `docs/RESEARCH_RECORD_APPROVAL_HANDOFF_V1.md` | ACTIVE |
| `data/fatiha.json.instruction.md` | `data/fatiha.json` | ACTIVE |
| `docs/BACKUP_POLICY.instruction.md` | `docs/BACKUP_POLICY.md` | ACTIVE |
| `backend/BACKEND_AND_LIVE_UI.instruction.md` | Active backend and live website/core UI assets | ACTIVE |
| `.github/workflows/GITHUB_ACTIONS_AND_AUTOMATION.instruction.md` | `.github/workflows/*.yml`, `.github/workflows/*.yaml` | ACTIVE |

## Individual Important Instructions

| Instruction | Governs | Status |
|---|---|---|
| `docs/BACKEND_DEPENDENCY_MAP_2026-09-08.instruction.md` | `docs/BACKEND_DEPENDENCY_MAP_2026-09-08.md` | ACTIVE |
| `docs/BACKEND_DEPENDENCY_VERIFICATION_2026-09-08.instruction.md` | `docs/BACKEND_DEPENDENCY_VERIFICATION_2026-09-08.md` | ACTIVE |
| `CHATBOX-DESIGN-2026-09-08.instruction.md` | `CHATBOX-DESIGN-2026-09-08.md` | ACTIVE |
| `CHATBOX-V2.8-STATUS-2026-09-10.instruction.md` | `CHATBOX-V2.8-STATUS-2026-09-10.md` | ACTIVE |
| `docs/OUR_THINKING_AND_VISION.instruction.md` | `docs/OUR_THINKING_AND_VISION.md` | ACTIVE |
| `docs/PROJECT_COMMENTS.instruction.md` | `docs/PROJECT_COMMENTS.md` | ACTIVE |
| `README.instruction.md` | `README.md` | ACTIVE |

## Audit Records

| Record | Purpose | Status |
|---|---|---|
| `docs/INSTRUCTION_AUDIT_AUTOMATION_2026-09-11.md` | Workflow permissions, live-entrypoint overlap, and completed consolidation record | VERIFIED |

## Canonical Production Automation

| Asset | Role | Status |
|---|---|---|
| `.github/workflows/live-entrypoint-sync.yml` | Single automatic writer for protected live-entrypoint integrations | ACTIVE |
| `.github/workflows/backup-main.yml` | Automatic main-branch rollback/backup support | ACTIVE |
| `.github/workflows/deploy-worker.yml` | Backend Worker deployment | ACTIVE |
| `.github/workflows/research-record-approval.yml` | Human-approved versioned research record creation | ACTIVE |

## Legacy Automation Preserved

| Workflow | Current role | Status |
|---|---|---|
| `.github/workflows/connect-tafsir-library.yml` | Historical/manual notice; no repository write | LEGACY |
| `.github/workflows/connect-tafsir-library-now.yml` | Historical/manual notice; no repository write | LEGACY |
| `.github/workflows/set-site-favicon.yml` | Historical/manual notice; no repository write | LEGACY |
| `.github/workflows/install-chat-system.yml` | Historical/manual notice; no repository write | LEGACY |

## Existing Project Documents

The individual instructions above are now colocated with their governed target file or governing scope. Historical instruction content remains preserved in Git history; the old `docs/instructions/` directory is retired as a loose instruction container.

## Coverage Classes

### Class A — Critical
Own instruction required. Includes core project state, protocols, research data, schemas, API/backend, live website assets, and production automation.

### Class B — Important
Category or individual instruction required depending on complexity.

### Class C — Passive
Static/generated/temporary assets may be covered by a category rule unless they contain project logic.

## Registry Rule
Any new governed project file must be paired with its same-folder `<filename>.instruction.md` instruction in the same governed change, unless the file itself is an `.instruction.md` governance artifact. New critical files must also be represented in this Registry before becoming part of the active research workflow.

Before any requested task begins, the Master-First Governance Check must confirm that applicable instructions are current. Missing or stale instructions are corrected first. Removal, retirement, or weakening of an existing instruction/rule requires user approval.

## Controlled Promotion Rule
Safety-branch governance work is not production publication. Before promotion to `main`, the branch must be compared against `main`, protected assets must be checked, governance documents must be consistent, required verification must pass, and explicit user/authorized approval must be obtained when required. Promotion and post-promotion verification are recorded separately from the safety-branch implementation.

## Migration Rule
Instructions formerly stored under `docs/instructions/` were migrated by copy → verify → registry update → old-path removal. No governed target file, website path, backend path, data file, or research record was moved as part of this instruction migration.

## Status
ACTIVE — v1.8. Colocated instruction architecture is established on the safety branch. Universal startup governance remains in REVIEW on the safety branch and is not promoted to `main`.
