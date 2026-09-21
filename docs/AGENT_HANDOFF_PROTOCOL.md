# Agent Handoff Protocol

## Rule
An agent may stop without completing a task, but it may never stop without recording the current state.

## Handoff fields
- Original Agent Name / ID
- Successor Agent Name / ID
- Task ID
- Objective
- What was inspected
- What was completed
- What remains
- Changed files
- Branch and latest commit
- Tests run and results
- Known failures
- Safety restrictions
- Exact next action
- Timestamp

## Successor rule
A successor must read the handoff before changing code and must preserve the original agent's history. The successor's work is a separate identity and must be recorded separately.

## No false completion
“Done” means validated against the stated acceptance criteria. A deployed Worker alone is not proof of completion; live smoke verification is required for production claims.
