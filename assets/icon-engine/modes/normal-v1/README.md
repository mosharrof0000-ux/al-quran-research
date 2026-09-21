# Normal Quran Reading Mode Icons v1

এই folder-এ সাধারণ কোরআন পাঠের জন্য ১০টি আলাদা SVG icon রাখা হয়েছে।

## Design contract
- SVG viewBox: 0 0 64 64
- fill: none
- stroke: currentColor
- stroke-width: 1.8
- linecap/linejoin: round
- monochrome এবং recolorable
- lightweight/scalable
- Quranic/Islamic motif integrated

## Mode usage
এই family শুধুমাত্র `quran-normal` Reader mode-এর জন্য।
Sufi mode-এর icon আলাদা folder/family-তে থাকবে এবং এই files overwrite করবে না।

## Mapping
- quran-rehal.svg — Main Quran / Reader
- surah-mihrab.svg — Surah
- ayah-rub-el-hizb.svg — Ayah
- tafsir-lantern.svg — Tafsir / Knowledge
- bookmark-minaret.svg — Save / Bookmark
- audio-tilawat.svg — Audio / Tilawat
- home-mihrab.svg — Home
- search-star.svg — Search
- favorite-geometric.svg — Favorite / Like
- share-arch.svg — Share

## Integration gate
Backup → isolated preview → mobile/desktop check → user approval → runtime mode switch → live verification.

বর্তমানে এগুলো project asset হিসেবে রাখা হয়েছে; live Reader-এ automatically connected নয়।
