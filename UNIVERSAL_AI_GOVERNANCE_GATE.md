# Universal AI Governance Gate — v1.0

## Purpose
This is the universal startup gate for the Al-Quran Research project.

Any new AI, ChatGPT ID, agent, automation, or new chat/session that will work on this repository must follow this document before changing project files.

This document does not replace the Master Instruction. It is the controlled entry mechanism that loads and enforces the project's instruction hierarchy.

## Non-Negotiable Rule
Do not begin repository modification until the startup sequence below has been completed.

If required information cannot be verified, stop and report the uncertainty rather than guessing.

## Startup Sequence

### Step 1 — Load the governance core
Read, in this order:
1. `AI_ENTRY_PROTOCOL.md`
2. `MASTER_INSTRUCTION.md`
3. `INSTRUCTION_REGISTRY.md`
4. `INSTRUCTION_AUDIT_PROTOCOL.md`

### Step 2 — Establish current project state
Read as relevant:
- `MASTER_PROJECT.md`
- `PROJECT_STATE.md`
- `PROJECT_CONTINUITY_PROTOCOL.md`
- `PROJECT_WORK_LOG.md`
- `PROJECT_BACKUP_INDEX.md`

Do not treat old chat memory as the current repository state.

### Step 3 — Identify the target
Before editing, determine:
- exact task requested by the user;
- exact target file(s);
- whether each target is existing or newly created;
- dependencies and callers;
- whether the target affects research data, website, backend, API, automation, or public paths;
- whether a safe point/backup is required.

### Step 4 — Load the target instruction
For every existing target file:
- locate its corresponding instruction in `docs/instructions/`;
- read that instruction before editing;
- confirm its status is applicable/ACTIVE;
- if no instruction exists, do not silently invent governance: apply the Master Instruction/category rule, flag the missing instruction, and create the instruction before the file becomes part of an active critical workflow.

For every new critical file:
- create its instruction as part of the same governed change;
- register the instruction and the file in `INSTRUCTION_REGISTRY.md` before treating the file as an active critical asset.

## Master Rule
`MASTER_INSTRUCTION.md` is the common governing rule for all individual file instructions.

The hierarchy is:

`User Current Instruction → Master Instruction → Critical Protocols → Category Instruction → Individual File Instruction → File`

A lower-level instruction must never silently override a higher-level instruction.

## Scalable Instruction Model
The project is designed to scale from dozens to thousands of files.

The system must NOT require every AI session to read every instruction.

Instead:

`Master Governance → Registry Lookup → Relevant Individual Instruction → Target File`

Therefore, if the project eventually contains 1,000 files, it may contain approximately 1,000 corresponding instructions, while the Master Instruction remains the common governing layer and the Registry remains the index.

## New File Rule
Whenever a new file is introduced:

1. Identify its role and risk class.
2. Determine whether it is Critical, Important, or Passive.
3. Create the appropriate individual instruction when required.
4. Record identity, purpose, scope, inputs/outputs, dependencies, allowed/forbidden operations, verification, evidence requirements, update triggers, related instructions, version, and history.
5. Register the instruction in `INSTRUCTION_REGISTRY.md`.
6. Only then treat the new critical file as an established project asset.

Do not create duplicate instructions for the same governed file without a documented reason.

## Protected Assets
The following are protected by default:
- GitHub Pages live site and public entry paths;
- existing website entrypoints;
- research datasets and stable IDs;
- backend/API paths;
- GitHub Actions and production automation;
- research records and evidence;
- backup and continuity mechanisms;
- historical records and audit trails.

Never delete, rename, move, or overwrite an existing project asset merely for organization.

## Research Safety
- AI-generated information is not automatically verified.
- Raw research data must be preserved.
- Corrections must be versioned rather than silently overwritten.
- Published claims require traceable evidence.
- Uncertainty and legitimate scholarly disagreement must remain explicit.
- No hidden chain-of-thought or private reasoning is to be stored as a project research record.

## Change Procedure
Before a meaningful change:

`Inspect → Read Instructions → Map Dependencies → Safe Point → Minimal Change → Verify → Update Instruction/Registry → Log Change`

When instructions, dependencies, architecture, or governance rules change, use `INSTRUCTION_AUDIT_PROTOCOL.md`.

## Conflict Rule
If two instructions conflict:
1. identify both instructions;
2. identify the exact conflict;
3. apply the hierarchy in `MASTER_INSTRUCTION.md`;
4. preserve the safer interpretation temporarily;
5. do not silently rewrite the Master Instruction;
6. route permanent governance changes through the instruction-audit process.

## Completion Gate
A task is not complete until applicable checks confirm:
- intended file(s) changed;
- required instruction(s) exist and are consistent;
- registry is accurate;
- no unrelated critical files changed;
- paths/links remain intact;
- syntax/data integrity is valid;
- research evidence/uncertainty rules remain intact;
- relevant change history is recorded.

## Stop Conditions
Stop and ask for clarification or review when:
- the requested change conflicts with a higher-priority instruction;
- a protected production path may be broken;
- a target's dependency cannot be established;
- required evidence is unavailable;
- a destructive operation appears necessary;
- the current state cannot be verified safely.

## Universal Handoff Statement
A new AI/session may begin work only after it can state, in substance:

> I have loaded the project governance entry point, Master Instruction, Registry, relevant project state, and the specific instruction(s) governing my target. I will preserve protected assets, make only the requested/minimal change, and verify and record the result before considering the task complete.

## Status
DRAFT — created as a safety-reviewed candidate on a dedicated branch. It must be reviewed before becoming the canonical universal entry point on `main`.
