# Al-Quran Research API v1 — Architecture

Purpose: a stable API layer between the web/PWA/Android clients, the verified Qur'an dataset, research records, and AI.

Flow:
Client → API Gateway → validated route → data/research layer → response

AI flow:
Client → API → verified context → AI → source-aware response

Modules:
- gateway.js — versioned route dispatcher
- response.js — consistent JSON/error/CORS responses
- validation.js — bounded path/query validation
- health.js — API health/status
- quran.js — read-only Qur'an data adapter
- research.js — research record adapter
- search.js — search adapter
- ai.js — future AI service boundary
- schema.sql — D1-ready relational schema
- contract.md — public API contract

Migration rule:
The existing Worker remains the production entry point until this architecture passes review and smoke tests. No existing live route is replaced by this directory alone.
