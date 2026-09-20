# Private Research Library — v1.0

## Status
DRAFT — safety branch implementation.

## Purpose
Provide a permanent architecture for books and Quran editions that are available to the user for research but are not authorized for public web publication.

## Source states
PRIVATE, PERMISSION_PENDING, PERMISSION_GRANTED, PUBLIC, RESTRICTED, ARCHIVED.

## Chatbox flow
＋ Tools → 🔐 Private Research → source → server-side authentication → research context.

## Security boundary
Private text must not be shipped in GitHub Pages assets. The frontend must not contain the PIN. The Worker validates a server-side secret.

## Current Source
SRC-IFB-001 remains not installed. Its source text is not included by this implementation.

## Future public promotion
PRIVATE → PERMISSION_GRANTED → PUBLIC, only after permission evidence and controlled promotion.

## Change history
- 2026-09-20 — Initial implementation.
