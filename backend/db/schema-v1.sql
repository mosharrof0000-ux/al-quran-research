-- আল-কুরআন গবেষণা — future D1 schema v1
-- Migration-ready only: do not bind production D1 until database approval/ID is confirmed.
-- Raw source text is immutable; derived research fields are versioned separately.

CREATE TABLE IF NOT EXISTS datasets (
  dataset_id TEXT PRIMARY KEY,
  dataset_version TEXT NOT NULL,
  source_name TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS surahs (
  surah_number INTEGER PRIMARY KEY,
  name_ar TEXT,
  name_bn TEXT,
  ayah_count INTEGER,
  dataset_id TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ayahs (
  ayah_id TEXT PRIMARY KEY,
  surah_number INTEGER NOT NULL,
  ayah_number INTEGER NOT NULL,
  arabic_text TEXT NOT NULL,
  pronunciation_bn TEXT,
  translation_bn TEXT,
  text_status TEXT,
  analysis_status TEXT,
  dataset_id TEXT NOT NULL,
  UNIQUE(surah_number, ayah_number, dataset_id)
);

CREATE TABLE IF NOT EXISTS tokens (
  token_id TEXT PRIMARY KEY,
  ayah_id TEXT NOT NULL,
  token_index INTEGER NOT NULL,
  arabic TEXT NOT NULL,
  pronunciation_bn TEXT,
  root TEXT,
  root_status TEXT,
  morphology TEXT,
  grammar TEXT,
  literal_meaning_bn TEXT,
  certainty TEXT,
  dataset_id TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS research_records (
  record_id TEXT PRIMARY KEY,
  record_version INTEGER NOT NULL,
  ayah_id TEXT,
  status TEXT NOT NULL,
  scope TEXT NOT NULL,
  content_json TEXT NOT NULL,
  source_refs_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ayahs_surah_ayah ON ayahs(surah_number, ayah_number);
CREATE INDEX IF NOT EXISTS idx_tokens_ayah ON tokens(ayah_id, token_index);
CREATE INDEX IF NOT EXISTS idx_research_status ON research_records(status);
