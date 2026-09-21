# Normal Quran Icon Mode v1 — Design & Usage Record

Status: CREATED / STORED — not wired into the live reader yet.

Purpose: the user-supplied 10-icon visual reference is normalized into a dedicated icon set for ordinary Quran reading.

Mode separation:
- normal-quran-v1: ordinary Quran reading.
- sufi-v1: future separate visual system.
- Mode switching selects an asset namespace; it never overwrites another mode.

Technical contract: SVG; viewBox 0 0 64 64; fill none; stroke currentColor; nominal stroke-width 1.9; round caps/joins; no external icon library.

Reader placement: Quran=reader/source entry; Surah=surah navigation; Ayah=ayah marker; Tafseer=knowledge; Bookmark=save; Audio=tilawat; Home=Quran home; Search=Quran search; Favorite=saved item; Share=share action.

Integration rule: first test in an isolated reader demo, then create a versioned integration PR. Do not replace the existing master icon engine or unrelated header icons without explicit approval.

Reference: the supplied 2026-09-21 design image is the visual reference. These SVGs are the project-stored normalized implementation.

Verification checklist: SVG/XML validity; currentColor behavior; 24/32/40/48px mobile rendering; light/night contrast; isolated reader demo; approval before live integration.