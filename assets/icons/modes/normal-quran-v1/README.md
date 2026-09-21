# Normal Quran Mode Icon Set v1

## Purpose
This folder stores the first production-oriented reference icon set for ordinary Quran reading mode.

The supplied design reference establishes the visual direction: minimalist Islamic/Quranic line art, monochrome, transparent background, currentColor, and a consistent 64×64 viewBox.

## Icons
1. quran.svg — open Quran on a rehal/X-stand
2. surah.svg — mihrab/arch frame
3. ayah.svg — eight-point Islamic star with center dot
4. tafseer.svg — Islamic lantern / knowledge motif
5. bookmark.svg — bookmark with minaret/dome top
6. audio.svg — headphones with recitation-wave geometry
7. home.svg — mosque-dome gateway
8. search.svg — magnifier with eight-point star
9. favorite.svg — heart with geometric/calligraphic interior
10. share.svg — sharing nodes with arch-like connection

## How the mode system uses them
Reader mode normal-quran resolves icons from:
assets/icons/modes/normal-quran-v1/<icon>.svg

Future Sufi mode must use its own folder and manifest:
assets/icons/modes/sufi-v1/<icon>.svg

This prevents one mode from overwriting another.

## Current status
STORED AS REFERENCE/PILOT ASSETS — NOT AUTOMATICALLY WIRED INTO THE LIVE UI.

Before live integration:
- review each SVG visually;
- verify mobile sizing and currentColor inheritance;
- verify accessibility labels;
- create a backup checkpoint;
- connect through the existing icon engine/reader mode resolver;
- run smoke test;
- only then publish.

## Design source
The 10-icon reference sheet supplied/generated on 2026-09-21 is the visual reference for this set. These SVGs are clean project assets derived from the requested design rules; they are not claimed to be pixel-identical tracing of the reference image.
