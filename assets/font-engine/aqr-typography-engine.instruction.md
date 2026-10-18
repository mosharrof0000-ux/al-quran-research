# Typography Engine Instruction

- Path: `assets/font-engine/aqr-typography-engine.js`
- Purpose: isolated runtime for typography settings and text presentation animation.
- Scope: DOM presentation only.
- Allowed: typography variables, generic language/script/direction/font metadata hooks, approved animation classes, accessibility guards.
- Forbidden: Quran/data/research mutation, API writes, silent content rewriting.
- Verification: JavaScript syntax check, metadata-hook smoke test, and presentation smoke test.
- Update trigger: engine behavior or API changes.
- Status: ACTIVE in isolated Front Font Engine v1.
