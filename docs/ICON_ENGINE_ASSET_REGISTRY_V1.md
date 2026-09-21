# Icon Engine Asset Registry v1

## Master source
Library archive: "আল কোরআন প্রজেক্ট.zip"

## Packages identified
- al_quran_icon_system_v1.0.zip
- al_quran_dynamic_icon_engine_v1.0.zip

## Exact verified engine
- Source: al_quran_dynamic_icon_engine_v1.0.zip
- File: engine/aqr-icon-engine.js
- Imported to: assets/icon-engine/aqr-icon-engine.js
- Size: 5,977 bytes
- Syntax validation: PASS
- External dependencies: none

## Icon coverage
The Master engine contains the complete icon set across prayer, Quran, research, documents, status, time, user/system and technology categories.

## Header mapping
- Quran/brand: quran
- Theme: settings
- Profile: user
- Menu/Search/Notification: no exact matching IDs in the Master manifest; existing native controls are preserved rather than replaced with invented icons.

## Asset rule
Do not invent replacement icons when a Master asset exists. If an asset cannot be imported exactly, record it as OPEN/PENDING rather than silently substituting another library.
