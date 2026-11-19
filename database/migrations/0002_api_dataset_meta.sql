CREATE TABLE IF NOT EXISTS api_dataset_meta (
  version INTEGER PRIMARY KEY,
  dataset_version TEXT NOT NULL,
  schema_version TEXT NOT NULL,
  status TEXT NOT NULL,
  source_type TEXT NOT NULL,
  source_ref TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_api_dataset_meta_status ON api_dataset_meta(status);
