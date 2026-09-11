# AI Entry Protocol — v1.2

## Purpose
This is the bootstrap pointer for any AI, ChatGPT ID, agent, automation, or new project session entering the repository.

The universal startup gate is `UNIVERSAL_AI_GOVERNANCE_GATE.md`. Any AI/session must load and follow that gate before modifying project files.

## Safety Rule
The existing project must not be damaged while the instruction system is being introduced.

**Never delete, rename, move, overwrite, or restructure existing project files merely to make the instruction system cleaner.** Such changes require a separate reviewed change proposal.

## Mandatory Reading Order
1. `AI_ENTRY_PROTOCOL.md`
2. `UNIVERSAL_AI_GOVERNANCE_GATE.md`
3. `MASTER_INSTRUCTION.md`
4. `INSTRUCTION_REGISTRY.md`
5. `INSTRUCTION_AUDIT_PROTOCOL.md` when instructions, dependencies, architecture, or governance are changed
6. Relevant project-state documents
7. The applicable instruction for each target file
8. The target file(s)

## First-Session Procedure
Before doing project work, the AI must:
- identify the requested task;
- identify the affected files;
- determine whether each target already exists or will be newly created;
- read the applicable instruction before editing an existing target;
- for every new non-instruction file, create its sibling `<filename>.instruction.md` in the same directory as part of the same governed change;
- preserve the live website and existing public paths;
- avoid unrelated edits;
- verify the result after changes;
- record instruction changes in `INSTRUCTION_CHANGE_LOG.md`.

## Existing Instruction Location Compatibility
Existing files that already have applicable instructions in `docs/instructions/` remain valid and must not be moved merely for organization. New files follow the same-folder instruction rule defined by `MASTER_INSTRUCTION.md`.

## Live-Site Protection
The current GitHub Pages site and its existing entry paths are treated as protected project assets.

Live site:
`https://mosharrof0000-ux.github.io/al-quran-research/`

Repository:
`https://github.com/mosharrof0000-ux/al-quran-research`

No instruction-system change may intentionally break the current deployment path, website entry point, or existing data paths.

## Instruction-First Rule
A file may not be treated as an established active governed asset until its applicable instruction exists.

For a new non-instruction file, the instruction must be created beside it in the same folder. The only exception is an `.instruction.md` governance artifact itself, which is directly governed by the Master Instruction and does not require another sibling instruction.

## Conflict Rule
If instructions conflict, do not silently choose a convenient interpretation. Follow the priority rules in `MASTER_INSTRUCTION.md`, identify the conflict, and record or propose a resolution.

## Completion Rule
A task is not complete merely because a file was changed. The AI must verify:
- the intended file changed;
- every new non-instruction file has its same-folder instruction;
- no unrelated critical file changed;
- existing links/paths remain intact;
- syntax/data integrity remains valid where applicable;
- the relevant instruction reflects the new state;
- registry/change log updates are complete where required.

## Status
ACTIVE — v1.2
