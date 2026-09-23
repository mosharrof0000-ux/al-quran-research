# Al-Quran Research — API Architecture v1

## Current state
- API Gateway: added in code
- Research API: existing v1 contract preserved
- Current source of truth: data/fatiha-master-v1.json
- D1 schema: prepared, not active
- Write API: intentionally disabled

## Layers
Client -> API Gateway -> Research Adapter -> Master Dataset

Future:
Client -> API Gateway -> D1 Adapter -> D1

AI:
Client -> API Gateway -> Verified Research Context -> AI

AI output is not automatically verified or written into the master dataset.

## Stability rules
1. /api/v1/ remains backward compatible.
2. Dataset version and API version remain independent.
3. Raw text is read-only.
4. D1 migration must preserve endpoint response contracts.
5. No secrets are stored in repository files.
6. New write operations require a separate authenticated contract and review.

## Next hardening
- Bind D1 only after database creation and migration validation.
- Add bounded pagination and validation to search.
- Add rate limiting/authentication for protected endpoints.
- Add automated endpoint smoke tests.
- Move production traffic to a Cloudflare Custom Domain when available.
