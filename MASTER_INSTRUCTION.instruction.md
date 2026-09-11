# Instruction — MASTER_INSTRUCTION.md

- ID: INST-MASTER-INSTRUCTION
- Class: P0 — Master governance
- Status: ACTIVE

## Purpose
Govern repository-wide AI work, instruction hierarchy, safe changes, evidence, verification, continuity, and the canonical live connection rule.

## Scope
Applies to every repository task and all governed files. This instruction governs the instruction system itself and must follow its own rules.

## Pre-work instruction audit
Before any new task, identify all affected files and verify that each relevant instruction exists, is current, and is represented in `INSTRUCTION_REGISTRY.md`. If an instruction is missing, stale, incomplete, or unregistered, repair the instruction system first. Do not begin unrelated project work until the governance gap is resolved.

## Hierarchy
`User Current Instruction → MASTER_INSTRUCTION.md → Critical Protocols → Category Instruction → Individual File Instruction → Target File`.

## Non-negotiable rules
- Preserve existing data, research records, stable IDs, public paths, APIs, backups, history, and live-site behavior.
- AI output is not automatically verified research.
- Raw data remains preserved; corrections are versioned or explicitly controlled.
- Published claims require traceable evidence.
- Metrics require definition, formula, dataset/version, and reproducible calculation context.
- Preserve uncertainty and disagreements explicitly.
- Never silently delete, rename, move, overwrite, or remove governed assets merely for organization.
- If a destructive or structural operation is proposed, do not silently decide to drop a rule or historical asset; use the governance/audit process and obtain explicit approval where required.
- Never place secrets or API keys in repository files.
- The canonical live connection path must be documented and used as the first diagnostic reference for live connection incidents.

## Safe workflow
`Inspect → Audit Instructions → Read Relevant Instructions → Map Dependencies → Safe Point → Minimal Change → Verify → Update Instruction/Registry → Log Change`.

## Instruction standard
Each active instruction should identify identity/target, purpose, scope, inputs/outputs where relevant, dependencies, allowed/forbidden operations, verification, evidence, update triggers, related instructions, status, and history when applicable.

## Verification
A task is complete only when intended files changed, required instructions are present and registered, protected paths remain intact, syntax/data integrity is checked, and the change is recorded when governance/history requires it.

## Stop conditions
Stop rather than guess when there is a governance conflict, unknown dependency, missing evidence, production risk, destructive operation without approval, or unverifiable state.

## Live connection governance
`LIVE_CONNECTION_MAP.md` is the canonical production reference for the GitHub Pages → chat UI → Cloudflare Worker → backend → Research API/Gemini/recovery chain. When this chain changes, update the map, its sibling instruction, Registry, and Change Log as required. Do not diagnose by branch switching before locating the failing layer in the canonical chain.
