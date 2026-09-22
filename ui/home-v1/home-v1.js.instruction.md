# Instruction — Home v1 JavaScript

## Identity
Path: ui/home-v1/home-v1.js
Status: DRAFT — Smart Research Tools extension

## Purpose
Govern Reader/chat UI behavior.

## Allowed
- Implement local-only profile avatar selection, FileReader preview, LocalStorage persistence, save/remove behavior, and main-avatar rendering.
- Add Private Research source discovery/unlock calls.
- Add research routing metadata to chat requests where compatible.
- Preserve existing Reader/chat behavior.

## Forbidden
- Do not upload avatar data to a server or external service.
- Do not distort, stretch, or manually crop uploaded images.
- Storing private PIN persistently.
- Bundling private source text.
- Changing existing source data semantics without approval.

## Verification
Test existing chat, Reader, composer and new Private Research flow.

## Change history
- 2026-09-20 — Added for controlled extension.
