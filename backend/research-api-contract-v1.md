# Research API Contract v1.0

## উদ্দেশ্য
Master Dataset-কে বর্তমান Website UI ও ভবিষ্যতের AI গবেষণা স্তরের জন্য একটি স্থির, read-only API contract হিসেবে প্রকাশ করা।

## Data flow

`Master Dataset → Research API → Website Research UI`

AI চ্যাটের ক্ষেত্রে:

`Master Dataset → Research API/Verified Context → AI`

AI নিজে source of truth নয়।

## Endpoints

### 1. Status
`GET /api/v1/status`

Dataset ও schema version জানায়।

### 2. Surah
`GET /api/v1/surah/{surah_number}`

নির্দিষ্ট সূরার master record ফেরত দেয়।

### 3. Ayah
`GET /api/v1/ayah/{surah_number}/{ayah_number}`

নির্দিষ্ট আয়াতের Arabic text, analysis status এবং normalized research data ফেরত দেয়।

### 4. Word / Token
`GET /api/v1/word/{token_id}`

একটি token-এর pronunciation, root, morphology, grammar, meaning ও certainty স্তর ফেরত দেয়।

### 5. Search
`GET /api/v1/search?q={query}`

বর্তমান master dataset-এর মধ্যে read-only search। ভবিষ্যতে indexed search engine/D1 FTS দিয়ে প্রতিস্থাপনযোগ্য।

## Versioning rule

- `/api/v1/` contract স্থির থাকবে।
- নতুন field যোগ করা যাবে backward-compatible ভাবে।
- breaking change হলে `/api/v2/` তৈরি হবে।
- dataset version আলাদা থাকবে; API version-এর সঙ্গে এক করে ফেলা হবে না।

## বর্তমান Pilot

বর্তমানে `data/fatiha-master-v1.json` হলো pilot master dataset। সূরা ফাতিহার ১ নম্বর আয়াত normalized research data সহ আছে; ২–৭ নম্বর আয়াতের Arabic text আছে কিন্তু analysis pending।

## ভবিষ্যৎ D1 migration

বর্তমান adapter GitHub-এর master JSON snapshot থেকে data পড়ে। Relational scale বাড়লে একই endpoint contract রেখে Cloudflare D1-তে `schema.sql` migrate করা যাবে। তখন Website-এর API URL ও response contract অপরিবর্তিত রাখার লক্ষ্য থাকবে।

## নিরাপত্তা নীতি

- এই API read-only।
- কোনো API key এখানে রাখা যাবে না।
- Raw research data overwrite করা যাবে না।
- AI-generated analysis automatically verified করা যাবে না।
- uncertainty/certainty status response-এ সংরক্ষিত থাকবে।
