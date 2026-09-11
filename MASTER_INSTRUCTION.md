# Master Instruction — v1.6

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

If the required governance update would remove, delete, rename, move, retire, or materially weaken an existing instruction or governed project rule, the AI must stop and ask the user for approval before doing so.

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

For a file such as `data/example.json`, its instruction must be `data/example.instruction.md`.

The instruction must define, as applicable: identity/path, purpose, scope, inputs/outputs, dependencies, allowed/forbidden operations, verification rules, evidence requirements, update triggers, related instructions, version/status, and change history.

An individual `.instruction.md` file is a governance artifact and is exempt from requiring another sibling `.instruction.md`; it remains governed by the Master, Registry, audit process, and Change Log.

Existing governed files are paired with their instruction in the same folder or governed scope. Legacy instructions previously stored under `docs/instructions/` were migrated by copy → verify → registry update → old-path removal. Their history remains preserved in Git history.

## 7. Protected Project Assets
The following are protected by default:
- GitHub Pages live site and its public entry path
- existing website files and routing
- research datasets and stable IDs
- research API paths
- existing project protocols and historical records
- existing backup/continuity mechanisms

Do not delete, rename, move, retire, or replace these simply for organization. If removal or structural retirement is proposed, stop and ask the user unless explicitly authorized.

## 8. Safe Organization Rule
Instruction organization may be improved only through an auditable migration: map → colocate → verify → Registry update → verify replacements → remove obsolete loose copy → preserve history and Change Log record.

No project code, data, backend, website path, or research record is moved merely to relocate an instruction.

## 9. File Instruction Standard
Each critical file should eventually have an instruction record containing identity/path, purpose, scope, inputs/outputs, dependencies, allowed/forbidden operations, verification rules, evidence requirements, update triggers, related instructions, and version/change history.

## 10. Instruction Update Rule
When work changes a file's meaning, behavior, schema, dependencies, workflow, or safety requirements, its instruction must be updated before the task is considered complete.

If new information belongs in the Master Instruction, update the Master only through the instruction-audit/governance process. Never silently weaken, remove, or rewrite an established governance rule merely to make a task easier.

## 11. Conflict and Uncertainty
When instructions disagree, identify the conflicting documents, exact conflict, applicable priority, safest temporary interpretation, and proposed permanent resolution.

When evidence is uncertain, label it as uncertain rather than presenting an assumption as fact.

## 12. Verification
After a change, verify as applicable: file existence/path; syntax/JSON validity; references/links; website entry path; API/data dependencies; instruction consistency; unintended file changes; sibling instructions for new non-instruction files; and Registry coverage for newly governed critical assets.

### 12.1 Live Research-ID execution requirement
For the protected Live Page, Research IDs are executable research references, not ordinary chat text.

When a user supplies a canonical Research ID such as `S001-A001` or `S001-A002`, the Live UI must provide a clear path to submit that ID and retrieve the corresponding canonical research record through the Research API.

Required execution chain:
`Live Page → Research ID input → canonical ID lookup → Research API → actual record → UI result`

The UI must not claim a Research ID is verified merely because the page loads or because an AI chat response exists.

A Research-ID verification result is valid only when:
1. the Live Page is reachable;
2. the Research ID is actually submitted through the Live interface;
3. the canonical record is retrieved from the approved Research API/dataset;
4. the returned ID and record are captured;
5. the expected canonical record is established;
6. actual versus expected is compared;
7. the result and evidence are recorded.

If the Live UI cannot execute the supplied Research ID, record `NOT VERIFIED` and treat it as a common execution defect to fix before certifying individual IDs.

A common failure affecting multiple Research IDs must be fixed at the shared UI/API execution layer first; do not repeatedly re-test individual IDs as though each were an independent defect.

### 12.2 Canonical Live Connection Rule
The production Live Page has one documented canonical connection chain. Future connection diagnosis must start from this chain rather than from branch switching, UI redesign, or guesswork.

Canonical chain:
`GitHub Pages live site → index.html → chatbox-v28-live.html → Cloudflare Worker endpoint/fallback → backend/cors-entry.js → backend/worker-entry.js → Research API / Gemini / Cloudflare AI recovery`

The authoritative detailed map is `LIVE_CONNECTION_MAP.md` and its governing instruction `LIVE_CONNECTION_MAP.instruction.md`.

Current live chat Worker endpoints are, in order:
1. `https://al-quran-research.mosharroff0000.workers.dev/`
2. `https://al-quran-research.mosharrof0000.workers.dev/`

The fallback order is part of the protected live behavior and must not be removed or changed without an approved replacement and verification.

When a live connection problem occurs, diagnose the chain in order:
1. GitHub Pages entry;
2. iframe/chat UI target;
3. Worker endpoint and fallback;
4. Worker reachability and diagnostic endpoint;
5. CORS;
6. Worker configuration;
7. Worker entry/runtime;
8. Gemini/API credential and model availability;
9. recovery path.

Every verified connection fix must record the failing layer, observed error, root cause, exact file/path changed, verification performed, and resulting production commit/version. This record becomes reusable project knowledge for future incidents.

## 13. Controlled Promotion Gate
Safety-branch governance work and production promotion are separate control stages.

Before promoting from a safety branch to `main`:
1. compare the branch against `main`;
2. confirm only intended changes are included;
3. confirm protected website, backend, data, API, automation, and public paths are not unintentionally changed;
4. confirm Registry, applicable instructions, and Change Log are consistent;
5. confirm relevant syntax/data/tests/checks pass;
6. obtain explicit user/authorized approval when required;
7. promote only after approval;
8. verify resulting `main` state and record the promotion.

Approval to perform safety-branch work is not automatically approval to publish it to `main` unless promotion is explicitly requested or approved.

## 14. Lifecycle
Instructions use: `DRAFT → REVIEW → ACTIVE → SUPERSEDED → ARCHIVED`.

Old instructions should be preserved as history rather than silently deleted. Superseding or archiving requires an explicit governance decision and documented replacement where applicable.

## 15. Master Learning Rule
The Master learns through controlled governance:
`Individual Instruction → Audit → Change Detection → Proposal → Conflict Check → Impact Analysis → User/Authorized Approval → Master Update → Registry Update → Change Log`

The Master is therefore both the common rule for all file instructions and a governed artifact that must obey its own instruction and audit controls.

## 16. Relationship to Existing Architecture
The instruction system does not replace `MASTER_PROJECT.md`, `PROJECT_STATE.md`, `PROJECT_WORK_LOG.md`, `PROJECT_HISTORY.md`, `PROJECT_CONTINUITY_PROTOCOL.md`, or existing research, AI, backup, backend, and website documents. Those remain project assets governed by this operational layer.

## Status
ACTIVE — v1.6
