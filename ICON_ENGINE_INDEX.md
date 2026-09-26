# ICON_ENGINE_INDEX.md

## Al-Quran Project — Master Icon Engine & Mode Icon Index

**Document status:** MASTER INDEX  
**Created:** 2026-09-21

Purpose: This is the first navigation point for any future ChatGPT/Codex session or project contributor working on the Al-Quran Project icon system.

## 1. START HERE
When a new session is asked to work on “Icon Engine”, “আইকন ইঞ্জিন”, “Quran icons”, “General Quran Mode icons”, or “Sufi Mode icons”, read this file first and then inspect the referenced files before making any change.

Do not assume the icon system from conversation memory. The repository files are the project record.

Required workflow: Find → Read → Backup → Design/Modify → Review → Approve → Integrate → Verify → Live

Never overwrite an approved/canonical icon family merely to create another mode.

## 2. CANONICAL PROJECT
Repository: mosharrof0000-ux/al-quran-research
Main branch: main
Canonical live site: https://mosharrof0000-ux.github.io/al-quran-research/#quran

## 3. CANONICAL MASTER CUSTOM ICON ENGINE
Master source archive: /আল কোরআন প্রজেক্ট.zip
Relevant nested assets:
- আইকন/al_quran_icon_system_v1.0.zip
- আইকন/al_quran_dynamic_icon_engine_v1.0.zip
- আইকন/আইকন.txt

Dynamic engine archive contains engine/aqr-icon-engine.js, icon-manifest.json, engine-demo.html, README-DYNAMIC.md, docs/usage.html and the SVG collection.

Important: the Master ZIP is the canonical design/engine source. Do not silently replace it with a newly invented compact engine implementation. Compare before final integration.

## 4. CURRENT ENGINE INTEGRATION
Current project engine: assets/icon-engine/aqr-icon-engine.js
Gemini integration files: ui/home-v1/home-v1.html, ui/home-v1/home-v1.js, ui/home-v1/gemini-icon-v1.css

Gemini controlled markers include AQR_ICON:quran, ayah, research, analysis, translation, tafsir, document, info and verified.

Technical note: current Gemini integration uses prompt-controlled marker → frontend renderer, not native Gemini function calling.

Audit requirement: compare the current engine against the canonical Master ZIP engine before calling the current implementation final.

## 5. MODE ARCHITECTURE
General Quran reading mode identifier: general-quran
General asset directory: assets/icons/modes/general-quran-v1/

Sufi reading mode identifier: sufi
Sufi assets are NOT YET CREATED. When created, they must live in a separate mode family such as assets/icons/modes/sufi-v1/.

General and Sufi families must never overwrite each other.

## 6. GENERAL QURAN MODE ASSETS
Directory: assets/icons/modes/general-quran-v1/

Current 10 icons:
1. quran.svg — open Qur'an on Rehal/X-stand
2. surah.svg — Mihrab/Islamic arch frame
3. ayah.svg — 8-point Islamic star with center dot
4. tafseer.svg — Fanous/lantern knowledge motif
5. bookmark.svg — bookmark with dome/minaret-inspired top
6. audio.svg — Tilawat headphones with recitation-wave motif
7. home.svg — mosque-dome entrance
8. search.svg — magnifier with Islamic star
9. favorite.svg — geometric Islamic heart
10. share.svg — sharing nodes with arch-like connection

Supporting files: manifest.json and README.md

## 7. DESIGN STANDARD
- SVG, viewBox 0 0 64 64
- fill=none
- stroke=currentColor
- approximately 1.8–2px stroke
- rounded line caps/joins
- monochrome
- scalable and lightweight
- React/Web compatible
- Quranic/Islamic motif integrated into geometry

## 8. RUNTIME RULE
Conceptual resolver:
readingMode = general-quran → assets/icons/modes/general-quran-v1/
readingMode = sufi → separate Sufi icon family

Use semantic icon names so the same UI role can resolve to a different mode-specific SVG.

## 9. REFERENCE DOCUMENT
Search for: MODE_ICON_DESIGN_REFERENCE
The reference establishes the General Quran 10-icon family and the requirement for a separate Sufi family.

## 10. HISTORY
Gemini Custom Icon Integration: WORK-2026-09-21-GEMINI-CUSTOM-ICON-INTEGRATION-01
General Quran Mode Icon Assets: WORK-2026-09-21-MODE-ICON-ASSET-SET-01
General asset PR: #71
Merged commit: 00f112aaa1117c9a09f6354569087fce904be6ca
Asset backup branch: backup/pre-mode-icon-assets-2026-09-21

## 11. LIVE VS STORED
Stored: General Quran 10-icon SVG family, manifest, README, design reference, engine integration, Gemini marker rendering, this master index.
Not yet completed: General icon runtime integration into Reader UI; separate Sufi icon family; full audit/reconciliation of current engine against Master ZIP; final live visual verification.

Do not claim unfinished items are Live Verified.

## 12. SAFETY
Before modifying the icon engine or a mode family: create backup branch → record it → work isolated → avoid database/research changes → review → test → merge → verify deployment → update documentation.
Current pre-index backup: backup/pre-icon-engine-master-index-2026-09-21

## 13. QUICK SEARCH TERMS
ICON_ENGINE_INDEX.md
Icon Engine
aqr-icon-engine.js
general-quran-v1
MODE_ICON_DESIGN_REFERENCE
AQR_ICON
WORK-2026-09-21-MODE-ICON-ASSET-SET-01
WORK-2026-09-21-GEMINI-CUSTOM-ICON-INTEGRATION-01
sufi
readingMode

## 14. DO NOT DO
- Do not overwrite the Master ZIP.
- Do not delete General Quran icons to create Sufi icons.
- Do not mix Sufi and General assets in one directory.
- Do not claim Live Verified without actual deployment/rendering verification.
- Do not replace SVGs with screenshots/raster images.
- Do not silently change icon semantics.
- Do not modify database/research records for icon-only work.

## 15. NEXT PATH
When the user says “Icon Engine integrate করুন”: read this index → read project state/work log → inspect Master ZIP engine → compare current engine → reconcile safely → connect general-quran through a mode-aware resolver → build/test Sufi only when requested → backup → verify Reader UI → document → promote Live.

## 16. CORE PRINCIPLE
One UI structure, multiple visual modes, isolated assets, preserved provenance.

General Quran Mode and Sufi Mode are separate visual families under one mode-aware Icon Engine architecture.