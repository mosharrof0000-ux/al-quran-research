# Instruction — AGENT_IDENTITY_REGISTRY.md

## Purpose
Govern the Project Agent identity registry.

## Rules
- Preserve historical identities and their task relationships.
- Do not expose secrets or hidden chain-of-thought.
- A new distinct task gets a new identity.
- Changes must remain auditable and versioned.
- Never treat identity metadata as deployment or merge authorization.

## Verification
Check identity uniqueness, task linkage, branch linkage, and absence of secret material.

## Status
ACTIVE on this safety branch; promotion requires normal governance review.
