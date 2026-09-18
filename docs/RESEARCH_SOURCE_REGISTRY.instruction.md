# Instruction — Research Source Registry

## Identity
Path: docs/RESEARCH_SOURCE_REGISTRY.md
Status: ACTIVE — v1.0

## Purpose
Maintain the auditable source/document registry for research and Reader provenance.

## Allowed
- Add or revise source records when supported by repository or authoritative source evidence.
- Mark incomplete provenance as PENDING_VERIFICATION or UNKNOWN.
- Preserve historical source records rather than silently deleting them.

## Forbidden
- Inventing source names, versions, URLs, licence claims, or verification status.
- Treating an external source as project-verified data without an explicit project record.
- Mixing Reader source inventory with the Research evidence ledger.

## Verification
Each material source entry must identify scope, location/endpoint, status, and provenance notes. Version/licence claims require source evidence before being marked verified.

## Update triggers
Update this file whenever a new external source is integrated, a source endpoint/version changes, a research dataset gains a new source/evidence chain, or a provenance gap is resolved.

## Related governance
MASTER_INSTRUCTION.md
INSTRUCTION_REGISTRY.md
INSTRUCTION_CHANGE_LOG.md
database/schema.sql
backend/research-api.js
backend/worker-entry.js

## Change history
- 2026-09-19 — v1.0 created.