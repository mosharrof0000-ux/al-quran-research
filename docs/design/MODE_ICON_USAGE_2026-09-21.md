# Mode-Aware Icon Usage — 2026-09-21

## Reference
The generated icon-sheet is the visual reference for the Normal Qur'an Reading Mode icon family.

Reference record:
docs/design/MODE_ICON_DESIGN_REFERENCE_2026-09-21.md
Reference SHA-256:
170c83ecf42c84ca4c09686fccb32311c2272fe2d15dd4eb4b9be6ebce14c4d1

## Normal Qur'an mode
Use assets/icons/modes/normal-v1/ for ordinary Qur'an reading:
quran -> Reader/source
surah -> Surah selector
ayah -> Ayah marker/reference
tafseer -> Knowledge/Tafseer
bookmark -> Save/bookmark
audio-tilawat -> Tilawat/audio
home -> Reader/home navigation
search -> Qur'an search
favorite -> Favorite
share -> Share

## Sufi mode
Sufi mode will receive a separate visual family. Normal-mode assets must remain unchanged. Runtime mode selection should switch the asset family rather than edit SVGs.

## Production rule
This release stores the icon assets and usage contract. It does not claim live UI integration. Production connection must follow:
Backup -> Design -> Review -> Approve -> Integrate -> Verify -> Live.
