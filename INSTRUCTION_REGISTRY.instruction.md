# Instruction — INSTRUCTION_REGISTRY.md

- ID: INST-INSTRUCTION-REGISTRY
- Class: P0 — Critical governance registry
- Status: ACTIVE

## Purpose
Keep the authoritative index of active instructions, their targets/scopes, status, and governance coverage.

## Rules
1. Every active critical or important instruction must be registered.
2. Registry paths must point to the current colocated instruction location.
3. A new critical file cannot become part of the active workflow without an applicable instruction and registry entry.
4. Do not silently remove registry entries; supersede/archive them with traceable history.
5. Registry changes must be verified against the repository tree.

## Verification
Check that registered instruction paths exist, target files exist, statuses are coherent, and no active critical instruction is missing from the registry.

## Update Trigger
Any instruction creation, migration, supersession, archive, scope change, or governance-architecture change.
