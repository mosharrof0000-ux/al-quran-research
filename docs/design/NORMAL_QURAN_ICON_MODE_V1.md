# Normal Quran Mode Icon Registry

mode: normal-quran
version: 1.0.0
asset_root: assets/icons/modes/normal-quran-v1/

| UI role | icon id | asset |
|---|---|---|
| Quran | quran | quran.svg |
| Surah | surah | surah.svg |
| Ayah | ayah | ayah.svg |
| Tafseer/Knowledge | tafseer | tafseer.svg |
| Bookmark | bookmark | bookmark.svg |
| Tilawat/Audio | audio | audio.svg |
| Home | home | home.svg |
| Search | search | search.svg |
| Favorite | favorite | favorite.svg |
| Share | share | share.svg |

## Mode contract
- Normal Quran Reader uses this registry.
- Sufi Reader uses a separate registry and assets.
- No mode may mutate another mode's SVG files.
- All assets inherit currentColor.
- Default SVG viewBox is 0 0 64 64.
