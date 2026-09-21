# Instruction — AGENT_IDENTITY_REGISTRY.md

## Purpose
Govern Project Agent identity and naming records.

## Rules
- Preserve historical identities.
- Unique identity is Agent ID + Task ID.
- New distinct work gets a new identity and work branch.
- Successor agents reference predecessor Task ID.
- Do not erase history.

## Verification
Identity, task, branch, commit and handoff references must remain consistent.

## Status
ACTIVE on safety branch; promotion pending.
