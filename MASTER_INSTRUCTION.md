# Master Instruction — v1.2

## 1. Role
This document is the operational control layer for the Al-Quran Research project. It governs how AI systems work with the repository without replacing the project's existing research architecture.

## 2. Core Principles
- Preserve the project's existing data, research records, website, APIs, and stable paths.
- Never treat AI-generated information as automatically verified.
- Preserve raw source data; corrections must be versioned rather than silently overwritten.
- Published claims must have traceable evidence.
- Metrics must have definitions, formulas, dataset/version references, and reproducible calculations.
- Do not erase legitimate scholarly disagreement; represent competing analyses explicitly.
- The website is an interface; research data and records remain core assets.
- Instructions are governed artifacts and must themselves be versioned.

## 3. Instruction Hierarchy
Priority from highest to lowest:

P0 — User's explicit current instruction
P1 — `MASTER_INSTRUCTION.md`
P2 — Critical project protocols and continuity rules
P3 — Domain/category instructions
P4 — Individual file instructions
P5 — Historical/experimental documents
P6 — AI assumption or convenience

A lower-level instruction cannot silently override a higher-level instruction.

## 4. Master-First Governance Check
Before beginning any new project task, the governing AI must first verify that the instruction system itself is complete and current for the requested work.

The required order is:
1. Load `AI_ENTRY_PROTOCOL.md` and `UNIVERSAL_AI_GOVERNANCE_GATE.md` when available as the project's universal startup gate.
2. Load this Master Instruction.
3. Load `INSTRUCTION_REGISTRY.md` and `INSTRUCTION_AUDIT_PROTOCOL.md`.
4. Identify the exact target files and their applicable instructions.
5. Check whether each applicable instruction exists, is registered where required, is consistent with the current file, and is sufficiently up to date for the requested task.
6. If an instruction is missing, stale, incomplete, conflicting, or no longer describes the governed file correctly, update or create the instruction first through the audit/governance process.
7. Only after the governance layer is brought into a usable state may the requested project work begin.

The AI must not knowingly perform the underlying task first and postpone required instruction maintenance until afterward.

If the required governance update would remove, delete, rename, move, retire, or materially weaken an existing instruction or governed project rule, the AI must stop and ask the user for approval before doing so. It must not decide on its own that an existing rule should be discarded.

## 5. Instruction-First Workflow
For every task:
1. Complete the Master-First Governance Check above.
2. Read the relevant project documents.
3. Read the target file's instruction before editing the target.
4. Determine dependencies and protected paths.
5. Make the smallest safe change requested by the user.
6. Verify the result.
7. Update the affected instruction before or as part of completing the change when the file's behavior, purpose, dependency, or rules have changed.
8. Record instruction changes in `INSTRUCTION_CHANGE_LOG.md`.

## 6. Mandatory New-File Instruction Rule
Every newly created project file must have its own individual instruction file created at the same time, in the same directory/folder as the governed file.

### Canonical naming
For a file such as:
- `data/example.json`

its instruction must be:
- `data/example.instruction.md`

For a file such as:
- `docs/example.md`

its instruction must be:
- `docs/example.instruction.md`

The instruction file must be created in the same governed change, before the new file is considered established or active.

### Required instruction contents
Each new individual instruction must define, as applicable:
- identity and exact path;
- purpose;
- scope;
- inputs and outputs;
- dependencies;
- allowed operations;
- forbidden operations;
- verification rules;
- evidence requirements;
- update triggers;
- related instructions;
- version/status;
- change history.

### Governance
Every individual instruction is itself governed by this `MASTER_INSTRUCTION.md`, must be registered in `INSTRUCTION_REGISTRY.md` when the file is part of the active governed project, and cannot silently override a higher-level rule.

### Instruction-file exception
An individual `.instruction.md` file is a governance artifact and is exempt from requiring another sibling `.instruction.md` for itself; otherwise the rule would recurse indefinitely. It remains governed by the Master Instruction, Registry, audit process, and change log.

### Existing files
Existing project files that currently have instructions in `docs/instructions/` remain valid and must not be moved merely for organization. New files follow the same-folder rule. Migration of older instructions into same-folder form is a separate reviewed governance project and must not be performed automatically.

## 7. Protected Project Assets
The following are protected by default:
- GitHub Pages live site and its public entry path
- existing website files and routing
- research datasets and stable IDs
- research API paths
- existing project protocols and historical records
- existing backup/continuity mechanisms

Do not delete, rename, move, retire, or replace these simply for organization. If removal or structural retirement is proposed, stop and ask the user unless the user has explicitly authorized that specific operation.

## 8. Safe Organization Rule
The instruction system is an additional governance layer. It must initially be additive.

Preferred order:
1. Add or update instruction files.
2. Build/update the registry.
3. Audit relationships.
4. Propose structural cleanup separately.
5. Only after explicit review/approval, perform any move/rename/delete/retirement operation.

## 9. File Instruction Standard
Each critical file should eventually have an instruction record containing:
- identity and path;
- purpose;
- scope;
- inputs and outputs;
- dependencies;
- allowed operations;
- forbidden operations;
- verification rules;
- evidence requirements;
- update triggers;
- related instructions;
- version and change history.

## 10. Instruction Update Rule
When work changes a file's meaning, behavior, schema, dependencies, workflow, or safety requirements, its instruction must be updated before the task is considered complete.

If new information is discovered that belongs in the Master Instruction, update the Master only through the instruction-audit/governance process. Never silently weaken, remove, or rewrite an established governance rule merely to make a task easier.

If an existing rule appears unnecessary, obsolete, contradictory, or harmful, record the finding and ask the user whether it should be removed or superseded. Preserve it until that decision is made.

## 11. Conflict and Uncertainty
When instructions disagree, identify:
- the conflicting documents;
- the exact conflict;
- the applicable priority;
- the safest temporary interpretation;
- the proposed permanent resolution.

When evidence is uncertain, label it as uncertain rather than presenting an assumption as fact.

## 12. Verification
After a change, verify as applicable:
- file existence and path;
- syntax/JSON validity;
- references and links;
- website entry path;
- API/data dependencies;
- instruction consistency;
- unintended file changes;
- for every new non-instruction file, existence of its same-folder sibling instruction;
- registry coverage for newly governed critical assets.

## 13. Lifecycle
Instructions use this lifecycle:
`DRAFT → REVIEW → ACTIVE → SUPERSEDED → ARCHIVED`

Old instructions should be preserved as history rather than silently deleted. Superseding or archiving an instruction requires an explicit governance decision and documented replacement where applicable.

## 14. Master Learning Rule
The Master Instruction does not automatically rewrite itself based on an AI's preference. It learns through controlled governance:

`Individual Instruction → Audit → Change Detection → Proposal → Conflict Check → Impact Analysis → User/Authorized Approval → Master Update → Registry Update → Change Log`

The Master is therefore both the common rule for all file instructions and a governed artifact that must obey its own instruction and audit controls.

## 15. Relationship to Existing Architecture
The instruction system does not replace:
- `MASTER_PROJECT.md` — project constitution/vision;
- `PROJECT_STATE.md` — current project state;
- `PROJECT_WORK_LOG.md` — operational work history;
- `PROJECT_HISTORY.md` — historical record;
- `PROJECT_CONTINUITY_PROTOCOL.md` — continuity rules;
- existing research, AI, backup, backend, and website documents.

Those documents remain project assets and are governed by this operational layer.

## Status
ACTIVE — v1.2
