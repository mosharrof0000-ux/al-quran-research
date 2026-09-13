# Design Notes — Home v1

## Reference

Source: user-supplied Home Screen mockup in the current conversation.

## Visual rules

1. Mobile-first composition inside a dark atmospheric shell.
2. Header uses the Al-Quran Research identity with a custom inline SVG mark; no third-party brand icon set is required.
3. Rounded glass-like cards and pills use restrained borders and soft glow.
4. Primary accent is luminous green/cyan; research categories use distinct secondary tones.
5. The assistant area is the visual focal point and includes a custom CSS robot illustration.
6. Example questions are full-width tappable cards.
7. The lower quote area acts as an atmospheric Quran context panel.
8. Composer is a prominent rounded input with attach, voice and send controls.
9. Bottom navigation contains six project-specific destinations.
10. Layout collapses cleanly for small screens.

## Interaction rules

- Menu opens a left research drawer.
- Research mode chips switch active state.
- Example questions populate the composer.
- Voice button uses browser speech recognition when available.
- Send opens the existing Dynamic Reader route with the question as context.
- Bottom navigation and top controls provide immediate feedback.

## Branding rule

Icons are intentionally rendered with text/CSS/SVG primitives in this prototype so the UI does not depend on a third-party icon brand. Future icon assets should live under a dedicated project brand folder and follow one consistent geometry.
