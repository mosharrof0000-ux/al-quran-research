# Instruction — AGENT_HANDOFF_PROTOCOL.md

## Identity
Path: docs/AGENT_HANDOFF_PROTOCOL.md
Purpose: Continuity and successor protocol for Project Agents.

## Allowed
- Visible task status and handoff metadata.
- Predecessor/successor links.
- Verification and known-issue records.

## Forbidden
- Secrets or hidden reasoning.
- Rewriting history to make an incomplete task appear complete.

## Verification
A successor Task ID must reference its predecessor. Handoff must state completed and remaining work separately.

## Change history
v1.0 — initial handoff protocol.
