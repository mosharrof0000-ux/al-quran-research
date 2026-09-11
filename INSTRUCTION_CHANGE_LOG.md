# Instruction Change Log — v1.1

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
`INSTRUCTION_REGISTRY.md` advanced from v1.0 to v1.1 and now records the active individual instruction coverage created so far.

### Safety Decision
This phase added instruction files and registry documentation only. No research dataset, website entrypoint, backend entrypoint, historical file, or live-site path was deleted, renamed, moved, or replaced.

### Verification Decision
The newly governed source documents were read before their instructions were created. The instructions preserve their existing safety intent rather than changing the governed assets.

### Next Controlled Work
Cover the remaining important documents (`PROJECT_HISTORY.md`, `OUR_THINKING_AND_VISION.md`, `PROJECT_COMMENTS.md`, `README.md`) and then add a dedicated live-website/core-UI protection instruction after inspecting the current website files. Only after that should a repository-wide instruction audit or automation be considered.
