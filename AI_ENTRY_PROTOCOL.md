# AI Entry Protocol — v1.0

## Purpose
This is the first document an AI, ChatGPT ID, agent, or new project session must read before changing this repository.

## Safety Rule
The existing project must not be damaged while the instruction system is being introduced.

**Never delete, rename, move, overwrite, or restructure existing project files merely to make the instruction system cleaner.** Such changes require a separate reviewed change proposal.

## Mandatory Reading Order
1. `AI_ENTRY_PROTOCOL.md`
2. `MASTER_INSTRUCTION.md`
3. `MASTER_PROJECT.md`
4. `PROJECT_STATE.md`
5. `INSTRUCTION_REGISTRY.md`
6. The instruction document(s) relevant to the requested task
7. The target file(s)
8. `INSTRUCTION_AUDIT_PROTOCOL.md` when instructions, dependencies, or architecture are changed

## First-Session Procedure
Before doing project work, the AI must:
- identify the requested task;
- identify the affected files;
- read the relevant instructions before editing those files;
- preserve the live website and existing public paths;
- avoid unrelated edits;
- verify the result after changes;
- record instruction changes in `INSTRUCTION_CHANGE_LOG.md`.

## Live-Site Protection
The current GitHub Pages site and its existing entry paths are treated as protected project assets.

Live site:
`https://mosharrof0000-ux.github.io/al-quran-research/`

Repository:
`https://github.com/mosharrof0000-ux/al-quran-research`

No instruction-system change may intentionally break the current deployment path, website entry point, or existing data paths.

## Instruction-First Rule
If a target file has its own instruction, the AI must read that instruction before editing the target.

If the target has no individual instruction, the AI must use the applicable category instruction or the master instruction and flag the missing instruction for later governance work.

## Conflict Rule
If instructions conflict, do not silently choose a convenient interpretation. Follow the priority rules in `MASTER_INSTRUCTION.md`, identify the conflict, and record or propose a resolution.

## Completion Rule
A task is not complete merely because a file was changed. The AI must verify:
- the intended file changed;
- no unrelated critical file changed;
- existing links/paths remain intact;
- syntax/data integrity remains valid where applicable;
- the relevant instruction reflects the new state.

## Status
ACTIVE
