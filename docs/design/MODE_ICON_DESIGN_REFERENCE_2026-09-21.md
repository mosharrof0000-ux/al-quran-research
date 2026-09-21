# Mode Icon Design Reference — 2026-09-21

Status: REFERENCE ONLY — NOT YET INTEGRATED INTO LIVE UI

The generated icon-sheet image in the conversation is the approved visual reference for a future mode-aware icon system.

## General design language
- Minimalist, modern, thin line-art.
- Target stroke: 1.8–2px.
- Monochrome treatment using `stroke="currentColor"` and `fill="none"` for production SVGs.
- Icons should remain lightweight, scalable and web/React friendly.
- Standard reading mode uses the general Qur'an/Islamic motif family shown in the reference.

## General reading mode reference icons
1. Quran / Main Book — open Qur'an on a Rehal/X-stand.
2. Surah — Islamic Mihrab/arch frame.
3. Ayah — 8-point Rub el Hizb style star with subtle center dot.
4. Tafseer / Knowledge — Fanous/lantern or traditional quill concept.
5. Save / Bookmark — bookmark with minaret-dome top.
6. Audio / Tilawat — headphones with recitation-wave motif.
7. Home — simplified mosque-dome entrance/arch.
8. Search — magnifying glass with 8-point star inside.
9. Favorite — heart with subtle Islamic geometric/calligraphic detail.
10. Share — sharing nodes connected through an arch-like form.

## Future mode separation
- General Qur'an reading mode: use the icon family above.
- Sufi reading mode: create a separate Sufi visual family later; do not replace or overwrite the general family.
- Mode selection must control icon family at runtime.
- Sufi-mode icons should be designed separately and reviewed before integration.
- Existing project custom icon system remains the canonical technical source; this image is a visual design reference, not a replacement source.

## Safety
No live UI or database changes are made by this reference record. Future integration must follow:
Backup → Design → Review → Approve → Integrate → Verify → Live.

Reference image SHA-256:
`170c83ecf42c84ca4c09686fccb32311c2272fe2d15dd4eb4b9be6ebce14c4d1`


## 2026-09-21 — General Mode SVG Set Stored
The first production-ready General Quran Reading Mode SVG set has now been created and stored at `assets/icons/mode-general-v1/`.

Stored assets: quran, surah, ayah, tafseer, bookmark, tilawat, home, search, favorite, share, plus README and manifest.

Status: **DESIGNED_AND_STORED — NOT_YET_LIVE_INTEGRATED**.
