# Universal AI Governance Gate — v1.2

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

### Step 2 — Master-First Governance Check
Before doing the requested project work, the AI must verify the governance layer for the task:
- identify every target file and its applicable instruction;
- check that the instruction exists and is current, complete, registered where required, and consistent with the target;
- identify missing, stale, incomplete, conflicting, or obsolete instruction rules;
- update/create the required instruction first through the audit process;
- only then begin the requested underlying work.

The AI must not knowingly postpone required instruction maintenance until after the project task.

If making the governance layer current would require deleting, removing, renaming, moving, retiring, or materially weakening an existing rule or instruction, stop and ask the user for approval. Do not decide that removal is necessary on your own.

### Step 3 — Establish current project state
Read as relevant:
- `MASTER_PROJECT.md`
- `PROJECT_STATE.md`
- `PROJECT_CONTINUITY_PROTOCOL.md`
- `PROJECT_WORK_LOG.md`
- `PROJECT_BACKUP_INDEX.md`

Do not treat old chat memory as the current repository state.

### Step 4 — Identify the target
Before editing, determine:
- exact task requested by the user;
- exact target file(s);
- whether each target is existing or newly created;
- dependencies and callers;
- whether the target affects research data, website, backend, API, automation, or public paths;
- whether a safe point/backup is required.

### Step 5 — Load the target instruction
For every existing target file:
- locate its applicable individual instruction;
- for files governed by the new same-folder rule, this is `<filename>.instruction.md` in the same directory;
- existing files that still use `docs/instructions/` remain governed by their existing instruction until separately migrated;
- read the instruction before editing;
- confirm its status is applicable/ACTIVE;
- if no instruction exists, do not silently invent governance: apply the Master Instruction/category rule, flag the missing instruction, and create the instruction before the file becomes part of an active critical workflow.

### Step 6 — Mandatory new-file pairing
Whenever a new non-instruction project file is created:
1. create the governed file;
2. immediately create its sibling `<filename>.instruction.md` in the same directory;
3. make the instruction complete enough to govern the file safely;
4. register the governed file and its instruction where required;
5. verify the pair before considering the change complete.

The only exception is an `.instruction.md` governance artifact itself; it does not require another instruction file because that would create infinite recursion. It is governed directly by the Master Instruction, Registry, audit process, and change log.

### Step 7 — Registry and activation
A new critical file must have both its file and instruction represented in `INSTRUCTION_REGISTRY.md` before it is treated as an active critical project asset.

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

Never delete, rename, move, retire, or overwrite an existing project asset merely for organization.

## Research Safety
- AI-generated information is not automatically verified.
- Raw research data must be preserved.
- Corrections must be versioned rather than silently overwritten.
- Published claims require traceable evidence.
- Uncertainty and legitimate scholarly disagreement must remain explicit.
- No hidden chain-of-thought or private reasoning is to be stored as a project research record.

## Change Procedure
Before a meaningful change:

`Inspect → Read Instructions → Audit Instruction State → Update Governance if Needed → Map Dependencies → Safe Point → Minimal Change → Verify → Update Instruction/Registry → Log Change`

When instructions, dependencies, architecture, or governance rules change, use `INSTRUCTION_AUDIT_PROTOCOL.md`.

## Conflict Rule
If two instructions conflict:
1. identify both instructions;
2. identify the exact conflict;
3. apply the hierarchy in `MASTER_INSTRUCTION.md`;
4. preserve the safer interpretation temporarily;
5. do not silently rewrite or weaken the Master Instruction;
6. if permanent removal, retirement, or weakening is proposed, ask the user for approval;
7. route permanent governance changes through the instruction-audit process.

## Completion Gate
A task is not complete until applicable checks confirm:
- intended file(s) changed;
- every new non-instruction file has its same-folder sibling instruction;
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
- removing or weakening an existing instruction appears necessary;
- a new file would be created without its required same-folder instruction;
- the current state cannot be verified safely.

## Universal Handoff Statement
A new AI/session may begin work only after it can state, in substance:

> I have loaded the project governance entry point, Master Instruction, Registry, relevant project state, and the specific instruction(s) governing my target. I have checked that the applicable instructions are current; if not, I will update them before the requested work. I will preserve protected assets, create a same-folder instruction for every new non-instruction file, make only the requested/minimal change, and ask the user before removing or weakening an existing rule.

## Status
ACTIVE — v1.2 candidate on the safety branch; promotion to `main` remains a controlled governance change.
