# API Architecture v1

## লক্ষ্য
Website, PWA, Android এবং AI-এর জন্য একটি স্থির API backbone তৈরি করা; বর্তমান Research API ও AI logic না ভেঙে ধাপে ধাপে database-backed করা।

## Layers
Client → API Gateway → Research/Data Layer → AI Context Layer → D1

## Stable contract
/api/v1/health
/api/v1/status
/api/v1/surah/{surah_number}
/api/v1/ayah/{surah_number}/{ayah_number}
/api/v1/word/{token_id}
/api/v1/search?q={query}

## Rules
- v1 contract breaking change করা যাবে না; breaking change হলে v2।
- raw source data overwrite নয়।
- dataset version এবং API version আলাদা।
- AI source of truth নয়।
- verified context ছাড়া নির্দিষ্ট গবেষণা-দাবি করা যাবে না।
- D1 migration আগে schema/validation, পরে data migration।
- secrets repository-তে নয়।

## Rollout
1. Gateway + contract tests
2. D1 binding/schema
3. Fatiha pilot migration
4. read-path validation
5. website/Android connection
6. production deployment

## Rollback
বর্তমান Worker entry ও JSON adapter অক্ষত থাকবে যতক্ষণ না নতুন gateway সব smoke test PASS করে।
