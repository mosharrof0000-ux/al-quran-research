# Instruction — AI_ENTRY_PROTOCOL.md

- ID: INST-AI-ENTRY-PROTOCOL
- Class: P0 — Critical entry governance
- Status: ACTIVE

## Purpose
Define the mandatory entry sequence for any new AI, ChatGPT ID, agent, automation, or new session before repository work.

## Rules
1. Read `UNIVERSAL_AI_GOVERNANCE_GATE.md` first as the controlled startup gate when available.
2. Read `AI_ENTRY_PROTOCOL.md`, `MASTER_INSTRUCTION.md`, `INSTRUCTION_REGISTRY.md`, `INSTRUCTION_AUDIT_PROTOCOL.md`, and required project-state documents before editing.
3. Identify the exact task, target files, dependencies, risk, and safe point.
4. Read every relevant target/category instruction before editing.
5. If an instruction is missing or stale, repair it before changing the governed target.
6. Preserve live website paths, APIs, research data, backups, history, and stable IDs.
7. Verify the final change and record governance changes in the registry/change log as required.

## Forbidden
Do not guess current project state from chat memory, bypass the governance gate, or make unrelated structural changes.

## Verification
A new AI/session must be able to show that the startup sequence and target-instruction audit were completed before modifying the repository.

## Update Trigger
Any change to startup sequence, governance hierarchy, onboarding requirements, or universal AI entry behavior.
