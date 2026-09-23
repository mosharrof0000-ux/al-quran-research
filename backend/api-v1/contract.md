# API v1 Contract — Foundation

## Read endpoints
- GET /api/v1/health
- GET /api/v1/status
- GET /api/v1/ayah/{surah}/{ayah}

## Reserved modules
- /surah/{surah}
- /word/{token_id}
- /search?q=
- /research/{record_id}
- /ai

## Rules
1. v1 remains backward-compatible.
2. Dataset version is separate from API version.
3. Raw/source data is never silently overwritten.
4. AI is not the source of truth.
5. Unknown data returns an explicit not-found/pending state.
6. Mutating endpoints are disabled in this foundation.
7. Authentication can be added to future write/admin routes without exposing secrets to clients.
