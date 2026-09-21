# Icon Engine Asset Registry v1

## Master source
Library archive: "আল কোরআন প্রজেক্ট.zip"

## Packages identified
- al_quran_icon_system_v1.0.zip
- al_quran_dynamic_icon_engine_v1.0.zip

## Expected engine components
- icon-manifest.json
- engine/aqr-icon-engine.js
- icons/ — SVG icon collection
- docs/usage.html
- engine-demo.html

## Expected icon system
Custom SVG icon collection organized by functional categories. The dynamic engine must resolve an icon by stable name and allow runtime size/color/stroke control.

## Asset rule
Do not invent replacement icons when a Master asset exists. If an asset cannot be imported exactly, record it as OPEN/PENDING rather than silently substituting another library.

## Future registry fields
name | category | source path | theme compatibility | default size | default stroke | status | verification
