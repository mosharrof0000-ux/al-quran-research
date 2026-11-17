# Instruction — Private Research R2 Retrieval

## Identity
Path: backend/private-research-retrieval.js
Status: ACTIVE — scoped, integrity-checked R2 chunk retrieval

## Purpose
Retrieve only a canonical ayah-scoped source chunk from a rights-verified R2 manifest.

## Required invariants
- Require source ID and canonical ayah scope.
- Require a manifest checksum pinned in source configuration.
- Require manifest rights_status=VERIFIED and source/edition metadata consistency.
- Require each chunk checksum to match both manifest and chunk content.
- Reject unsafe R2 keys, missing chunks, malformed JSON and oversized objects/content.
- Never return a full-book object and never call external AI providers.

## Limits
- Manifest <= 2 MB, <= 50,000 entries.
- Chunk object <= 64 KB; content <= 16,000 characters.
- At most 3 matching chunks.

## Forbidden
- Bypass session verification or rights verification.
- Add private source text, keys, PINs or bearer tokens to fixtures.
- Treat synthetic tests as proof of source installation.

## Verification
Run `node scripts/test-private-research-access.mjs` and `node scripts/test-research-memory.mjs`.
