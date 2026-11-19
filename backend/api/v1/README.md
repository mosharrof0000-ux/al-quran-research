# Research API v1 — Powerful API Foundation

## Public contract
- GET /api/v1/status
- GET /api/v1/surah/{surah_number}
- GET /api/v1/ayah/{surah_number}/{ayah_number}
- GET /api/v1/word/{token_id}
- GET /api/v1/search?q={query}

## Layers
Client → Gateway → Version Router → Provider → Dataset/D1 → Response

The provider prefers D1 when env.DB exists and otherwise preserves the current master-dataset adapter. This keeps the existing contract stable during migration.

## Rules
- v1 remains backward compatible.
- Breaking changes require v2.
- Raw Qur'an text is read-only at this API layer.
- Dataset version and record status remain visible.
- AI output is never automatically verified.
- Secrets stay in Worker secrets/bindings.

## Scaling
D1 is the planned authoritative relational store. Cloudflare recommends accessing D1 through Worker bindings, and parameterized queries should be used for API inputs. Read-only responses can use explicit caching; cache is not authoritative persistence.
