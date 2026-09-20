# Islamic Foundation Quran Source — Private-Lock Intake

## Status
DRAFT — source collected for verification only. Not installed into the live Reader.

## Intended Reader Source
- Planned source slot: Source 3
- Source ID: SRC-IFB-001
- Default visibility: PRIVATE / LOCKED
- Public Reader exposure: DISABLED until explicit approval

## Source evidence
The official Islamic Foundation publication information states that the Foundation has published Bangla Quran translations and reports a 50th edition of the Bangla translation of the Quran. The official site also links to a Digital Quran service.

A third-party PDF copy was located that identifies the work as “আল-কুরআনুল করীম”, published by Islamic Foundation Bangladesh. This copy is recorded only as a source lead; it is NOT copied into the repository or live site at this stage.

## Source references
- Official publisher: https://islamicfoundation.gov.bd/
- Official digital Quran: https://islamicfoundation.gov.bd/pages/external-links/ডিজিটাল-কুরআন-5dc3fe-6922d9e6dbfbab28ce051109
- Official publication information: https://islamicfoundation.portal.gov.bd/pages/static-pages/6922dd78933eb65569e152e4
- Candidate source copy (third-party; verification only): https://cdn.muslimdawah.org/static/books/bengali/Al-Quranul-Karim-Islamic-Foundation-39sl4s.pdf

## Required verification before installation
1. Confirm the exact edition/source intended by the user.
2. Confirm whether the exact digital text/PDF may be stored and served by this project.
3. Preserve the source unchanged if acquired.
4. Record edition/date/ISBN or other bibliographic identifiers.
5. Record permission/licence/usage terms from an authoritative source.
6. Only after verification may the source be converted into project data.

## Private-Lock architecture
The source must NOT be bundled into public GitHub Pages assets if the requirement is that ordinary live visitors cannot obtain it.

Planned access chain:
Public Reader → Source 3 entry (locked) → private access gate → server-side protected source endpoint/storage → source data.

Lock fields:
- source_id: SRC-IFB-001
- visibility: PRIVATE
- locked_by_default: true
- authentication: PIN
- secret_ref: ISLAMIC_FOUNDATION_SOURCE_PIN
- public_asset_copy: FORBIDDEN
- frontend_pin_storage: FORBIDDEN
- direct_source_url_in_public_UI: FORBIDDEN

The requested PIN 1234 is not stored in repository code. It should be stored as a server-side secret if/when the private endpoint is implemented. A 4-digit PIN is a convenience lock, not strong security.

## Installation boundary
This document does NOT install, expose, merge, transform, or publish the source. It only records the source lead and prepares the private-lock contract.

## Change history
- 2026-09-19 — Initial source-intake and private-lock structure created.
