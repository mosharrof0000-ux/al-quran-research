# Instruction Change Log — v1.2

This file records controlled changes to the instruction-governance layer.

## 2026-09-11 — Initial Instruction Governance Layer

### Added
- `AI_ENTRY_PROTOCOL.md`
- `MASTER_INSTRUCTION.md`
- `INSTRUCTION_REGISTRY.md`
- `INSTRUCTION_AUDIT_PROTOCOL.md`
- `INSTRUCTION_CHANGE_LOG.md`

### Reason
Create a safe, instruction-first governance layer so a new AI/ChatGPT ID can enter the project consistently and work from documented rules.

### Safety Decision
No existing project file was deleted, renamed, moved, or replaced as part of this initial setup.

### Live-Site Decision
The existing GitHub Pages path remains the protected deployment path:
`https://mosharrof0000-ux.github.io/al-quran-research/`

### Repository Decision
Existing project architecture remains in place. The new instruction layer is additive.

## 2026-09-11 — Critical Instruction Coverage Expansion

### Added individual instructions
- `docs/instructions/BACKUP_SYSTEM.instruction.md`
- `docs/instructions/BACKUP_POLICY.instruction.md`
- `docs/instructions/RESEARCH_MEMORY_V1.instruction.md`
- `docs/instructions/RESEARCH_RECORD_APPROVAL_HANDOFF_V1.instruction.md`
- `docs/instructions/BACKEND_DEPENDENCY_MAP_2026-09-08.instruction.md`
- `docs/instructions/BACKEND_DEPENDENCY_VERIFICATION_2026-09-08.instruction.md`
- `docs/instructions/CHATBOX-DESIGN-2026-09-08.instruction.md`
- `docs/instructions/CHATBOX-V2.8-STATUS-2026-09-10.instruction.md`

### Registry update
`INSTRUCTION_REGISTRY.md` advanced to v1.1 and recorded the critical/important instruction coverage created so far.

### Safety Decision
This phase added instruction files and registry documentation only. No research dataset, website entrypoint, backend entrypoint, historical file, or live-site path was deleted, renamed, moved, or replaced.

## 2026-09-11 — Documentation and Live-System Protection Expansion

### Added
- `docs/instructions/PROJECT_HISTORY.instruction.md`
- `docs/instructions/OUR_THINKING_AND_VISION.instruction.md`
- `docs/instructions/PROJECT_COMMENTS.instruction.md`
- `docs/instructions/README.instruction.md`
- `docs/instructions/BACKEND_AND_LIVE_UI.instruction.md`

### Registry update
`INSTRUCTION_REGISTRY.md` advanced from v1.1 to v1.2 and now records these instructions as active.

### Safety Decision
Only additive instruction/governance files and registry/log documentation were changed. Existing research, backend, website, history, and data assets were not structurally altered.

### Live-Site Decision
The GitHub Pages path remains protected. The backend/live-UI instruction explicitly requires dependency identification, backup/safe point, minimal diff, testing, and verification before production changes.

### Next Controlled Work
Perform a repository-wide instruction audit for missing coverage, stale references, conflicting rules, and dependency drift. Do not begin structural cleanup or automated enforcement until the audit is reviewed.
