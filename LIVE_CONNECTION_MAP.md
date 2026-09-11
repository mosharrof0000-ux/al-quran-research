# Live Connection Map — Canonical Production Path

## Status
ACTIVE — Canonical production reference

## Purpose
Record the actual production path used by the live Qur’an Research chat so future connection failures can be diagnosed from the same known path instead of guessing or switching branches blindly.

## Canonical live path
`GitHub Pages live site → index.html → chatbox-v28-live.html → Cloudflare Worker → backend/cors-entry.js → backend/worker-entry.js → Research API / Gemini / Cloudflare AI recovery`

## 1. Public entry
Live site:
`https://mosharroff0000-ux.github.io/al-quran-research/`

Current `main` commit at documentation time:
`2bb6a0b2a577c23ea5ece34616536b0f767692e6`

`index.html` loads `chatbox-v28-live.html` in iframe with cache-busting query `v=20260911-research-id-v1`.

## 2. Chat UI
File:
`chatbox-v28-live.html`

The UI contains two Worker endpoints and tries them in order:
1. `https://al-quran-research.mosharroff0000.workers.dev/`
2. `https://al-quran-research.mosharrof0000.workers.dev/`

The first successful endpoint is used. This fallback is part of the live UI and must not be removed without an approved replacement.

## 3. Cloudflare Worker deployment
Configuration:
`backend/wrangler.jsonc`

Worker name:
`al-quran-research`

Worker entry:
`backend/cors-entry.js`

Gemini model variable currently declared in Wrangler config:
`gemini-3.6-flash`

## 4. Worker execution chain
`backend/cors-entry.js`
→ `backend/worker-entry.js`

`cors-entry.js` provides the CORS safety wrapper and forwards requests to the Worker entry.

`worker-entry.js` routes requests through:
1. diagnostic endpoints;
2. Research API;
3. direct Gemini chat;
4. existing Worker logic;
5. Cloudflare/AI recovery path when the primary Worker response fails.

## 5. Research-ID path
For a canonical ID such as `S001-A001`:
`Live chat → Research ID parser → Worker GET /api/v1/ayah/1/1 → Research API → canonical record → UI`

Research-ID success must be based on an actual returned record, not merely a successful page load or AI response.

## 6. Automatic deployment
`.github/workflows/deploy-worker.yml` deploys the Worker when `main` changes under `backend/**` or the deployment workflow itself.

The workflow also smoke-tests:
- `/diagnostic`
- CORS preflight
- real POST chat path

## 7. Future troubleshooting rule
When live chat fails, diagnose in this order:
1. GitHub Pages entry (`index.html`)
2. iframe target (`chatbox-v28-live.html`)
3. Worker endpoint order/fallback
4. Worker reachability and `/diagnostic`
5. CORS
6. `backend/wrangler.jsonc`
7. `backend/cors-entry.js`
8. `backend/worker-entry.js`
9. Gemini/API credentials and model availability
10. recovery path

Do not start by changing branches or redesigning the chat UI. First identify which link in this canonical chain failed.

## 8. Evidence rule
Every future connection fix should record:
- failing layer;
- observed error;
- root cause;
- exact file/path changed;
- verification performed;
- resulting production commit/version.

This document is a diagnostic map, not a replacement for the project’s Master Instruction, backend instructions, or continuity protocols.
