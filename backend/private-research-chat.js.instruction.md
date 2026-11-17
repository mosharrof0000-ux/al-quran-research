# Instruction — Private Research Chat Context Resolver

## Identity
Path: backend/private-research-chat.js
Status: ACTIVE — explicit per-question consent gate

## Purpose
Resolve a source-bound private chunk for one Chat request only when the request explicitly opts in and includes a valid short-lived Bearer session and canonical ayah scope.

## Required invariants
- Default to no private context unless `private_research_use === true`.
- Require source ID, canonical ayah ID in the message, and Authorization: Bearer.
- Delegate authentication, source installation, rights, R2 path and checksum validation to `handlePrivateResearch`.
- Return only bounded chunk content and provenance; never return the bearer token.
- Do not call Gemini or any other provider from this module.

## Forbidden
- Persist tokens or private source content.
- Retrieve a full book or infer ayah scope from ambiguous natural-language prompts.
- Bypass the per-question consent flag.

## Verification
Run `node scripts/test-private-research-chat.mjs` and `node scripts/test-private-research-access.mjs`.
