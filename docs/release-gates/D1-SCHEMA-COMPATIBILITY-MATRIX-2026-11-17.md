# D1 Schema Compatibility Matrix — 2026-11-17

**Status:** READ-ONLY ANALYSIS — NO SCHEMA CHANGE OR MIGRATION APPLIED  
**Baseline:** `main` at `0c3520305b43bda0b9dc862561c9081285ded310`  
**Working branch:** `fix/gate2-deterministic-chat-route-20261117`

## 1. Evidence reviewed

- Root `schema.sql` (303 lines; Master Database Schema v1.0).
- `database/schema.sql` (55 lines).
- `migrations/001_core_schema.sql`.
- `migrations/002_workspace_versioning.sql`.
- `migrations/003_api_hardening.sql`.
- `backend/research-api.js`.
- `backend/wrangler.jsonc`.
- `README.md` and `PROJECT_STATE.md`.

## 2. Table inventory comparison

| Domain | Root `schema.sql` | D1 `database/schema.sql` / migrations | Compatibility |
|---|---|---|---|
| Project metadata | `project_meta`, `schema_migrations` | `schema_migrations` | Partial; metadata shape differs |
| Surah | `surah` | `surah` | Same concept, different columns |
| Ayah | `ayah` | `ayah` | Same concept, different version/status fields |
| Token | `token` | `token` | Same concept, different surface/normalized fields |
| Root / lemma | `root`, `lemma` | `root`, `lexeme`, `token_lexeme` | Incompatible naming and relation model |
| Morphology | `morphology`, `grammar_annotation` | `morphology` | Partial; grammar annotation absent as a separate table |
| Syntax | `syntax_relation` | No matching core table | Not represented directly |
| Meaning / translation | `meaning`, `translation_edition`, `translation` | `translation_candidate`, `translation_decision` | Different model; requires mapping |
| Evidence | `evidence_source`, `evidence_link` | `source`, `source_version`, `evidence` | Related concepts, different normalization |
| Claims / analysis | `research_claim`, `analysis_variant` | `claim`, `claim_evidence`, `finding`, `review` | Partial; semantics differ |
| Metrics | `metric_definition`, `metric_run` | `formula`, `metric`, `calculation_run` | Related but not column-compatible |
| Audit / versioning | `change_log`, `sync_state` | `audit_log`, workspace version tables in migration 002 | Different model |
| Concepts / extensions | `concept`, `concept_relation`, `extension_registry`, `external_resource` | No direct equivalent in the current D1 core | Not represented directly |
| Dataset/API release | `data_release` | `dataset_release`, `api_schema_version` via migration 003 | Similar purpose, different names/shape |

## 3. D1 runtime query contract

The current `backend/research-api.js` requires the following D1 structures:

| Table | Required columns observed in API queries | Created by |
|---|---|---|
| `surah` | `surah_id, surah_number, name_ar, name_transliteration, status, version` | Migration 001 |
| `ayah` | `ayah_id, surah_id, ayah_number, arabic_text, text_version, status` | Migration 001 |
| `token` | `token_id, ayah_id, position, surface_form, normalized_form, status` | Migration 001 |
| `root` | `root_id, root_form, root_system, status, version` | Migration 001 |
| `lexeme` | `lexeme_id, lemma, root_id, status, version` | Migration 001 |
| `token_lexeme` | `token_id, lexeme_id, version` | Migration 001 |
| `morphology` | `morphology_id, token_id, part_of_speech, features_json, source_id, source_version_id, status, version` | Migration 001 |
| `pronunciation` | `pronunciation_id, token_id, language_code, pronunciation, system, source_id, version, status` | Migration 001 |
| `dataset_release` | `dataset_version, schema_version, status, source_file, released_at` | Migration 003 |
| `api_schema_version` | `api_version, schema_version, status, released_at` | Migration 003 |

Migration 002 adds `workspace`, `workspace_member`, `workspace_setting`, `correction_proposal`, and `workspace_entity_version`.

## 4. Important mismatches

1. Root schema calls the lemma entity `lemma`; the D1 API uses `lexeme`.
2. Root token fields include `arabic`, `normalized_arabic`, and `bengali_pronunciation`; D1 separates pronunciation into a versioned `pronunciation` table.
3. Root root fields are `root_ar/root_bn`; D1 expects `root_form/root_system`.
4. Root schema contains `grammar_annotation` and `syntax_relation`; the current D1 core does not.
5. Translation, evidence, claims, and metrics use different table names and relationship structures.
6. Root `data_release` is not the same SQL contract as migration 003's `dataset_release` and `api_schema_version`.

These are structural differences, not merely formatting differences. A blind copy, rename, or concatenation would risk data loss or runtime query failures.

## 5. Observed canonical direction (not yet an owner decision)

The evidence indicates that the *current D1 runtime path* is built around:
`database/schema.sql → migrations/001_core_schema.sql → migrations/002_workspace_versioning.sql → migrations/003_api_hardening.sql → backend/research-api.js`.

Reasons:
- Migration 001 explicitly states it replays `database/schema.sql`.
- Migration 003 creates the release/version tables queried by the API.
- The API's column/table queries match the newer D1 schema family.

The root `schema.sql` remains a separate broader/older research schema. This report does **not** declare it obsolete or authorize its deletion. The project owner must decide whether it is retained as a conceptual master schema, migrated into the D1 model, or formally retired after compatibility planning.

## 6. Safe recommendation

1. Treat the migration/API chain above as the current D1 execution contract only.
2. Keep root `schema.sql` preserved and do not overwrite it.
3. Create a versioned entity/column mapping before any migration between schema families.
4. Add explicit handling for root-only entities such as grammar annotations, syntax relations, meanings, concept graph, and extension records before claiming feature parity.
5. Validate the complete migration chain in a disposable local/test database before any remote D1 operation.
6. Confirm the real D1 binding and dataset state before considering a production cutover.
7. Keep the live API on its existing GitHub JSON fallback until D1 schema and data are independently validated.

## 7. Exit status

- Schema divergence identified: PASS.
- Current D1 API table/column requirements inventoried: PASS.
- Migration chain aligned with D1 API identified: PASS.
- Canonical project-wide schema decision: PENDING.
- Entity/data migration mapping: PENDING.
- Disposable database migration test: PENDING.
- Production D1 activation: NOT AUTHORIZED / NOT PERFORMED.

No SQL file, migration, D1 resource, dataset, or production setting was changed.
