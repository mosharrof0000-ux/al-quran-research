# Instruction — PROJECT_STATE.md

**Instruction ID:** INST-PROJECT-STATE
**Target:** `PROJECT_STATE.md`
**Class:** A — Critical
**Status:** ACTIVE

## Purpose
Maintain the current known-good state of the project.

## Rules
- Record present state, not long historical narrative.
- Never invent status; verify against repository files and deployment state when possible.
- Distinguish ACTIVE, TESTING, VERIFIED, BLOCKED, PROPOSED, and DEPRECATED states where useful.
- When a major change is completed, update state so a new AI can resume without relying on chat memory.
- Preserve known-good references and important dependencies.

## Dependencies
`MASTER_PROJECT.md`, `PROJECT_WORK_LOG.md`, `PROJECT_CONTINUITY_PROTOCOL.md`, relevant architecture/status files.

## Verification
State must agree with actual repository structure and current implementation.

## Update Trigger
Any completed, blocked, verified, or materially changed project component.
