# Instruction — Research Intelligence Router

## Identity
Path: backend/research-intelligence-router.js
Status: DRAFT

## Purpose
Classify user queries for research routing without generating facts.

## Allowed
- Add deterministic query-intent patterns.
- Return routing metadata.

## Forbidden
- Claiming verification.
- Fetching or exposing private source text.
- Replacing the Research API.

## Verification
Routing must be deterministic and must not alter existing research records.

## Change history
- 2026-09-20 — Created.
