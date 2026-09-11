# Instruction — PROJECT_CONTINUITY_PROTOCOL.md

**Instruction ID:** INST-CONTINUITY
**Target:** `PROJECT_CONTINUITY_PROTOCOL.md`
**Class:** A — Critical
**Status:** ACTIVE

## Purpose
Ensure a new AI, new chat, or future session can safely continue the project from documented state rather than memory.

## Rules
- Preserve the existing continuity workflow.
- New sessions must inspect current repository state before acting.
- Use project state, work log, backup references, and relevant instructions.
- Never assume an old chat statement is the current project state.
- Keep handoff information concise, current, and verifiable.

## Dependencies
`AI_ENTRY_PROTOCOL.md`, `MASTER_INSTRUCTION.md`, `PROJECT_STATE.md`, `PROJECT_WORK_LOG.md`, backup documents.

## Verification
A new AI should be able to identify current state, known-good reference, active task, risks, and next safe action.

## Update Trigger
Changes to handoff procedure, session continuity, recovery rules, or project onboarding.
