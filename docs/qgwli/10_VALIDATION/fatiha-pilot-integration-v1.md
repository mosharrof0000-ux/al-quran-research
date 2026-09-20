# QGWLI Fatiha Pilot — Modular Integration v1

Status: MERGED TO MAIN — PILOT VERIFICATION STILL INCOMPLETE

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

PR #49 was merged into `main` at merge commit `ae8a7cca5830c1e89b133d964705882240ad68d5`.

GitHub Pages deployment for that merge commit completed successfully on 2026-09-20. This confirms that the merged repository state was accepted by the GitHub Pages deployment workflow; it does not by itself verify every live-site feature.

A previous Cloudflare deployment failure for commit `a072c70` remains a separate infrastructure item. Its root cause is not declared resolved until the relevant Cloudflare build/log evidence is verified.

## Next gate

Next: run the QGWLI validator across A002–A007, compare independent recounts, perform deterministic rebuild checks, and synchronize the final validation status. Separately, verify the current Cloudflare deployment state before declaring the full live stack healthy.
