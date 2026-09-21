# Normal Quran Reading Mode Icon Set v1

## Purpose
This folder stores the production-oriented SVG reference assets for the **Normal Quran Reading Mode**. The visual reference is the 2026-09-21 minimalist Islamic icon sheet.

## Mode rule
- `quran-normal`: uses this icon family.
- `sufi`: must use a separate Sufi icon family.
- Changing mode must switch the asset family; one mode must not overwrite another mode's SVGs.

## Design contract
- SVG, viewBox `0 0 64 64`
- `fill="none"`
- `stroke="currentColor"`
- stroke-width `1.8`
- round caps and joins
- monochrome/recolorable
- lightweight and scalable
- Islamic/Quranic motif integrated into the geometry

## Icon mapping
| File | Reader role |
|---|---|
| quran-rehal.svg | Main Quran / Reader |
| surah-mihrab.svg | Surah |
| ayah-rub-el-hizb.svg | Ayah |
| tafsir-lantern.svg | Tafsir / knowledge |
| bookmark-minaret.svg | Save / bookmark |
| audio-tilawat.svg | Audio / Tilawat |
| home-mihrab.svg | Home navigation |
| search-star.svg | Search |
| favorite-geometric.svg | Favorite / like |
| share-arch.svg | Share |

## Integration rule
These files are **stored reference assets first**. They must not replace the existing canonical icon engine automatically. Before integration:
1. backup current icon-engine state;
2. preview the SVGs in an isolated demo;
3. verify mobile and desktop rendering;
4. verify Normal vs Sufi mode isolation;
5. only then connect them to the Reader.

## Sufi mode
A future folder such as `assets/icon-engine/modes/sufi-v1/` will contain a distinct Sufi visual language. Do not place Sufi assets in this folder.
