# Al-Quran Research — D1 Database Layer

This directory defines the production database target for the Research API.

## Source of truth

- Canonical research schema: `database/schema.sql`
- Existing pilot seed: `database/pilot_fatiha_v0.1.sql`
- Versioned changes: `migrations/*.sql`
- Master dataset: `data/fatiha-master-v1.json`

## Runtime architecture

Website / Android / PWA
→ Cloudflare Worker
→ Research API v1
→ D1 binding (`env.DB`)
→ normalized research tables

During the transition, the API keeps a read-only GitHub master-dataset fallback when `env.DB` is not configured. This prevents a missing D1 binding from breaking the existing API.

## Safety

- API v1 is read-only.
- AI output is never automatically marked VERIFIED.
- Raw text is not overwritten.
- Corrections use proposals and version records.
- Dataset version and API version remain separate.

## Production activation

1. Create a Cloudflare D1 database.
2. Add its binding as `DB` to `backend/wrangler.jsonc`.
3. Apply the schema/migrations remotely with Wrangler.
4. Load the pilot seed.
5. Run API smoke tests.
6. Only then switch the production API to D1-first mode.

Cloudflare recommends using D1 bindings and versioned migrations for Worker applications.
