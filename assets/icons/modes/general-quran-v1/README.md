# General Quran Reading Mode — Icon Set v1

Status: DESIGN ASSET — STORED, NOT YET INTEGRATED INTO LIVE UI

## Purpose
These 10 production-ready SVG assets are the first concrete implementation of the approved general Qur'an reading-mode icon reference.

## Where they are stored
- Directory: `assets/icons/modes/general-quran-v1/`
- Manifest: `manifest.json`

## How the application should use them
1. The reader has a runtime `readingMode`.
2. When `readingMode === "general-quran"`, resolve icons from this directory/manifest.
3. When `readingMode === "sufi"`, do NOT reuse or overwrite these files; resolve a separate Sufi icon family.
4. Icon color should inherit from the UI using `currentColor`.
5. Icons should be rendered at any size without raster conversion.
6. Do not edit individual SVGs to support a different mode. Add a new mode family instead.

## Semantic mapping
- quran → main Qur'an/rehal
- surah → surah/mihrab
- ayah → ayah/Rub el Hizb motif
- tafseer → knowledge/fanous
- bookmark → save
- audio → tilawat
- home → reader home
- search → Qur'an search
- favorite → favorite
- share → share

## Integration gate
Backup → Review → Approve → Integrate → Verify → Live.

No live UI/database change is included in this asset commit.
