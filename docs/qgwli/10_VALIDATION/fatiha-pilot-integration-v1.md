# QGWLI Fatiha Pilot — Modular Integration v1

Status: PROPOSED — REVIEW REQUIRED

## Current population

The modular architecture is populated with the Fatiha corpus identity and dedicated QGWLI Word/Letter layers.

- A001: validated pilot fixture — 4 word occurrences, 19 base-letter occurrences.
- A002: 4 words, 18 base letters; proposed indexing.
- A003: 2 words, 12 base letters; proposed indexing.
- A004: 3 words, 12 base letters; proposed indexing.
- A005: 4 words, 19 base letters; proposed indexing.
- A006: 3 words, 19 base letters; proposed indexing.
- A007: 9 words, 44 base letters; proposed indexing.

## Verification basis

1. Canonical pilot dataset: `data/fatiha-master-v1.json`, version `2026-09-04-fatiha-master-v1`.
2. Word boundaries were cross-checked against the Quranic Arabic Corpus word-by-word resource for Surah 1.
3. Base-letter counts were independently derived from the canonical Arabic strings using QGWLI-BASE-LETTER-v1; Arabic letters are counted, while combining marks/diacritics remain preserved but are not counted.
4. The A001 fixture has already passed its independent validation contract. A002–A007 still require the full validator execution and deterministic rebuild test before being promoted to VERIFIED.

## Deployment gate

PR #49 remains a draft review branch. Cloudflare reported a failed Workers deployment for commit `a072c70`. The GitHub-visible record provides the build ID and log link, but the actual Cloudflare build log is not exposed through the connected GitHub data available here. Therefore the failure cause is **not declared resolved or diagnosed from assumption**.

No main-branch or live-site change is authorized by this document.

## Next gate

Run the QGWLI validator across A002–A007, compare independent recounts, perform deterministic rebuild checks, then review the Cloudflare build failure log. Only after those gates pass should the pilot be considered for approval/merge.
