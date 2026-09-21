# Normal Quran Mode — Icon Set v1

**Record ID:** ICON-MODE-NORMAL-QURAN-2026-09-21-01  
**Status:** REFERENCE READY / ISOLATED — NOT YET LIVE  
**Purpose:** সাধারণ কোরআন পাঠের সময় ব্যবহারযোগ্য minimalist Islamic UI icon set-এর প্রথম সংরক্ষিত সংস্করণ।

## Reference

User-approved visual reference: the 10-icon design sheet generated in this conversation on 2026-09-21.

The reference establishes:
- thin line-art;
- monochrome SVG;
- transparent/white background;
- `fill="none"`;
- `stroke="currentColor"`;
- approximately 2px stroke;
- Quranic/Islamic motif inside the geometry.

## Where the assets are stored

`assets/icons/modes/normal-quran-v1/`

Files:
1. `quran.svg` — Open Quran on rehal
2. `surah.svg` — Mihrab/arch frame
3. `ayah.svg` — 8-point star / Rub el Hizb inspired marker
4. `tafseer.svg` — Fanous / knowledge lantern
5. `bookmark.svg` — Minaret/dome-inspired bookmark
6. `audio.svg` — Tilawat headphones + recitation wave
7. `home.svg` — Mosque gateway
8. `search.svg` — Search lens + 8-point star
9. `favorite.svg` — Heart + Islamic geometric center
10. `share.svg` — Arch-like sharing connection

## Intended use

When the Reader is in **Normal Quran Mode**, the matching semantic UI roles may use these assets:
- Quran → main Quran entry
- Surah → surah navigation
- Ayah → ayah reference
- Tafseer → knowledge/tafsir entry
- Bookmark → saved reading position
- Audio → tilawat/audio control
- Home → Quran home/navigation
- Search → Quran search
- Favorite → favorite/save preference
- Share → verse/share action

These assets are **not** the Sufi Mode icon set.

## Mode separation

Future **Sufi Mode** must have a separate asset directory and manifest. Switching modes should select a different icon theme rather than overwrite the Normal Mode assets.

Suggested future structure:
`assets/icons/modes/sufi-v1/`

## Integration rule

Process:
**Backup → isolated integration → visual/mobile review → approve → main/live**

This v1 set is intentionally stored without changing the live reader.

## Safety

- No Quran database changes.
- No translation/pronunciation changes.
- No research-data changes.
- No existing Master Icon Engine replacement.
- Existing project icons remain available until this set is formally approved.

## Next review

Check SVG rendering at 16px, 20px, 24px, 32px and 48px, light/night backgrounds, Android/mobile width, and currentColor inheritance before production integration.
