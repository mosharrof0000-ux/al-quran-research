# Instruction — Private Research Library

## Identity
Path: docs/PRIVATE_RESEARCH_LIBRARY.md
Version: 1.1
Status: IN PROGRESS — source and rights verification pending

## Purpose
Govern private research-only source handling, access, storage, rights evidence and controlled public promotion.

## Allowed
- Record source states and access architecture.
- Record permission and provenance evidence.
- Keep source installation pending until exact edition, rights, integrity and storage are verified.
- Plan controlled public promotion.

## Forbidden
- Publishing restricted source text without verified rights.
- Embedding secrets in public assets.
- Treating PIN authentication as copyright permission.
- Marking a source installed without a verified source file, provenance, integrity hash and private storage location.
- Claiming Chat context integration before the UI retrieves authenticated content and the Worker safely supplies it to the research context.

## Verification
For each private source, record exact edition/version, provider/publisher, scope, source file provenance, rights/permission evidence, integrity checksum, storage object, access test, and context integration test. Unknown values remain UNKNOWN/PENDING_VERIFICATION.

## Related
- backend/private-research.js
- backend/private-research.js.instruction.md
- docs/RESEARCH_SOURCE_REGISTRY.md
- docs/RESEARCH_SOURCE_REGISTRY.instruction.md
- MASTER_INSTRUCTION.md

## Change history
- 2026-09-20 — Created.
- 2026-11-17 — Added installation, rights, integrity, storage and Chat integration gates.
