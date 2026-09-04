PRAGMA foreign_keys = ON;

-- Master Database Schema v1.0
-- SQLite-compatible. Core data is normalized; optional future modules extend it.

CREATE TABLE IF NOT EXISTS project_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS schema_migrations (
  version TEXT PRIMARY KEY,
  applied_at TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS surah (
  surah_id TEXT PRIMARY KEY,
  surah_number INTEGER NOT NULL UNIQUE,
  name_ar TEXT NOT NULL,
  name_transliteration TEXT,
  name_bn TEXT,
  ayah_count INTEGER,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  version INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS ayah (
  ayah_id TEXT PRIMARY KEY,
  surah_id TEXT NOT NULL,
  ayah_number INTEGER NOT NULL,
  arabic_text TEXT NOT NULL,
  text_normalized TEXT,
  text_hash TEXT,
  text_status TEXT NOT NULL DEFAULT 'PENDING',
  version INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY(surah_id) REFERENCES surah(surah_id),
  UNIQUE(surah_id, ayah_number)
);

CREATE TABLE IF NOT EXISTS token (
  token_id TEXT PRIMARY KEY,
  ayah_id TEXT NOT NULL,
  position INTEGER NOT NULL,
  arabic TEXT NOT NULL,
  normalized_arabic TEXT,
  bengali_pronunciation TEXT,
  lemma_id TEXT,
  root_id TEXT,
  morphology_id TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING',
  version INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY(ayah_id) REFERENCES ayah(ayah_id),
  UNIQUE(ayah_id, position)
);

CREATE TABLE IF NOT EXISTS root (
  root_id TEXT PRIMARY KEY,
  root_ar TEXT,
  root_bn TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING',
  note TEXT,
  version INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS lemma (
  lemma_id TEXT PRIMARY KEY,
  lemma_ar TEXT NOT NULL,
  lemma_bn TEXT,
  root_id TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING',
  version INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY(root_id) REFERENCES root(root_id)
);

CREATE TABLE IF NOT EXISTS morphology (
  morphology_id TEXT PRIMARY KEY,
  token_id TEXT NOT NULL,
  part_of_speech TEXT,
  pattern_ar TEXT,
  features_json TEXT,
  analysis_text_bn TEXT,
  certainty TEXT NOT NULL DEFAULT 'UNRESOLVED',
  version INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY(token_id) REFERENCES token(token_id)
);

CREATE TABLE IF NOT EXISTS grammar_annotation (
  grammar_id TEXT PRIMARY KEY,
  token_id TEXT NOT NULL,
  role_text TEXT,
  case_text TEXT,
  relation_text TEXT,
  analysis_text_bn TEXT,
  certainty TEXT NOT NULL DEFAULT 'UNRESOLVED',
  version INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY(token_id) REFERENCES token(token_id)
);

CREATE TABLE IF NOT EXISTS syntax_relation (
  relation_id TEXT PRIMARY KEY,
  ayah_id TEXT NOT NULL,
  head_token_id TEXT NOT NULL,
  dependent_token_id TEXT NOT NULL,
  relation_label TEXT NOT NULL,
  source_evidence_id TEXT,
  version INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY(ayah_id) REFERENCES ayah(ayah_id),
  FOREIGN KEY(head_token_id) REFERENCES token(token_id),
  FOREIGN KEY(dependent_token_id) REFERENCES token(token_id)
);

CREATE TABLE IF NOT EXISTS meaning (
  meaning_id TEXT PRIMARY KEY,
  token_id TEXT,
  lemma_id TEXT,
  language TEXT NOT NULL DEFAULT 'bn',
  literal_meaning TEXT,
  contextual_meaning TEXT,
  meaning_status TEXT NOT NULL DEFAULT 'PENDING',
  certainty TEXT NOT NULL DEFAULT 'UNRESOLVED',
  version INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY(token_id) REFERENCES token(token_id),
  FOREIGN KEY(lemma_id) REFERENCES lemma(lemma_id)
);

CREATE TABLE IF NOT EXISTS translation_edition (
  translation_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  language TEXT NOT NULL,
  translator TEXT,
  source_url TEXT,
  license_note TEXT,
  version TEXT
);

CREATE TABLE IF NOT EXISTS translation (
  translation_record_id TEXT PRIMARY KEY,
  translation_id TEXT NOT NULL,
  ayah_id TEXT NOT NULL,
  text TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'RAW',
  version INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY(translation_id) REFERENCES translation_edition(translation_id),
  FOREIGN KEY(ayah_id) REFERENCES ayah(ayah_id)
);

CREATE TABLE IF NOT EXISTS evidence_source (
  evidence_id TEXT PRIMARY KEY,
  source_type TEXT NOT NULL,
  name TEXT NOT NULL,
  url TEXT,
  citation TEXT,
  license_note TEXT,
  accessed_at TEXT,
  snapshot_hash TEXT
);

CREATE TABLE IF NOT EXISTS evidence_link (
  evidence_link_id TEXT PRIMARY KEY,
  evidence_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  claim_text TEXT,
  support_level TEXT NOT NULL DEFAULT 'REFERENCE',
  FOREIGN KEY(evidence_id) REFERENCES evidence_source(evidence_id)
);

CREATE TABLE IF NOT EXISTS research_claim (
  claim_id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  claim_text_bn TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'DRAFT',
  certainty TEXT NOT NULL DEFAULT 'UNRESOLVED',
  created_version TEXT NOT NULL,
  supersedes_claim_id TEXT,
  FOREIGN KEY(supersedes_claim_id) REFERENCES research_claim(claim_id)
);

CREATE TABLE IF NOT EXISTS analysis_variant (
  analysis_id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  field_name TEXT NOT NULL,
  value_json TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PROPOSED',
  certainty TEXT NOT NULL DEFAULT 'UNRESOLVED',
  evidence_id TEXT,
  version INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY(evidence_id) REFERENCES evidence_source(evidence_id)
);

CREATE TABLE IF NOT EXISTS data_release (
  release_id TEXT PRIMARY KEY,
  version TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'DRAFT',
  manifest_hash TEXT,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS change_log (
  change_id TEXT PRIMARY KEY,
  release_id TEXT,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  action TEXT NOT NULL,
  old_version INTEGER,
  new_version INTEGER,
  reason TEXT,
  changed_at TEXT NOT NULL,
  FOREIGN KEY(release_id) REFERENCES data_release(release_id)
);

CREATE TABLE IF NOT EXISTS metric_definition (
  metric_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  definition TEXT NOT NULL,
  formula TEXT NOT NULL,
  dataset_scope TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS metric_run (
  run_id TEXT PRIMARY KEY,
  metric_id TEXT NOT NULL,
  dataset_version TEXT NOT NULL,
  calculated_at TEXT NOT NULL,
  result_json TEXT NOT NULL,
  FOREIGN KEY(metric_id) REFERENCES metric_definition(metric_id)
);

CREATE TABLE IF NOT EXISTS extension_registry (
  extension_id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  version TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PLANNED',
  description TEXT,
  schema_location TEXT
);

CREATE TABLE IF NOT EXISTS external_resource (
  resource_id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  external_id TEXT,
  url TEXT,
  license_note TEXT,
  imported_at TEXT,
  snapshot_hash TEXT
);

CREATE TABLE IF NOT EXISTS sync_state (
  sync_id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  resource TEXT NOT NULL,
  last_cursor TEXT,
  last_snapshot_hash TEXT,
  synced_at TEXT,
  status TEXT NOT NULL DEFAULT 'NOT_STARTED'
);

CREATE TABLE IF NOT EXISTS concept (
  concept_id TEXT PRIMARY KEY,
  label_bn TEXT NOT NULL,
  label_en TEXT,
  description_bn TEXT,
  status TEXT NOT NULL DEFAULT 'PROPOSED',
  version INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS concept_relation (
  relation_id TEXT PRIMARY KEY,
  from_concept_id TEXT NOT NULL,
  to_concept_id TEXT NOT NULL,
  relation_type TEXT NOT NULL,
  evidence_id TEXT,
  version INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY(from_concept_id) REFERENCES concept(concept_id),
  FOREIGN KEY(to_concept_id) REFERENCES concept(concept_id),
  FOREIGN KEY(evidence_id) REFERENCES evidence_source(evidence_id)
);

CREATE INDEX IF NOT EXISTS idx_ayah_surah ON ayah(surah_id, ayah_number);
CREATE INDEX IF NOT EXISTS idx_token_ayah ON token(ayah_id, position);
CREATE INDEX IF NOT EXISTS idx_token_root ON token(root_id);
CREATE INDEX IF NOT EXISTS idx_token_lemma ON token(lemma_id);
CREATE INDEX IF NOT EXISTS idx_meaning_token ON meaning(token_id);
CREATE INDEX IF NOT EXISTS idx_claim_entity ON research_claim(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_analysis_entity ON analysis_variant(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_evidence_entity ON evidence_link(entity_type, entity_id);

INSERT OR IGNORE INTO project_meta(key, value) VALUES
  ('project', 'al-quran-research'),
  ('schema_version', '1.0'),
  ('architecture', 'Master Database + Research API + Website + AI'),
  ('research_mode', 'aqidah-neutral'),
  ('raw_data_policy', 'append-only/versioned'),
  ('ai_verification_policy', 'AI output is never automatically verified');

INSERT OR IGNORE INTO schema_migrations(version, applied_at, description)
VALUES ('1.0', '2026-09-04', 'Master future-proof Quran research schema');
