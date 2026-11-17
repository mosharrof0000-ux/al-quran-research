# Instruction — Pinned Private Research UI Browser Fixture

## Identity
Path: scripts/fixtures/private-research-ui-core.js
Status: ACTIVE — deterministic fixture for the pinned home-v1 core

## Purpose
Provide the exact home-v1 core source referenced by the UI loader so the Playwright test can exercise the real composer and Private Research interaction without depending on CDN availability.

## Rules
- Keep this fixture synchronized only with the exact commit SHA pinned by the production loader.
- Do not add real source text, credentials, PINs, session tokens, or private data.
- Do not use this fixture as a production bundle or publish it as a new runtime entry point.
- Update the fixture and its test only when the loader's pinned core SHA intentionally changes.

## Verification
The Playwright browser test routes the pinned CDN URL to this fixture and exercises the real iframe controls.
