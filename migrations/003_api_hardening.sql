-- Migration 003: API/D1 hardening
-- Safe, additive migration. Does not delete or overwrite research records.

CREATE TABLE IF NOT EXISTS dataset_release (
  dataset_version TEXT PRIMARY KEY,
  schema_version TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PILOT',
  source_file TEXT,
  released_at TEXT NOT NULL,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS api_schema_version (
  api_version TEXT PRIMARY KEY,
  schema_version TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  released_at TEXT NOT NULL,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_ayah_surah_number ON ayah(surah_id, ayah_number);
CREATE INDEX IF NOT EXISTS idx_token_normalized ON token(normalized_form);
CREATE INDEX IF NOT EXISTS idx_token_surface ON token(surface_form);
CREATE INDEX IF NOT EXISTS idx_pronunciation_language ON pronunciation(language_code, token_id);
CREATE INDEX IF NOT EXISTS idx_morphology_status ON morphology(status, token_id);
CREATE INDEX IF NOT EXISTS idx_evidence_source ON evidence(source_id, source_version_id);

INSERT OR IGNORE INTO dataset_release
(dataset_version, schema_version, status, source_file, released_at, notes)
VALUES
('2026-09-04-fatiha-master-v1','1.0','PILOT','data/fatiha-master-v1.json','2026-09-04T00:00:00Z','Initial Fatiha master dataset.');

INSERT OR IGNORE INTO api_schema_version
(api_version, schema_version, status, released_at, notes)
VALUES
('1.1','1.0','ACTIVE','2026-09-23T00:00:00Z','D1-ready read-only Research API contract.');
