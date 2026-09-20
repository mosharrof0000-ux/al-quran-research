# Research Intelligence Architecture — v1.0

## Status
DRAFT — implementation branch only; not yet approved for main/live.

## Purpose
Define the future-ready research architecture for the Al-Quran Research chatbox.

## Chain
Chatbox → Query Understanding → Research Router → Source & Permission Manager → Research Data / Private Library → Evidence & Provenance → Analysis Engine → AI Explanation → Traceable Answer.

## Core rules
- AI-generated information is not automatically verified.
- Project data remains separate from external information.
- Raw source data is immutable/versioned.
- Private sources are never bundled into public frontend assets.
- Permission status is explicit: PRIVATE, PERMISSION_PENDING, PERMISSION_GRANTED, PUBLIC, RESTRICTED, ARCHIVED.
- Research answers should expose source/provenance metadata when available.
- Missing project data must remain missing; the AI must not silently fill gaps from general knowledge.

## Private Research Library
Private sources are research-only until permission is verified. Access is server-side and fail-closed. The frontend never stores the PIN.

## Future scale
Stable Source IDs, Record IDs, Dataset Versions, Evidence IDs and audit records must remain stable as the dataset grows.

## Implementation boundary
This phase introduces routing/access-control contracts and UI entry points. It does not import or publish copyrighted/private source text.

## Change history
- 2026-09-20 — Initial implementation contract created on a safety branch.
