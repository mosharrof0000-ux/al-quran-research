-- আল-কুরআন রিসার্চ — API/D1 foundation schema v1
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS datasets (
  dataset_id TEXT PRIMARY KEY,
  dataset_version TEXT NOT NULL,
  source_file TEXT,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS surahs (
  surah_number INTEGER PRIMARY KEY,
  name_ar TEXT,
  name_bn TEXT,
  name_en TEXT,
  ayah_count INTEGER,
  dataset_id TEXT NOT NULL,
  FOREIGN KEY(dataset_id) REFERENCES datasets(dataset_id)
);

CREATE TABLE IF NOT EXISTS ayahs (
  ayah_id TEXT PRIMARY KEY,
  surah_number INTEGER NOT NULL,
  ayah_number INTEGER NOT NULL,
  arabic_text TEXT,
  pronunciation_bn TEXT,
  translation_bn TEXT,
  analysis_status TEXT,
  dataset_id TEXT NOT NULL,
  UNIQUE(surah_number, ayah_number, dataset_id),
  FOREIGN KEY(surah_number) REFERENCES surahs(surah_number),
  FOREIGN KEY(dataset_id) REFERENCES datasets(dataset_id)
);

CREATE INDEX IF NOT EXISTS idx_ayahs_surah ON ayahs(surah_number, ayah_number);
CREATE INDEX IF NOT EXISTS idx_ayahs_dataset ON ayahs(dataset_id);

CREATE TABLE IF NOT EXISTS tokens (
  token_id TEXT PRIMARY KEY,
  ayah_id TEXT NOT NULL,
  token_order INTEGER NOT NULL,
  arabic TEXT,
  pronunciation_bn TEXT,
  root TEXT,
  root_status TEXT,
  morphology TEXT,
  grammar TEXT,
  literal_meaning_bn TEXT,
  certainty TEXT,
  FOREIGN KEY(ayah_id) REFERENCES ayahs(ayah_id)
);

CREATE INDEX IF NOT EXISTS idx_tokens_ayah ON tokens(ayah_id);
CREATE INDEX IF NOT EXISTS idx_tokens_root ON tokens(root);

CREATE TABLE IF NOT EXISTS research_records (
  research_id TEXT PRIMARY KEY,
  version TEXT NOT NULL,
  status TEXT NOT NULL,
  scope TEXT,
  content_json TEXT NOT NULL,
  source_refs_json TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_research_status ON research_records(status);
