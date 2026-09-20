# Instruction — Worker Entry

## Identity
Path: backend/worker-entry.js
Status: DRAFT — private research integration

## Purpose
Govern the production Worker entry routing, research API, AI routing and private research access.

## Protected behavior
Preserve existing research API, Gemini, recovery, CORS, diagnostics, provenance and fail-closed behavior.

## Allowed
- Add isolated private-research routing.
- Add deterministic research-intelligence routing metadata.
- Update imports/dispatch without changing existing endpoint semantics.

## Forbidden
- Hard-coding secrets.
- Returning private source content without authentication.
- Removing existing fallback/diagnostic paths.
- Claiming live deployment from branch changes.

## Verification
Run syntax/build checks and compare branch against main before promotion.

## Change history
- 2026-09-20 — Added for controlled private research integration.
