# Instruction — Private Research Library Access

## Identity
Path: backend/private-research.js
Version: 1.1
Status: IN PROGRESS — source installation and live verification pending

## Purpose
Provide fail-closed server-side access control for private research sources using a server-validated PIN and short-lived signed bearer sessions.

## Inputs and outputs
- Public metadata: GET /private-research/sources
- Unlock: POST /private-research/unlock with source_id and PIN
- Authenticated content: GET /private-research/sources/{source_id}/content with Authorization: Bearer token
- Session lifetime: 900 seconds
- Signing algorithm: HMAC-SHA-256 using PRIVATE_RESEARCH_SESSION_SECRET

## Required Worker secrets and bindings
- PRIVATE_RESEARCH_PIN — secret PIN; never expose in public assets/logs.
- PRIVATE_RESEARCH_SESSION_SECRET — random secret of at least 32 characters.
- PRIVATE_RESEARCH_BUCKET — optional Cloudflare R2-compatible binding, required only after a source has been installed and its storage_key configured.

## Allowed
- List non-sensitive source metadata.
- Validate a server-side PIN.
- Issue short-lived signed access tokens only for installed sources.
- Validate bearer tokens before content access.
- Fail closed when a secret, installed source, storage key, or bucket is missing.
- Return private source text only after valid session authentication and source installation.

## Forbidden
- Hard-coding the PIN or signing secret in frontend/public code.
- Returning private source text without authentication and verified installation.
- Treating a PIN as copyright permission.
- Marking a source installed without documented rights/permission and integrity verification.
- Mixing private source content into public Reader assets.
- Logging PINs, bearer tokens, or private source text.

## Verification
- Unit tests must cover missing configuration, invalid PIN, uninstalled source, token signature/expiry/tampering, missing bucket/object, and authenticated content access.
- Production promotion requires a rights/permission record, source integrity check, secret/binding setup, and live endpoint verification.
- No source is installed by this code change; SRC-IFB-001 remains PENDING_VERIFICATION.

## Change history
- 2026-09-20 — Initial access-control contract.
- 2026-11-17 — Added HMAC-signed 15-minute sessions and authenticated content route; source installation remains blocked pending permission verification.
