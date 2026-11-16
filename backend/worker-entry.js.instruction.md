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


## 2026-11-17 — Deterministic verified-data routing precedence
- A narrowly scoped predicate recognizes the existing Al-Fatiha 1:1 word-analysis request handled by the deterministic route in `backend/worker.js`.
- That request must bypass `directGemini()` and proceed to the existing Worker handler.
- All unrelated requests retain the existing AI Brain/Gemini path.
- The regression test must prove that a fake-but-present Gemini key does not trigger outbound fetch for the deterministic request.
- This change is branch-only until CI, review, and owner approval; it is not deployed.
