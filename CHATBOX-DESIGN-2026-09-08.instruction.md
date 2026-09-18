# Instruction — CHATBOX-DESIGN-2026-09-08.md

- Instruction ID: `INST-CHATBOX-DESIGN`
- Class: B — Important
- Status: ACTIVE

## Purpose
Protect the recorded chatbox design decisions, visual language, and compatibility constraints.

## Current approved design direction
The live home/chat entry interface is intentionally minimal and ChatGPT-like in structure: a compact top bar with sidebar/menu access and a simple question composer at the bottom. Unnecessary cards, banners, large decorative sections, and busy controls are not part of the approved minimal direction.

## Rules
1. Treat the recorded safe commit and backup as historical evidence, not as permission to alter files.
2. Preserve project functionality and readability while the visual language may be superseded by an explicitly approved minimal design.
3. Preserve AI Worker endpoint, Bengali voice input, speech output, responsive behavior, and research navigation unless explicitly changed and verified.
4. UI refinement must not silently alter Quran research data or backend contracts.
5. Any live UI change requires backup, targeted diff review, and live-path verification.
6. The minimal UI must retain a clear path to the research/question workflow and must not remove the underlying research capabilities.
7. Do not add decorative UI, cards, banners, or large navigation groups unless the user explicitly requests them.
8. The daytime ambient background may use the approved 16-color soft palette with a continuous, very slow cycle of 16 minutes (at least 1 minute per color step); keep the minimal ChatGPT-like layout, readability, and reduced-motion accessibility intact.

## Verification
Check affected UI files, endpoint references, interaction behavior, responsive behavior, question submission flow, voice input, drawer/menu behavior, and unrelated-file diff scope.

## Update triggers
Update when the approved chatbox design, compatibility requirements, or protected UI behavior changes.
