# আল-কুরআন রিসার্চ — API Architecture v1

## লক্ষ্য
Website, PWA, Android এবং AI-এর জন্য একটি একক versioned API layer।

## স্থাপত্য
User → API Gateway → Research/Data Layer → AI Context Layer

- /api/v1/health — runtime health
- /api/v1/status — dataset/schema status (existing Research API contract)
- /api/v1/capabilities — available API layers
- /api/v1/surah/{n} — surah record
- /api/v1/ayah/{s}/{a} — ayah record
- /api/v1/word/{token_id} — token record
- /api/v1/search?q= — read-only search

## Data source transition
বর্তমান: GitHub master JSON adapter → Research API.
পরবর্তী: Cloudflare D1 binding → একই endpoint contract.

D1 migration করলে endpoint contract অপরিবর্তিত রাখার লক্ষ্য থাকবে। Cloudflare-এর বর্তমান নির্দেশনাতেও Worker-এর ভিতরে D1 binding ব্যবহারকে সরাসরি REST API call-এর চেয়ে উপযোগী বলা হয়েছে।

## Security
- Browser থেকে কোনো Gemini/Cloudflare secret নয়।
- Read API এবং write/research-record gate আলাদা।
- Parameter validation বাধ্যতামূলক।
- API v1 breaking change করবে না; breaking হলে v2।
- Production API-এর জন্য পরে custom domain ব্যবহার করা যাবে।

## Migration gate
D1 database ID/binding নিশ্চিত না হওয়া পর্যন্ত production D1 binding যোগ করা হবে না।
backend/db/schema-v1.sql শুধু approved migration schema।

## Rollback
এই architecture layer existing Research API endpoint-এর response contract পরিবর্তন করে না।
api-v1-router.js শুধু নতুন control-plane endpoint যোগ করে।
বর্তমান entrypoint-এর backup আগে থেকেই branch-এ রাখা হয়েছে।
