# Instruction Registry — v1.2

This registry is the dictionary/index of project instructions. It records which instructions govern which project assets.

## Central Instructions

| Instruction | Role | Status |
|---|---|---|
| `AI_ENTRY_PROTOCOL.md` | Entry point and mandatory reading order for new AI/session | ACTIVE |
| `MASTER_INSTRUCTION.md` | Operational governance and instruction hierarchy | ACTIVE |
| `INSTRUCTION_REGISTRY.md` | Instruction index and coverage map | ACTIVE |
| `INSTRUCTION_AUDIT_PROTOCOL.md` | Detect missing, stale, conflicting, or incomplete instructions | ACTIVE |
| `INSTRUCTION_CHANGE_LOG.md` | History of instruction-system changes | ACTIVE |

## Individual Critical Instructions

| Instruction | Governs | Status |
|---|---|---|
| `docs/instructions/MASTER_PROJECT.instruction.md` | `MASTER_PROJECT.md` | ACTIVE |
| `docs/instructions/PROJECT_STATE.instruction.md` | `PROJECT_STATE.md` | ACTIVE |
| `docs/instructions/PROJECT_WORK_LOG.instruction.md` | `PROJECT_WORK_LOG.md` | ACTIVE |
| `docs/instructions/PROJECT_CONTINUITY_PROTOCOL.instruction.md` | `PROJECT_CONTINUITY_PROTOCOL.md` | ACTIVE |
| `docs/instructions/PROJECT_BACKUP_INDEX.instruction.md` | `PROJECT_BACKUP_INDEX.md` | ACTIVE |
| `docs/instructions/PROJECT_HISTORY.instruction.md` | `PROJECT_HISTORY.md` | ACTIVE |
| `docs/instructions/AI_RESEARCH_BRAIN_V1.instruction.md` | `docs/AI_RESEARCH_BRAIN_V1.md` | ACTIVE |
| `docs/instructions/AI_RESEARCH_AGENT_SYSTEM_V1.instruction.md` | `docs/AI_RESEARCH_AGENT_SYSTEM_V1.md` | ACTIVE |
| `docs/instructions/RESEARCH_CHAIN_OF_COMMAND.instruction.md` | `docs/RESEARCH_CHAIN_OF_COMMAND.md` | ACTIVE |
| `docs/instructions/DATA_FATIHA.instruction.md` | `data/fatiha.json` | ACTIVE |
| `docs/instructions/BACKUP_SYSTEM.instruction.md` | `BACKUP_SYSTEM.md` | ACTIVE |
| `docs/instructions/BACKUP_POLICY.instruction.md` | `docs/BACKUP_POLICY.md` | ACTIVE |
| `docs/instructions/RESEARCH_MEMORY_V1.instruction.md` | `docs/RESEARCH_MEMORY_V1.md` | ACTIVE |
| `docs/instructions/RESEARCH_RECORD_APPROVAL_HANDOFF_V1.instruction.md` | `docs/RESEARCH_RECORD_APPROVAL_HANDOFF_V1.md` | ACTIVE |
| `docs/instructions/BACKEND_AND_LIVE_UI.instruction.md` | Active backend and live website/core UI assets | ACTIVE |

## Individual Important Instructions

| Instruction | Governs | Status |
|---|---|---|
| `docs/instructions/BACKEND_DEPENDENCY_MAP_2026-09-08.instruction.md` | `docs/BACKEND_DEPENDENCY_MAP_2026-09-08.md` | ACTIVE |
| `docs/instructions/BACKEND_DEPENDENCY_VERIFICATION_2026-09-08.instruction.md` | `docs/BACKEND_DEPENDENCY_VERIFICATION_2026-09-08.md` | ACTIVE |
| `docs/instructions/CHATBOX-DESIGN-2026-09-08.instruction.md` | `CHATBOX-DESIGN-2026-09-08.md` | ACTIVE |
| `docs/instructions/CHATBOX-V2.8-STATUS-2026-09-10.instruction.md` | `CHATBOX-V2.8-STATUS-2026-09-10.md` | ACTIVE |
| `docs/instructions/OUR_THINKING_AND_VISION.instruction.md` | `docs/OUR_THINKING_AND_VISION.md` | ACTIVE |
| `docs/instructions/PROJECT_COMMENTS.instruction.md` | `docs/PROJECT_COMMENTS.md` | ACTIVE |
| `docs/instructions/README.instruction.md` | `README.md` | ACTIVE |

## Existing Project Documents

| File | Governed role | Instruction status |
|---|---|---|
| `README.md` | Public/general project overview | Individual instruction active |
| `MASTER_PROJECT.md` | Project constitution, vision, architecture | Individual instruction active |
| `PROJECT_STATE.md` | Current state | Individual instruction active |
| `PROJECT_WORK_LOG.md` | Operational work history | Individual instruction active |
| `PROJECT_HISTORY.md` | Historical record | Individual instruction active |
| `PROJECT_CONTINUITY_PROTOCOL.md` | Continuity and handoff rules | Individual instruction active |
| `PROJECT_BACKUP_INDEX.md` | Backup/restore registry | Individual instruction active |
| `BACKUP_SYSTEM.md` | Backup architecture | Individual instruction active |
| `data/fatiha.json` | Verified Quran research dataset | Dataset instruction active |
| `docs/AI_RESEARCH_BRAIN_V1.md` | AI research brain architecture | Individual instruction active |
| `docs/AI_RESEARCH_AGENT_SYSTEM_V1.md` | AI agent architecture | Individual instruction active |
| `docs/RESEARCH_CHAIN_OF_COMMAND.md` | Research decision chain | Individual instruction active |
| `docs/RESEARCH_MEMORY_V1.md` | Research memory | Individual instruction active |
| `docs/RESEARCH_RECORD_APPROVAL_HANDOFF_V1.md` | Research approval workflow | Individual instruction active |
| `docs/BACKUP_POLICY.md` | Backup policy | Individual instruction active |
| `docs/BACKEND_DEPENDENCY_MAP_2026-09-08.md` | Backend dependency map | Individual instruction active |
| `docs/BACKEND_DEPENDENCY_VERIFICATION_2026-09-08.md` | Backend dependency verification | Individual instruction active |
| `docs/LEGACY_BACKEND_CLEANUP_PROPOSAL_2026-09-08.md` | Cleanup proposal | Historical/proposal — do not execute automatically |
| `docs/LEGACY_BACKEND_CLEANUP_STATUS_2026-09-08.md` | Cleanup status | Historical/status — do not execute automatically |
| `docs/OUR_THINKING_AND_VISION.md` | Project thinking/vision | Individual instruction active |
| `docs/PROJECT_COMMENTS.md` | Project comments/notes | Individual instruction active |
| `CHATBOX-DESIGN-2026-09-08.md` | Chatbox design record | Individual instruction active |
| `CHATBOX-V2.8-STATUS-2026-09-10.md` | Chatbox status record | Individual instruction active |

## Coverage Classes

### Class A — Critical
Own instruction required. Includes core project state, protocols, research data, schemas, API/backend, and live website assets.

### Class B — Important
Category or individual instruction required depending on complexity.

### Class C — Passive
Static/generated/temporary assets may be covered by a category rule unless they contain project logic.

## Registry Rule
Any new critical file must be added here and must have an applicable instruction before it becomes part of the active research workflow.

## Status
ACTIVE — v1.2. Critical and important documentation coverage is substantially established. Live backend/UI assets are additionally protected by a category instruction. Remaining work is audit/verification, not structural reorganization.
