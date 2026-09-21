# Icon Mode Usage Record

Mode registry:
- normal-quran → assets/icon-modes/normal-v1/
- sufi-quran → reserved for a separate future icon family

Reader usage mapping:
- Home/navigation: home, quran
- Surah: surah
- Ayah: ayah
- Tafseer/knowledge: tafseer
- Save: bookmark
- Tilawat/audio: audio
- Search: search
- Favorite: favorite
- Share: share

Mode switching contract: the Reader should resolve the icon family from a mode registry rather than hard-code one icon directory. Normal Mode is stored now but is not automatically injected into the live Reader by this record.

Versioning: Normal Mode v1.0.0 is this set. Sufi Mode will have its own version series.
