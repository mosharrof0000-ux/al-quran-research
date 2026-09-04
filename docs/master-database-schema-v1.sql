PRAGMA foreign_keys = ON;

CREATE TABLE schema_version (schema_version TEXT PRIMARY KEY, applied_at TEXT NOT NULL);
CREATE TABLE project_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE data_version (data_version_id TEXT PRIMARY KEY, label TEXT NOT NULL, status TEXT NOT NULL, created_at TEXT NOT NULL, source_manifest TEXT, snapshot_hash TEXT);

CREATE TABLE surah (surah_id TEXT PRIMARY KEY, surah_number INTEGER NOT NULL UNIQUE, name_ar TEXT NOT NULL, name_transliteration TEXT, status TEXT NOT NULL DEFAULT 'ACTIVE', version INTEGER NOT NULL DEFAULT 1);
CREATE TABLE ayah (ayah_id TEXT PRIMARY KEY, surah_id TEXT NOT NULL, ayah_number INTEGER NOT NULL, arabic_text TEXT NOT NULL, normalized_arabic TEXT, text_hash TEXT, text_version INTEGER NOT NULL DEFAULT 1, status TEXT NOT NULL DEFAULT 'ACTIVE', UNIQUE(surah_id, ayah_number), FOREIGN KEY(surah_id) REFERENCES surah(surah_id));
CREATE TABLE token (token_id TEXT PRIMARY KEY, ayah_id TEXT NOT NULL, position INTEGER NOT NULL, surface_ar TEXT NOT NULL, normalized_ar TEXT, bengali_transliteration TEXT, status TEXT NOT NULL DEFAULT 'ACTIVE', version INTEGER NOT NULL DEFAULT 1, UNIQUE(ayah_id, position), FOREIGN KEY(ayah_id) REFERENCES ayah(ayah_id));

CREATE TABLE root (root_id TEXT PRIMARY KEY, root_ar TEXT NOT NULL UNIQUE, root_bengali TEXT, status TEXT NOT NULL DEFAULT 'ACTIVE', version INTEGER NOT NULL DEFAULT 1);
CREATE TABLE lemma (lemma_id TEXT PRIMARY KEY, lemma_ar TEXT NOT NULL, lemma_bengali_transliteration TEXT, root_id TEXT, status TEXT NOT NULL DEFAULT 'ACTIVE', version INTEGER NOT NULL DEFAULT 1, FOREIGN KEY(root_id) REFERENCES root(root_id));
CREATE TABLE token_lemma (token_id TEXT NOT NULL, lemma_id TEXT NOT NULL, analysis_variant_id TEXT, PRIMARY KEY(token_id, lemma_id, analysis_variant_id), FOREIGN KEY(token_id) REFERENCES token(token_id), FOREIGN KEY(lemma_id) REFERENCES lemma(lemma_id));

CREATE TABLE morphology (morphology_id TEXT PRIMARY KEY, token_id TEXT NOT NULL, analysis_variant_id TEXT, pos TEXT, pattern_ar TEXT, person TEXT, number TEXT, gender TEXT, tense_aspect TEXT, voice TEXT, case_mood TEXT, features_json TEXT, confidence TEXT NOT NULL DEFAULT 'unverified', version INTEGER NOT NULL DEFAULT 1, FOREIGN KEY(token_id) REFERENCES token(token_id));
CREATE TABLE grammar_annotation (grammar_id TEXT PRIMARY KEY, token_id TEXT NOT NULL, analysis_variant_id TEXT, role_label TEXT, relation_label TEXT, explanation_bn TEXT, confidence TEXT NOT NULL DEFAULT 'unverified', version INTEGER NOT NULL DEFAULT 1, FOREIGN KEY(token_id) REFERENCES token(token_id));
CREATE TABLE syntax_relation (syntax_relation_id TEXT PRIMARY KEY, ayah_id TEXT NOT NULL, head_token_id TEXT, dependent_token_id TEXT NOT NULL, relation_label TEXT NOT NULL, analysis_variant_id TEXT, confidence TEXT NOT NULL DEFAULT 'unverified', version INTEGER NOT NULL DEFAULT 1, FOREIGN KEY(ayah_id) REFERENCES ayah(ayah_id), FOREIGN KEY(head_token_id) REFERENCES token(token_id), FOREIGN KEY(dependent_token_id) REFERENCES token(token_id));

CREATE TABLE meaning (meaning_id TEXT PRIMARY KEY, token_id TEXT, lemma_id TEXT, literal_bn TEXT, contextual_bn TEXT, scope TEXT NOT NULL DEFAULT 'literal', analysis_variant_id TEXT, confidence TEXT NOT NULL DEFAULT 'unverified', version INTEGER NOT NULL DEFAULT 1, FOREIGN KEY(token_id) REFERENCES token(token_id), FOREIGN KEY(lemma_id) REFERENCES lemma(lemma_id));
CREATE TABLE translation_edition (translation_edition_id TEXT PRIMARY KEY, name TEXT NOT NULL, language TEXT NOT NULL, translator TEXT, source_url TEXT, license_note TEXT, version TEXT);
CREATE TABLE translation (translation_id TEXT PRIMARY KEY, ayah_id TEXT NOT NULL, translation_edition_id TEXT NOT NULL, text TEXT NOT NULL, version INTEGER NOT NULL DEFAULT 1, FOREIGN KEY(ayah_id) REFERENCES ayah(ayah_id), FOREIGN KEY(translation_edition_id) REFERENCES translation_edition(translation_edition_id));

CREATE TABLE evidence_source (evidence_source_id TEXT PRIMARY KEY, source_type TEXT NOT NULL, title TEXT NOT NULL, author TEXT, publisher TEXT, url TEXT, license_note TEXT, accessed_at TEXT, snapshot_hash TEXT);
CREATE TABLE evidence_link (evidence_link_id TEXT PRIMARY KEY, evidence_source_id TEXT NOT NULL, entity_type TEXT NOT NULL, entity_id TEXT NOT NULL, locator TEXT, note_bn TEXT, FOREIGN KEY(evidence_source_id) REFERENCES evidence_source(evidence_source_id));
CREATE TABLE analysis_variant (analysis_variant_id TEXT PRIMARY KEY, entity_type TEXT NOT NULL, entity_id TEXT NOT NULL, label TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'draft', confidence TEXT NOT NULL DEFAULT 'unverified', created_at TEXT NOT NULL, supersedes_variant_id TEXT);
CREATE TABLE research_claim (claim_id TEXT PRIMARY KEY, entity_type TEXT NOT NULL, entity_id TEXT NOT NULL, claim_bn TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'draft', analysis_variant_id TEXT, data_version_id TEXT, created_at TEXT NOT NULL, FOREIGN KEY(analysis_variant_id) REFERENCES analysis_variant(analysis_variant_id), FOREIGN KEY(data_version_id) REFERENCES data_version(data_version_id));

CREATE TABLE metric_definition (metric_id TEXT PRIMARY KEY, name TEXT NOT NULL UNIQUE, definition_bn TEXT NOT NULL, formula TEXT NOT NULL, unit TEXT, version INTEGER NOT NULL DEFAULT 1);
CREATE TABLE metric_run (run_id TEXT PRIMARY KEY, metric_id TEXT NOT NULL, data_version_id TEXT NOT NULL, calculated_at TEXT NOT NULL, result_json TEXT NOT NULL, FOREIGN KEY(metric_id) REFERENCES metric_definition(metric_id), FOREIGN KEY(data_version_id) REFERENCES data_version(data_version_id));
CREATE TABLE change_log (change_id TEXT PRIMARY KEY, entity_type TEXT NOT NULL, entity_id TEXT NOT NULL, action TEXT NOT NULL, old_version INTEGER, new_version INTEGER, reason_bn TEXT, created_at TEXT NOT NULL);
CREATE TABLE extension (extension_id TEXT PRIMARY KEY, key TEXT NOT NULL UNIQUE, name TEXT NOT NULL, version TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'planned', config_json TEXT);
CREATE TABLE sync_state (sync_id TEXT PRIMARY KEY, provider TEXT NOT NULL, resource TEXT NOT NULL, external_version TEXT, sync_token TEXT, snapshot_hash TEXT, synced_at TEXT, status TEXT NOT NULL DEFAULT 'pending');

-- Derived search indexes may be added later. They are never the canonical source.
