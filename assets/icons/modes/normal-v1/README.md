# Normal Qur'an Reading Mode Icons v1

Status: CREATED AND STORED — asset-only; not yet live-wired.

Design contract:
- SVG, 64x64 viewBox
- fill="none"
- stroke="currentColor"
- target stroke-width 1.8
- round linecap/linejoin
- monochrome, scalable, lightweight and web/React friendly

Files:
quran.svg — Qur'an / Main Book
surah.svg — Surah / Mihrab
ayah.svg — Ayah / 8-point star
tafseer.svg — Tafseer / Fanous
bookmark.svg — Save / minaret-dome bookmark
audio-tilawat.svg — Tilawat / recitation wave
home.svg — Home / mosque entrance
search.svg — Search / star-in-lens
favorite.svg — Favorite / geometric heart
share.svg — Share / arch-connected nodes

Mode rule:
These assets belong only to Normal Qur'an Reading Mode. Future Sufi Mode must use a separate icon family and must not overwrite this set.

Integration order:
Backup -> Review -> runtime mode resolver -> accessibility/mobile/night verification -> deploy -> live smoke test -> documentation update.