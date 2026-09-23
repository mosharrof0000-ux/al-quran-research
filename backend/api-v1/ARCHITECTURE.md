# Powerful API Architecture v1

Client layer:
Web / PWA / Android
        |
        v
Cloudflare Worker
        |
        v
/api/v1 Gateway
  |       |       |
  v       v       v
Qur'an  Research  AI
  |       |       |
  +-------+-------+
          |
       D1 / Master Dataset

## Security boundaries
- Public read endpoints are separated from future write/admin endpoints.
- Secrets remain Worker-side.
- Input is bounded before database/search work.
- API errors are normalized.
- CORS is restricted to the project origin.
- D1 queries must use prepared statements when the binding is enabled.
- Caching is allowed for immutable/read-only data; writes must invalidate relevant cache.

## Rollout stages
1. Foundation (this branch): gateway, validation, response layer, D1 schema.
2. Review: contract + tests + compare against existing Worker.
3. Integration: route gateway into existing Worker.
4. D1 migration: import verified dataset.
5. AI context service: API supplies verified records to AI.
6. Client migration: web/PWA/Android use the same API.
7. Production smoke test and rollback checkpoint.
