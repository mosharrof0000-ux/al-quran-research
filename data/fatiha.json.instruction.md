# Instruction — data/fatiha.json

**Instruction ID:** INST-DATA-FATIHA
**Target:** `data/fatiha.json`
**Class:** A — Critical research data
**Status:** ACTIVE

## Purpose
Protect the Al-Fatiha pilot dataset as structured research data with explicit version and verification status.

## Rules
- Preserve the raw Arabic text.
- Do not silently overwrite established records.
- Corrections require a new version/proposal or an explicitly documented controlled update.
- AI-generated analysis is not automatically verified.
- Keep uncertainty and disputed linguistic points explicit.
- Maintain stable ayah/word identifiers.
- Do not add sectarian conclusions to the language dataset.

## Verification
Validate JSON structure, version metadata, research status, stable identifiers, and evidence references after changes.

## Dependencies
Research schema, Quran text foundation, evidence sources, research chain, approval workflow.

## Update Trigger
Any change to ayah text, token/word analysis, root, morphology, grammar, evidence, verification status, version, or dataset structure.
