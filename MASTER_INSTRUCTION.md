# Master Instruction — v1.0

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

## 4. Instruction-First Workflow
For every task:
1. Read `AI_ENTRY_PROTOCOL.md`.
2. Read this file.
3. Read the project documents relevant to the task.
4. Read the target file's instruction before editing the target.
5. Determine dependencies and protected paths.
6. Make the smallest safe change.
7. Verify the result.
8. Update the affected instruction before or as part of completing the change when the file's behavior, purpose, dependency, or rules have changed.
9. Record instruction changes in `INSTRUCTION_CHANGE_LOG.md`.

## 5. Protected Project Assets
The following are protected by default:
- GitHub Pages live site and its public entry path
- existing website files and routing
- research datasets and stable IDs
- research API paths
- existing project protocols and historical records
- existing backup/continuity mechanisms

Do not delete, rename, move, or replace these simply for organization.

## 6. Safe Organization Rule
The instruction system is an additional governance layer. It must initially be additive.

Preferred order:
1. Add instruction files.
2. Build the registry.
3. Audit relationships.
4. Propose structural cleanup separately.
5. Only after review, perform any move/rename/delete operation.

## 7. File Instruction Standard
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

## 8. Instruction Update Rule
When work changes a file's meaning, behavior, schema, dependencies, workflow, or safety requirements, its instruction must be updated before the task is considered complete.

If new information is discovered that belongs in the master instruction, propose the master update through the instruction-audit process rather than silently rewriting governance rules.

## 9. Conflict and Uncertainty
When instructions disagree, identify:
- the conflicting documents;
- the exact conflict;
- the applicable priority;
- the safest temporary interpretation;
- the proposed permanent resolution.

When evidence is uncertain, label it as uncertain rather than presenting an assumption as fact.

## 10. Verification
After a change, verify as applicable:
- file existence and path;
- syntax/JSON validity;
- references and links;
- website entry path;
- API/data dependencies;
- instruction consistency;
- unintended file changes.

## 11. Lifecycle
Instructions use this lifecycle:
`DRAFT → REVIEW → ACTIVE → SUPERSEDED → ARCHIVED`

Old instructions should be preserved as history rather than silently deleted.

## 12. Master Learning Rule
The master instruction does not automatically rewrite itself. It learns through controlled governance:

`Individual Instruction → Audit → Change Detection → Proposal → Conflict Check → Impact Analysis → Approval → Master Update → Registry Update → Change Log`

## 13. Relationship to Existing Architecture
The instruction system does not replace:
- `MASTER_PROJECT.md` — project constitution/vision;
- `PROJECT_STATE.md` — current project state;
- `PROJECT_WORK_LOG.md` — operational work history;
- `PROJECT_HISTORY.md` — historical record;
- `PROJECT_CONTINUITY_PROTOCOL.md` — continuity rules;
- existing research, AI, backup, backend, and website documents.

Those documents remain project assets and are governed by this operational layer.

## Status
ACTIVE
