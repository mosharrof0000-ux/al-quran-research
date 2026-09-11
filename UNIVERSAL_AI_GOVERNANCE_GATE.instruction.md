# Individual Instruction — UNIVERSAL_AI_GOVERNANCE_GATE.md

- **Instruction ID:** INST-UNIVERSAL-AI-GOVERNANCE-GATE
- **Governed file:** `UNIVERSAL_AI_GOVERNANCE_GATE.md`
- **Class:** A — Critical governance
- **Status:** ACTIVE on safety branch pending promotion review
- **Master authority:** `MASTER_INSTRUCTION.md`

## Purpose
Govern the universal startup gate that every new AI, ChatGPT ID, agent, automation, or new project session must follow before modifying the repository.

## Scope
This instruction governs the content, startup sequence, master-first governance check, target-instruction loading rule, same-folder new-file pairing rule, protected-asset rules, completion gate, and conflict/stop behavior defined by `UNIVERSAL_AI_GOVERNANCE_GATE.md`.

## Master-First Requirement
Before any requested project work begins, the governing AI must verify that the applicable instruction layer is complete and current for the task. Missing, stale, incomplete, conflicting, or outdated instructions must be created or updated first through the audit/governance process.

If bringing the instruction layer current would require deleting, removing, renaming, moving, retiring, or materially weakening an existing instruction or project rule, the AI must stop and ask the user. It may not make that governance decision independently.

## Dependencies
- `AI_ENTRY_PROTOCOL.md`
- `MASTER_INSTRUCTION.md`
- `INSTRUCTION_REGISTRY.md`
- `INSTRUCTION_AUDIT_PROTOCOL.md`
- relevant project-state and continuity documents

## Allowed Operations
- Clarify or strengthen startup safety requirements.
- Update the gate when the Master Instruction or governance architecture changes.
- Add explicit verification and stop conditions.
- Preserve compatibility with existing instruction locations while migration remains separately governed.
- Update this instruction when the governed gate's rules change.

## Forbidden Operations
- Do not weaken the Master Instruction hierarchy.
- Do not allow repository modification before startup requirements are satisfied.
- Do not remove the mandatory same-folder instruction rule for new non-instruction files without an approved governance change.
- Do not silently override higher-priority project rules.
- Do not introduce destructive cleanup as part of instruction-system organization.
- Do not independently decide to remove or retire an existing governance rule.

## New-File Pairing Rule
For every new non-instruction project file, the creating change must also create `<filename>.instruction.md` in the same directory. The instruction artifact itself is exempt from recursive sibling-instruction creation and is governed directly by the Master Instruction, Registry, audit process, and change log.

## Verification
Confirm that:
1. the startup hierarchy remains explicit;
2. the master-first governance check occurs before project work;
3. every new non-instruction file is paired with a same-folder instruction;
4. the Master Instruction remains the common authority;
5. protected project assets remain protected;
6. completion and stop conditions remain enforceable;
7. no unrelated project files are changed.

## Update Triggers
Update this instruction when:
- the universal startup sequence changes;
- the Master Instruction hierarchy changes;
- the master-first governance check changes;
- the same-folder instruction rule changes;
- registry/activation rules change;
- protected assets or stop conditions change.

## Change History
- v1.0 — Initial instruction created with the universal gate on the safety branch.
- v1.1 — Added mandatory same-folder instruction pairing and recursive-exception rule.
- v1.2 — Added master-first instruction verification and user-approval safeguard for removal/retirement/weakening of governance rules.
