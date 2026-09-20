# Instruction — Private Research Library Access

## Identity
Path: backend/private-research.js
Status: DRAFT

## Purpose
Provide server-side access control for private research sources.

## Allowed
- List non-sensitive source metadata.
- Validate a server-side secret.
- Fail closed when the secret or source content is not configured.
- Keep private source text out of public assets.

## Forbidden
- Hard-coding the PIN in frontend/public code.
- Returning private source text without authentication and verified installation.
- Treating a PIN as copyright permission.
- Mixing private source content into public Reader assets.

## Required secret
Cloudflare Worker secret: PRIVATE_RESEARCH_PIN.

## Verification
Routes must return no private content when the secret/source is missing. The implementation must be tested before production promotion.

## Change history
- 2026-09-20 — Created.
