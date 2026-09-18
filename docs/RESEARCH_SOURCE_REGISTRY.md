# Research Source Registry — v1.0

## Purpose
এই Registry হলো প্রকল্পের Research Source/Document provenance-এর কেন্দ্রীয় নথি। এটি Reader-এর source list-এর বিকল্প নয়। এখানে কোন গবেষণা/Reader উৎস কোথা থেকে এসেছে, কী scope-এ ব্যবহৃত হচ্ছে, কী status আছে এবং কোন provenance এখনো অসম্পূর্ণ—তা আলাদা রাখা হবে।

## Governance
- বাহ্যিক উৎসের তথ্য নিজে থেকে PROJECT_MASTER_DATASET-এর VERIFIED data নয়।
- Raw source text পরিবর্তন করা যাবে না; version/update আলাদা করে নথিভুক্ত হবে।
- Source না জানা থাকলে UNKNOWN বা PENDING_VERIFICATION লিখতে হবে; কোনো source বানানো যাবে না।
- একটি source-এর dataset-level licence থাকলেই underlying field provenance স্বয়ংক্রিয়ভাবে verified ধরা যাবে না।
- Research claim-এর source chain যতদূর সম্ভব: Source → Version → Document/Record → Ayah/Token → Evidence → Status।
- Reader source এবং Research evidence source আলাদা registry scope হিসেবে বিবেচিত হবে।

## Status vocabulary
VERIFIED = repository record-এ পর্যাপ্ত source/provenance evidence আছে।
PENDING_VERIFICATION = ব্যবহার/উল্লেখ আছে, কিন্তু প্রয়োজনীয় source/provenance সম্পূর্ণ যাচাই হয়নি।
UNKNOWN = বর্তমান repository evidence থেকে source নিশ্চিত করা যায়নি।
RETIRED = নতুন workflow-এ আর ব্যবহারযোগ্য নয়; history preserved।

## Current Registry

| ID | Source / Document | Scope | Location / Endpoint | Status | Notes |
|---|---|---|---|---|---|
| SRC-001 | Quranic Arabic Corpus | Fatiha pilot linguistic evidence | https://corpus.quran.com/ | EXTERNAL_REFERENCE | data/fatiha-master-v1.json-এ E-QAC-001 হিসেবে নথিভুক্ত; external reference, project-verified data নয়। |
| SRC-002 | Tanzil Uthmani text | Reader Arabic source | Reader endpoint configured in ui/home-v1/home-v1.js | PENDING_VERIFICATION | Current Reader uses a Tanzil-sourced Uthmani distribution endpoint; exact repository/source snapshot should be recorded before certification. |
| SRC-003 | QuranEnc Bengali Zakaria | Reader Bengali translation | https://quranenc.com/api/v1/translation/sura/bengali_zakaria/{surah} | PENDING_VERIFICATION | Current Reader integration exists; displayed version text must be reconciled with the provider's current documented version before certification. |
| SRC-004 | Anis Afifi Multilingual Quran Dataset | Reader Bengali pronunciation (transliteration_bn) | Hugging Face Dataset Viewer/API | PENDING_VERIFICATION | Dataset-level licence is documented in the Reader, but underlying provenance of the Bengali transliteration field remains separately under verification. |
| SRC-005 | Project Master Dataset — Fatiha | Canonical project research record | data/fatiha-master-v1.json | VERIFIED | Pilot master dataset; status is PILOT and individual records carry their own status. |

## Project Master Dataset
Current canonical Research API dataset: data/fatiha-master-v1.json
Current dataset version: 2026-09-04-fatiha-master-v1
Current status: PILOT

The Research API currently exposes records from this dataset. Therefore an AI response about an ayah that is not present in this dataset must not present general knowledge as project-verified research.

## Provenance Gaps
1. Reader Arabic source needs a fixed source snapshot/version record.
2. Reader Bengali translation version displayed in ui/home-v1/home-v1.html must be reconciled against the provider's current documented version.
3. Bengali pronunciation underlying-source provenance is not yet fully established.
4. The project Research API master dataset currently covers the Fatiha pilot, not the whole Quran.
5. Natural-language ayah routing and source gating must remain fail-closed when no project record exists.

## Required Future Record Shape
- source_id
- source_name
- source_type
- provider
- canonical_url or endpoint
- version/date
- licence/usage terms
- exact scope
- document/dataset identifier
- ayah/token mapping when applicable
- provenance notes
- verification status
- verification date
- related evidence IDs
- affected project files

## Change History
- 2026-09-19 — v1.0 created as the central Research Source/Document provenance registry.