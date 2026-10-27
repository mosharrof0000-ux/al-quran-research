# শক্তিশালী API — Architecture v1

## উদ্দেশ্য
Website, PWA, Android এবং AI—সব client-এর জন্য একটি versioned API backbone।

## স্তর
1. Gateway — CORS ও common response policy
2. Version Router — /api/v1/*
3. Provider — D1 preferred; existing master JSON fallback
4. Research Data — Surah, Ayah, Token, Root, Morphology, Grammar, Source, Evidence
5. AI Context — verified context আলাদা; AI source-of-truth নয়
6. Future Auth — private write/admin routes আলাদা namespace
7. Observability — health/status/version

## Migration
বর্তমান pilot JSON এখনই বাদ দেওয়া হয়নি। D1 binding যোগ হলে provider layer ধাপে ধাপে relational data ব্যবহার করবে। Public endpoint contract একই রাখার লক্ষ্য।

## Cache
Read-only GET data cache করা যাবে। Private/user-specific এবং AI POST response cache করা যাবে না।

## Production
workers.dev compatibility endpoint হিসেবে থাকবে। Production API-এর জন্য পরবর্তীতে custom API domain ব্যবহার করা যাবে।
