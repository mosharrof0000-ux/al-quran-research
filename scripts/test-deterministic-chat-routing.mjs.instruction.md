# Instruction — Deterministic Chat Routing Regression Test

## Identity
Path: scripts/test-deterministic-chat-routing.mjs
Class: B — Important test asset
Status: ACTIVE on isolated Gate 2 branch

## Purpose
Prove that the known Al-Fatiha 1:1 word-analysis prompt is routed to the deterministic verified-project-data handler before the AI Brain/Gemini route.

## Rules
1. Use only the fixed, non-secret test prompt and a clearly fake test-only API key.
2. Assert the exact provider identifier, Bengali language, verified Arabic fixture, and Bengali word-analysis fields.
3. Assert that deterministic routing performs no outbound fetch.
4. Keep a negative classification case so unrelated prompts are not classified as deterministic.
5. Do not call live services or require production secrets.
6. A passing unit test proves branch-local routing behavior only; it does not prove production deployment or live browser behavior.

## Run
`node scripts/test-deterministic-chat-routing.mjs`
