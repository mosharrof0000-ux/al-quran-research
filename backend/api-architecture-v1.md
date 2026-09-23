# আল-কুরআন রিসার্চ — API Core Architecture v1

Website, PWA, Android এবং ভবিষ্যৎ AI research clients-এর জন্য কেন্দ্রীয় versioned API layer।

Client → API v1 Router → Data Adapter → Master Dataset / D1 → Verified Research Context → AI

বর্তমান API read-only। Fatiha master dataset adapter অক্ষত থাকবে। D1 binding যুক্ত হলে data adapter ধাপে ধাপে D1-তে যাবে, কিন্তু /api/v1/ public contract অপরিবর্তিত রাখার লক্ষ্য থাকবে।

Core endpoints:
- GET /api/v1
- GET /api/v1/health
- GET /api/v1/status
- GET /api/v1/surah/{surah_number}
- GET /api/v1/ayah/{surah_number}/{ayah_number}
- GET /api/v1/word/{token_id}
- GET /api/v1/search?q={query}

Security: read-only public research surface, CORS allow-list, nosniff header, no secrets in repository, parameterized D1 queries.

Migration phases: JSON adapter → D1 read adapter → indexed search → versioned research records/audit trail → separate authenticated write/approval surface.

Raw Qur'an text overwrite নয়। Derived research data versioned হবে। AI output automatically verified নয়।