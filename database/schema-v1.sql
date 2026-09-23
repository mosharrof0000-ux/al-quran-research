-- Al-Quran Research D1 schema foundation v1
-- Prepared for migration; current pilot dataset remains the source of truth.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS datasets (
  dataset_id TEXT PRIMARY KEY,
  dataset_version TEXT NOT NULL,
  schema_version TEXT NOT NULL,
  status TEXT NOT NULL,
  source_file TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS surahs (
  surah_number INTEGER PRIMARY KEY,
  surah_id TEXT NOT NULL UNIQUE,
  name_ar TEXT,
  name_bn TEXT,
  ayah_count INTEGER NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ayahs (
  ayah_id TEXT PRIMARY KEY,
  surah_number INTEGER NOT NULL,
  ayah_number INTEGER NOT NULL,
  arabic_text TEXT NOT NULL,
  text_status TEXT NOT NULL,
  analysis_status TEXT NOT NULL,
  dataset_id TEXT,
  UNIQUE(surah_number, ayah_number),
  FOREIGN KEY(surah_number) REFERENCES surahs(surah_number),
  FOREIGN KEY(dataset_id) REFERENCES datasets(dataset_id)
);

CREATE TABLE IF NOT EXISTS tokens (
  token_id TEXT PRIMARY KEY,
  ayah_id TEXT NOT NULL,
  position INTEGER NOT NULL,
  arabic TEXT NOT NULL,
  bengali_pronunciation TEXT,
  root_value TEXT,
  root_status TEXT,
  root_note_bn TEXT,
  morphology_json TEXT,
  grammar_json TEXT,
  meaning_json TEXT,
  FOREIGN KEY(ayah_id) REFERENCES ayahs(ayah_id)
);

CREATE INDEX IF NOT EXISTS idx_ayahs_surah ON ayahs(surah_number, ayah_number);
CREATE INDEX IF NOT EXISTS idx_tokens_ayah ON tokens(ayah_id, position);
CREATE INDEX IF NOT EXISTS idx_tokens_arabic ON tokens(arabic);
CREATE INDEX IF NOT EXISTS idx_tokens_root ON tokens(root_value);
