-- Al-Quran Research API Core v1
-- Structural schema only. No production data inserted.
CREATE TABLE IF NOT EXISTS api_schema_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT OR IGNORE INTO api_schema_meta(key,value)
VALUES ('api_version','1.0'),('schema_version','api-core-v1'),('mode','read-only');
CREATE INDEX IF NOT EXISTS idx_api_schema_meta_key ON api_schema_meta(key);
