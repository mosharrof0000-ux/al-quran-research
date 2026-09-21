# আল-কুরআন Icon Engine v1 — Isolated Integration Record

Status: ACTIVE — isolated implementation branch only
Branch: agent/icon-engine-v1-isolated
Master asset source: Library file "আল কোরআন প্রজেক্ট.zip"
Scope: Custom SVG icon system + dynamic icon engine
Production: NOT CONNECTED

## Safety boundary
- main, production Chat, Reader, API and database are not modified by this work.
- The Master ZIP remains the source archive and is not edited.
- Icon integration is additive; existing icon markup is not mass-replaced.
- Fonts are not installed globally in this phase.
- Promotion requires review, verification, backup and explicit user approval.

## Planned layers
1. Master Asset
2. Icon Registry
3. Dynamic Icon Engine
4. Isolated Demo
5. Header pilot
6. Reader pilot
7. Research pilot
8. Optional font registry
9. Theme/night integration

## First pilot
Only the 7 header roles are in scope:
Menu, Search, Logo/Brand, Theme, Notification, Profile, Research/Quran identity.

Acceptance checks:
- 30px header remains 30px.
- Mobile rendering is stable.
- Light/dark states remain readable.
- Icon size/stroke can be controlled without external icon libraries.
- No production Reader/Chat behavior changes.

## Continuity
Every future Icon Engine change must record:
- date and work ID
- source asset/version
- branch and commit
- files changed
- test result
- backup/rollback reference
- pending approval/deployment status

This document is the handoff anchor for a future AI/session.
