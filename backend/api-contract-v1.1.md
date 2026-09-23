# Al-Quran Research API v1.1

## Read-only endpoints

- GET /api/v1/status
- GET /api/v1/surah/{surah}
- GET /api/v1/ayah/{surah}/{ayah}
- GET /api/v1/word/{token_id}
- GET /api/v1/search?q={query}

## Response rules

Every successful response is JSON and identifies the relevant dataset/schema version where available.

Research records preserve:
- source/provenance
- text status
- analysis status
- certainty
- disputed/pending states

## Data source priority

1. D1 (`env.DB`) when configured.
2. Read-only master JSON fallback when D1 is unavailable.

The fallback is transitional, not the long-term scaling layer.

## Versioning

API contract changes are backward-compatible within v1.
Breaking changes require v2.
Dataset releases are versioned independently.

## Security

- No secrets are stored in API responses.
- Writes are not exposed by v1.
- SQL uses prepared statements/bind parameters.
- Browser CORS is applied by the outer Worker wrapper.
