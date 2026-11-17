# Private Research Library — v1.1

## Status
IN PROGRESS — access-control contract hardened; source installation, rights verification, storage and Chat context integration remain pending.

## Purpose
Provide a permanent architecture for books and Quran editions that are available to the user for research but are not authorized for public web publication.

## Source states
PRIVATE, PERMISSION_PENDING, PERMISSION_GRANTED, PUBLIC, RESTRICTED, ARCHIVED.

## Chatbox flow
＋ Tools → 🔐 Private Research → source → server-side PIN validation → short-lived signed session → authenticated private-source retrieval → research context.

The end-to-end flow is NOT YET ACTIVE. The current UI lists sources and submits a PIN, but it does not retain the returned bearer token or retrieve source text into the Chat context.

## Security boundary
- Private text must not be shipped in GitHub Pages assets.
- The frontend must not contain the PIN or session signing secret.
- The Worker validates a server-side PIN and HMAC-SHA-256 bearer session.
- Session lifetime is 900 seconds.
- Private content is returned only when source installation, storage key, bucket binding and session validation are all present.
- Missing configuration or source installation must fail closed.
- A PIN or session token is not copyright permission.

## Current Source — SRC-IFB-001
- Name in current manifest: ইসলামিক ফাউন্ডেশন — আল-কুরআনুল করীম.
- State: PRIVATE.
- Permission status: PENDING_VERIFICATION.
- Installed: false.
- Edition/version and exact source scope: UNKNOWN / not verified.
- Digital source file, digitization provenance and integrity checksum: not supplied/verified.
- Copyright, license or permission evidence for private digitization/storage/use: not supplied/verified.
- Storage object and R2 binding: not configured.
- Research Chat context retrieval: not integrated.
- Source text is not included in this repository or public assets.

Do not set installed=true until the exact edition, source provenance, permitted use, integrity hash and private storage location are documented and independently checked.

## Required Worker configuration
- PRIVATE_RESEARCH_PIN — Worker secret.
- PRIVATE_RESEARCH_SESSION_SECRET — Worker secret with at least 32 characters.
- PRIVATE_RESEARCH_BUCKET — private R2-compatible binding after approved source installation.

Live secret/binding configuration has not been verified. No production secret or bucket was created by this change.

## Rights and publisher verification note
- The official Islamic Foundation Publications Department describes the Foundation as publisher of the Bengali Quran translation and notes repeated editions/reprints. This corroborates the publisher identity, but does not grant a digital reproduction or AI-processing license: https://islamicfoundation.gov.bd/pages/static-pages/6922dd78933eb65569e15274
- The official Bangladesh Copyright Act 2000 text lists fair use for private study/private use including research in section 72(1)(i): https://bdlaws.minlaw.gov.bd/upload/act/2021-11-17-10-44-05-32.-The-Copyright-Act-2000.pdf
- That general provision does not by itself settle whole-book digitization, server-side storage, multi-device access, or sending full source text to an external AI provider. Do not treat it as an automatic permission grant.
- The Foundation's official officers page lists the Director, Publications contact (dir.publication@islamicfoundation.gov.bd) and Assistant Director contact (ad.publication@islamicfoundation.gov.bd): https://islamicfoundation.gov.bd/pages/officers
- Obtain and record written permission or a documented legal basis covering the exact intended technical use before installing the full source. This note is a project risk record, not legal advice.

## Future public promotion
PRIVATE → PERMISSION_GRANTED → PUBLIC, only after permission evidence and controlled promotion. Public promotion is separate from private research access.

## Change history
- 2026-09-20 — Initial implementation.
- 2026-11-17 — Updated status and recorded concrete source, rights, storage and Chat integration blockers.
