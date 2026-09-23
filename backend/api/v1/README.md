# API v1 Core

এই স্তরটি মূল Worker-এর উপর একটি versioned API contract তৈরি করে।

## বর্তমান router

- `backend/api-v1-router.js` — কেন্দ্রীয় v1 router
- `backend/api-v1-response.js` — response/security headers
- `backend/research-api.js` — বর্তমান read-only master-dataset adapter
- `backend/api/schema.sql` — ভবিষ্যৎ D1 foundation schema

## Contract

- `GET /api/v1`
- `GET /api/v1/health`
- `GET /api/v1/status`
- `GET /api/v1/surah/{surah}`
- `GET /api/v1/ayah/{surah}/{ayah}`
- `GET /api/v1/word/{token}`
- `GET /api/v1/search?q=...`

## নীতি

1. v1 contract স্থির থাকবে; breaking change হলে v2।
2. API layer data source থেকে আলাদা থাকবে।
3. Database সংযুক্ত না হওয়া পর্যন্ত endpoint fake data দেবে না।
4. Invalid input আগে reject হবে।
5. AI source-of-truth নয়; verified research context data layer থেকে আসবে।
6. Secrets frontend বা repository-তে থাকবে না।
7. Raw Qur'an text overwrite করা যাবে না; derived research data versioned হবে।

## Data migration

`Master Dataset → JSON Adapter → D1 Adapter → API v1 → Web/PWA/Android → AI`

D1 সংযোগের সময় Cloudflare Worker binding ব্যবহার করা হবে। Cloudflare-এর বর্তমান guidance অনুযায়ী Worker-এর ভিতরে bindings ব্যবহার করলে অপ্রয়োজনীয় REST network hop ও অতিরিক্ত authentication এড়ানো যায়।

D1 production binding না পাওয়া পর্যন্ত বর্তমান JSON adapter-ই source থাকবে; API contract বদলানো হবে না।
