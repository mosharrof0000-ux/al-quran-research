# QGWLI Fatiha A001 Pilot Validation Report v1.0

**Status:** PASS — A001 fixture validated; full Fatiha remains NOT READY.

## Scope
This report validates only **Q001001 / S001-A001**. A002-A007 are not indexed because the canonical Fatiha pilot dataset currently marks their analysis as ANALYSIS_PENDING.

## Results
- T01 Canonical Source Integrity — PASS
- T02 Raw Text Preservation — PASS
- T03 Surah Identity — PASS
- T04 Ayah Identity — PASS
- T05 Ayah Sequence — PASS for source structure (7 ayahs present)
- T06 Word Segmentation — PASS for A001 using the existing four verified tokens
- T07 Local Word Position — PASS
- T08 Word Occurrence ID — PASS
- T09 Global Word Position — PASS for the A001 pilot scope
- T10 Word Type vs Occurrence — PASS for the pilot scope
- T11 Letter Classification — PASS for the declared base-letter rule
- T12 Letter Type Identity — PASS
- T13 Letter Occurrence ID — PASS
- T14 Local Letter Position — PASS
- T15 Global Letter Position — PASS for the A001 pilot scope
- T16 Word → Letter Mapping — PASS
- T17 Letter → Word Reverse Mapping — PASS
- T18 Repeated Word Retrieval — REVIEW/NOT APPLICABLE in A001-only scope
- T19 Repeated Letter Retrieval — PASS within A001
- T20 Deterministic Rebuild — PASS for fixture regeneration checks
- T21 Independent Recount — PASS: two independent Unicode/category and explicit-mark methods agree
- T22 Raw/Normalized Traceability — PASS
- T23 Source/Version Traceability — PASS
- T24 Formula Traceability — BLOCKED for mathematical research because no mathematical calculation is being published in this fixture
- T25 Non-Destructive Correction — PASS: fixture is additive and does not modify canonical raw data

## Verified pilot values
- Word occurrences in A001: **4**
- Base-letter occurrences in A001: **20**
- Global word positions: GW-000001 through GW-000004
- Global letter positions: GL-000001 through GL-000020

These numbers are **fixture-scoped results**, not a claim about the complete Fatiha or the whole Quran.

## Gate decision
**A001 QGWLI fixture: PASS.**

**Full Fatiha QGWLI: BLOCKED / NOT READY FOR SCALE**, until A002-A007 receive a reviewed deterministic tokenization/word-occurrence layer and the same validation contract is run across them.

No live site or main-branch data was changed by this pilot validation.
