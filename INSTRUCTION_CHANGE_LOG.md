# Instruction Change Log — v1.5

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

## 2026-09-11 — Automation Governance Audit

### Finding
Repository inspection identified multiple GitHub Actions workflows with write permissions and workflows capable of modifying the live `index.html` entrypoint.

### Added
- `docs/instructions/GITHUB_ACTIONS_AND_AUTOMATION.instruction.md`

### Classification
The finding is classified as `LIVE-ENTRYPOINT-WRITE` / production-impacting automation.

### Safety Decision
No workflow was deleted during the audit phase. A dedicated pre-change backup branch was later created before controlled consolidation.

## 2026-09-11 — Canonical Live-Entrypoint Consolidation

### User approval
The user explicitly approved controlled consolidation of live-entrypoint writers.

### Safe point
- Branch: `backup/pre-live-entrypoint-consolidation-2026-09-11`
- Pre-change commit: `35249656450757813964b2fd83287edf0551ee49`

### Added
- `.github/workflows/live-entrypoint-sync.yml`

### Changed, preserved in place
The following existing workflow files were retained but converted to manual/read-only legacy notices:
- `.github/workflows/connect-tafsir-library.yml`
- `.github/workflows/connect-tafsir-library-now.yml`
- `.github/workflows/set-site-favicon.yml`
- `.github/workflows/install-chat-system.yml`

### Governance updates
- `docs/INSTRUCTION_AUDIT_AUTOMATION_2026-09-11.md` updated to VERIFIED consolidation status.
- `docs/instructions/GITHUB_ACTIONS_AND_AUTOMATION.instruction.md` updated to define the canonical writer rule.
- `INSTRUCTION_REGISTRY.md` advanced to v1.4.
- `PROJECT_BACKUP_INDEX.md` updated with the pre-change safe point.
- `PROJECT_WORK_LOG.md` updated with the verified implementation record.

### Safety result
No workflow file was deleted, renamed, or moved. Backend deployment, research approval, backup, smoke-test, and link-integrity workflows were preserved.

### Final rule
Only `.github/workflows/live-entrypoint-sync.yml` retains automatic repository-write behavior for the protected live-entrypoint integrations.

## 2026-09-11 — Master-First Governance and Universal Startup Gate

### Added / strengthened
- `UNIVERSAL_AI_GOVERNANCE_GATE.md` established as the universal startup gate candidate.
- `MASTER_INSTRUCTION.md` advanced to v1.2.
- `INSTRUCTION_REGISTRY.md` advanced to v1.6.

### New mandatory rule
Before any requested project work begins, the governing AI must first verify the applicable instruction layer. Missing, stale, incomplete, conflicting, or outdated instructions must be created or updated first through the audit/governance process.

### Approval safeguard
If bringing the instruction layer current would require removing, deleting, renaming, moving, retiring, or materially weakening an existing instruction or project rule, the AI must stop and ask the user. It may not make that governance decision autonomously.

### New-file rule reaffirmed
Every new non-instruction project file must be created together with its same-folder `<filename>.instruction.md` sibling. An instruction artifact itself is exempt from recursive self-instruction.

### Safety result
This governance change was made on the dedicated safety branch `safety/universal-ai-governance-gate-2026-09-11`. No production website, research dataset, backend entrypoint, or public path was changed.
