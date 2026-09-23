-- Al-Quran Research API — D1 foundation schema v1
-- Read model + versioning foundation. No production data is inserted here.

CREATE TABLE IF NOT EXISTS datasets (
  dataset_id TEXT PRIMARY KEY,
  dataset_version TEXT NOT NULL,
  status TEXT NOT NULL,
  source_file TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS surahs (
  surah_number INTEGER PRIMARY KEY,
  name_ar TEXT,
  name_bn TEXT,
  name_en TEXT,
  ayah_count INTEGER,
  dataset_id TEXT NOT NULL REFERENCES datasets(dataset_id)
);

CREATE TABLE IF NOT EXISTS ayahs (
  ayah_id TEXT PRIMARY KEY,
  surah_number INTEGER NOT NULL,
  ayah_number INTEGER NOT NULL,
  arabic_text TEXT,
  pronunciation_bn TEXT,
  translation_bn TEXT,
  analysis_status TEXT NOT NULL,
  dataset_id TEXT NOT NULL REFERENCES datasets(dataset_id),
  UNIQUE(surah_number, ayah_number, dataset_id)
);

CREATE TABLE IF NOT EXISTS tokens (
  token_id TEXT PRIMARY KEY,
  ayah_id TEXT NOT NULL REFERENCES ayahs(ayah_id),
  position INTEGER NOT NULL,
  arabic TEXT,
  pronunciation_bn TEXT,
  literal_bn TEXT,
  root TEXT,
  root_status TEXT,
  morphology TEXT,
  grammar TEXT,
  certainty TEXT
);

CREATE INDEX IF NOT EXISTS idx_ayahs_surah_ayah
  ON ayahs(surah_number, ayah_number);

CREATE INDEX IF NOT EXISTS idx_tokens_ayah_position
  ON tokens(ayah_id, position);

CREATE INDEX IF NOT EXISTS idx_tokens_root
  ON tokens(root);
