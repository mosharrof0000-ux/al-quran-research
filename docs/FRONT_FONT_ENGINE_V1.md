# Al-Quran Research — Front Font & Text Engine v1

Status: ISOLATED DEMO — not merged to main.

## Source of truth
Master instruction: `front/font.txt` from the project ZIP supplied for project storage.

The instruction defines a Dynamic Typography & Visual Presentation Engine covering Font, Style, Size, Weight, Layout, Color, Highlight, Card/Panel, Animation and future Visual/AI extensions.

## Safety
- Presentation layer only.
- Must not modify Quran Arabic text, harakat/Unicode, ayah numbers, translation, tafsir, research/database data or existing logic.
- AI may produce a design instruction; the engine executes only approved registry values.
- Feature flags and rollback are mandatory.
- New assets must be versioned and registry-listed.

## v1 modules
- Font Registry
- Typography controls
- Language-aware typography hooks
- Color tokens
- Theme-ready tokens
- Animation registry
- Reduced-motion/accessibility guard
- Future-compatible metadata hooks

## Initial animation registry
fade-in, slide-in, typewriter, word-reveal, highlight, pulse, soft-glow, scale-in.

## Future extension points
Font Loader, Color Engine, Theme Registry, Layout Registry, Unit Registry, Design Decision Layer, Voice Registry, Motion Registry, Accessibility Registry, Language Registry and AI Style Registry.

## Integration gate
Demo -> font testing -> user approval -> backup -> non-destructive integration -> full test -> live deployment -> live verification.

No production integration is authorized by this file alone.
