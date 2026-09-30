# Icon Mode Registry

**Recorded:** 2026-09-21

## Normal Quran Mode
- ID: `normal-quran`
- Assets: `assets/icons/modes/normal-quran-v1/`
- Purpose: default Quran reading interface.
- Visual language: monochrome, thin-line, Quranic/Islamic geometry.

### Reader mapping
- Quran: `quran-main.svg`
- Surah: `surah-mihrab.svg`
- Ayah: `ayah-rub-el-hizb.svg`
- Tafseer/knowledge: `tafsir-knowledge.svg`
- Bookmark: `bookmark-minaret.svg`
- Audio/Tilawat: `audio-tilawat.svg`
- Home: `home-mihrab.svg`
- Search: `search-star.svg`
- Favorite: `favorite-geometric.svg`
- Share: `share-arch.svg`

## Sufi Mode
- ID reserved: `sufi`
- Asset namespace reserved: `assets/icons/modes/sufi-v1/`
- Status: NOT CREATED YET.
- Rule: Sufi Mode gets a separate visual set; it must not overwrite Normal Quran Mode assets.

## Mode behavior
Mode switching changes only the visual/icon layer. Quran text, pronunciation, translation, source provenance, research records, and database content remain unchanged.

## Safety
These assets are stored but are **not connected to the live Reader yet**. Integration requires a separate backup, isolated demo, review, approval, and deployment verification.
