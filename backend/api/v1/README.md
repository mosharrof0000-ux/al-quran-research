# API v1 Core

এই স্তরটি মূল Worker-এর উপর একটি versioned API contract তৈরি করে।

## Contract

- `GET /api/v1/health`
- `GET /api/v1/status`
- `GET /api/v1/surah/{surah}`
- `GET /api/v1/ayah/{surah}/{ayah}`
- `GET /api/v1/word/{token}`
- `GET /api/v1/search?q=...`
- `POST /api/v1/ai`

## নীতি

1. v1 contract স্থির থাকবে; breaking change হলে v2।
2. API layer data source থেকে আলাদা থাকবে।
3. Database সংযুক্ত না হওয়া পর্যন্ত endpoint নিজে থেকে fake data দেবে না।
4. Invalid input আগে reject হবে।
5. AI source-of-truth নয়; verified research context API/data layer থেকে আসবে।
6. Secrets frontend বা repository-তে থাকবে না।

## পরবর্তী সংযোগ

`Master Dataset → Repository Adapter → D1 Adapter → API v1 → Web/PWA/Android → AI`

D1 সংযোগ করার সময় Cloudflare Worker binding ব্যবহার করা হবে, REST API নয়; এতে Worker-এর ভিতরে অপ্রয়োজনীয় network hop এড়ানো যায়। 
