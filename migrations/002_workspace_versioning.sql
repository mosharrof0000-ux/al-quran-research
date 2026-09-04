-- Migration 002: Multi-Workspace + Correction + Versioning
-- SQLite/D1 compatible. Existing core tables remain unchanged.

CREATE TABLE IF NOT EXISTS workspace (
  workspace_id TEXT PRIMARY KEY,
  owner_user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  visibility TEXT NOT NULL DEFAULT 'PRIVATE',
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  base_dataset_release TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS workspace_member (
  workspace_member_id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'VIEWER',
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TEXT NOT NULL,
  UNIQUE(workspace_id, user_id),
  FOREIGN KEY(workspace_id) REFERENCES workspace(workspace_id)
);

CREATE TABLE IF NOT EXISTS workspace_setting (
  setting_id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  setting_key TEXT NOT NULL,
  setting_value_json TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL,
  UNIQUE(workspace_id, setting_key),
  FOREIGN KEY(workspace_id) REFERENCES workspace(workspace_id)
);

CREATE TABLE IF NOT EXISTS correction_proposal (
  correction_id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  previous_version INTEGER,
  proposed_value_json TEXT NOT NULL,
  reason TEXT NOT NULL,
  evidence_id TEXT,
  proposer_user_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PROPOSED',
  reviewed_by TEXT,
  reviewed_at TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY(workspace_id) REFERENCES workspace(workspace_id),
  FOREIGN KEY(evidence_id) REFERENCES evidence_source(evidence_id)
);

CREATE TABLE IF NOT EXISTS workspace_entity_version (
  workspace_version_id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  version INTEGER NOT NULL,
  data_json TEXT NOT NULL,
  change_reason TEXT,
  source_correction_id TEXT,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  UNIQUE(workspace_id, entity_type, entity_id, version),
  FOREIGN KEY(workspace_id) REFERENCES workspace(workspace_id),
  FOREIGN KEY(source_correction_id) REFERENCES correction_proposal(correction_id)
);

CREATE INDEX IF NOT EXISTS idx_workspace_owner ON workspace(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_workspace_member_user ON workspace_member(user_id);
CREATE INDEX IF NOT EXISTS idx_workspace_setting ON workspace_setting(workspace_id, setting_key);
CREATE INDEX IF NOT EXISTS idx_correction_workspace ON correction_proposal(workspace_id, status);
CREATE INDEX IF NOT EXISTS idx_correction_entity ON correction_proposal(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_workspace_version_entity ON workspace_entity_version(workspace_id, entity_type, entity_id, version);

INSERT OR IGNORE INTO schema_migrations(version, applied_at, description)
VALUES ('1.1', '2026-09-04', 'Multi-workspace isolation, correction proposals, and workspace version history');
