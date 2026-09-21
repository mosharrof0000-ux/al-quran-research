# General Quran Reading Mode Icon Set v1

This folder stores the production-ready SVG icon family for the General Quran Reading Mode.

Design contract:
- SVG, scalable and lightweight
- fill="none"
- stroke="currentColor"
- 2px line weight
- round caps/joins
- monochrome by inheritance from the UI
- Quranic/Islamic motif built into each geometry

Icons:
quran, surah, ayah, tafseer, bookmark, tilawat, home, search, favorite, share

Mode separation:
These assets belong only to General Quran Reading Mode. They must not be overwritten by the future Sufi Mode icon family. Sufi assets must live in a separate mode folder and use separate IDs.

Runtime use:
The SVGs are intended for inline SVG or asset loading. currentColor allows light/dark/theme colors without editing the SVG file.

Governance:
Before changing these approved assets: backup, experimental version, review, approve, integrate, verify, document.
