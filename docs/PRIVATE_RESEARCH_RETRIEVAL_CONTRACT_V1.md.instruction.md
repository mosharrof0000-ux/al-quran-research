# Instruction — Private Research Retrieval Contract

## Identity
Path: docs/PRIVATE_RESEARCH_RETRIEVAL_CONTRACT_V1.md
Status: ACTIVE — source retrieval and privacy specification

## Purpose
Define the exact R2 manifest/chunk schema, integrity checks, scope, size limits and external-AI consent boundary.

## Rules
- Keep the document aligned with the retrieval module and tests.
- Do not treat the schema as evidence that a source is licensed or installed.
- Never include real private source content, PINs, tokens or secret values.
- Keep the per-question external-AI consent requirement explicit.

## Verification
Cross-check with `backend/private-research-retrieval.js` and `scripts/test-private-research-access.mjs`.
