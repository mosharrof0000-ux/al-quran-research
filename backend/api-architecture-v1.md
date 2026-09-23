# আল-কুরআন রিসার্চ — API Architecture v1

## লক্ষ্য
Website, PWA, Android এবং AI-এর জন্য একটি versioned central API layer।

## Flow
Client → API Gateway → Domain API → Verified Dataset / D1 → AI Context

## Layers
1. Gateway: routing, CORS, method checks, common response headers.
2. Research API: read-only Qur'an/research records.
3. Data layer: বর্তমান master JSON adapter; পরবর্তী ধাপে D1 binding.
4. AI layer: verified context নিয়ে AI; AI source-of-truth নয়.
5. Private/admin layer: public read API থেকে আলাদা.

## Public v1
- GET /api/v1/health
- GET /api/v1/routes
- GET /api/v1/status
- GET /api/v1/surah/{surah_number}
- GET /api/v1/ayah/{surah_number}/{ayah_number}
- GET /api/v1/word/{token_id}
- GET /api/v1/search?q={query}

## Planned
- GET /api/v1/research/{research_id}
- POST /api/v1/ai
- D1-backed indexed search
- authentication/rate limiting for protected endpoints

## Data integrity
Raw source records are immutable. Derived fields require dataset/version metadata. AI output is never automatically marked VERIFIED.

## Migration rule
The existing v1 contract remains stable while the backing store moves from GitHub JSON to D1. Cloudflare recommends using Worker bindings for D1 rather than making REST calls from the Worker. citeturn0search0turn0search5
