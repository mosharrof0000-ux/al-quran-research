# QGWLI Fatiha A001 Pilot Validation Report v1.1

**Status:** PASS — A001 fixture validated after independent recount; full Fatiha remains NOT READY.

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
- T21 Independent Recount — PASS after correction: Unicode letter-category count and explicit base-letter/mark filtering agree
- T22 Raw/Normalized Traceability — PASS
- T23 Source/Version Traceability — PASS
- T24 Formula Traceability — BLOCKED for mathematical research because no mathematical calculation is being published in this fixture
- T25 Non-Destructive Correction — PASS: the fixture correction was additive/versioned and did not modify canonical raw data

## Verified pilot values
- Word occurrences in A001: **4**
- Base-letter occurrences in A001: **19**
- Global word positions: GW-000001 through GW-000004
- Global letter positions: GL-000001 through GL-000019

**Important correction:** the first fixture draft incorrectly counted the dagger alif mark in the word as a base letter. Independent Unicode-category recount identified the discrepancy. The fixture was corrected so the dagger alif remains preserved as a mark but is not counted as a base-letter occurrence under QGWLI-BASE-LETTER-v1.

These numbers are **fixture-scoped results**, not a claim about the complete Fatiha or the whole Quran.

## Gate decision
**A001 QGWLI fixture: PASS.**

**Full Fatiha QGWLI: BLOCKED / NOT READY FOR SCALE**, until A002-A007 receive a reviewed deterministic tokenization/word-occurrence layer and the same validation contract is run across them.

No live site or main-branch data was changed by this pilot validation.
