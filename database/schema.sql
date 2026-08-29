PRAGMA foreign_keys = ON;

CREATE TABLE surah ( surah_id TEXT PRIMARY KEY, surah_number INTEGER NOT NULL UNIQUE, name_ar TEXT NOT NULL, name_transliteration TEXT, status TEXT NOT NULL DEFAULT 'ACTIVE', version INTEGER NOT NULL DEFAULT 1 );
CREATE TABLE ayah ( ayah_id TEXT PRIMARY KEY, surah_id TEXT NOT NULL, ayah_number INTEGER NOT NULL, arabic_text TEXT NOT NULL, text_version INTEGER NOT NULL DEFAULT 1, status TEXT NOT NULL DEFAULT 'ACTIVE', UNIQUE(surah_id, ayah_number),
 FOREIGN KEY(surah_id) REFERENCES surah(surah_id)
);
CREATE TABLE root ( root_id TEXT PRIMARY KEY, root_form TEXT NOT NULL, root_system TEXT NOT NULL DEFAULT 'undetermined', status TEXT NOT NULL DEFAULT 'PROPOSED', version INTEGER NOT NULL DEFAULT 1 );
CREATE TABLE lexeme ( lexeme_id TEXT PRIMARY KEY, lemma TEXT NOT NULL, root_id TEXT, status TEXT NOT NULL DEFAULT 'PROPOSED', version INTEGER NOT NULL DEFAULT 1, FOREIGN KEY(root_id) REFERENCES root(root_id)
);
CREATE TABLE token ( token_id TEXT PRIMARY KEY, ayah_id TEXT NOT NULL, position INTEGER NOT NULL CHECK(position>=1),
 surface_form TEXT NOT NULL, normalized_form TEXT,
 tokenization_version INTEGER NOT NULL DEFAULT 1, status TEXT NOT NULL DEFAULT 'ACTIVE',
 UNIQUE(ayah_id,position), FOREIGN KEY(ayah_id) REFERENCES ayah(ayah_id)
);
CREATE TABLE token_lexeme ( token_id TEXT PRIMARY KEY, lexeme_id TEXT NOT NULL, version INTEGER NOT NULL DEFAULT 1, FOREIGN KEY(token_id) REFERENCES token(token_id), FOREIGN KEY(lexeme_id) REFERENCES lexeme(lexeme_id)
);
CREATE TABLE morphology ( morphology_id TEXT PRIMARY KEY, token_id TEXT NOT NULL UNIQUE, part_of_speech TEXT, features_json TEXT, source_id TEXT, source_version_id TEXT, status TEXT NOT NULL DEFAULT 'PROPOSED', version INTEGER NOT NULL DEFAULT 1, FOREIGN KEY(token_id) REFERENCES token(token_id)
);
CREATE TABLE pronunciation ( pronunciation_id TEXT PRIMARY KEY, token_id TEXT NOT NULL, language_code TEXT NOT NULL, pronunciation TEXT NOT NULL, system TEXT, source_id TEXT, version INTEGER NOT NULL DEFAULT 1, status TEXT NOT NULL DEFAULT 'PROPOSED', UNIQUE(token_id,language_code,version),
 FOREIGN KEY(token_id) REFERENCES token(token_id)
);
CREATE TABLE source ( source_id TEXT PRIMARY KEY, source_type TEXT NOT NULL, title TEXT NOT NULL, author TEXT, publisher TEXT, identifier TEXT );
CREATE TABLE source_version ( source_version_id TEXT PRIMARY KEY, source_id TEXT NOT NULL, version_label TEXT NOT NULL, publication_date TEXT, accessed_at TEXT, notes TEXT, UNIQUE(source_id,version_label), FOREIGN KEY(source_id) REFERENCES source(source_id)
);
CREATE TABLE evidence ( evidence_id TEXT PRIMARY KEY, source_id TEXT, source_version_id TEXT, location TEXT, evidence_type TEXT NOT NULL, content_reference TEXT, status TEXT NOT NULL DEFAULT 'PROPOSED', FOREIGN KEY(source_id) REFERENCES source(source_id),
 FOREIGN KEY(source_version_id) REFERENCES source_version(source_version_id)
);
CREATE TABLE research_question ( question_id TEXT PRIMARY KEY, original_question TEXT NOT NULL, normalized_question TEXT, category TEXT, status TEXT NOT NULL DEFAULT 'OPEN', priority TEXT NOT NULL DEFAULT 'NORMAL', created_at TEXT NOT NULL, created_by TEXT );
CREATE TABLE question_ayah ( question_id TEXT NOT NULL, ayah_id TEXT NOT NULL, PRIMARY KEY(question_id,ayah_id),
 FOREIGN KEY(question_id) REFERENCES research_question(question_id),
 FOREIGN KEY(ayah_id) REFERENCES ayah(ayah_id)
);
CREATE TABLE claim ( claim_id TEXT PRIMARY KEY, claim_text TEXT NOT NULL, claim_type TEXT, status TEXT NOT NULL DEFAULT 'AI_PROPOSED', version INTEGER NOT NULL DEFAULT 1 );
CREATE TABLE claim_evidence ( claim_id TEXT NOT NULL, evidence_id TEXT NOT NULL, PRIMARY KEY(claim_id,evidence_id),
 FOREIGN KEY(claim_id) REFERENCES claim(claim_id), FOREIGN KEY(evidence_id) REFERENCES evidence(evidence_id)
);
CREATE TABLE finding ( finding_id TEXT PRIMARY KEY, question_id TEXT, finding_text TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'PROPOSED', version INTEGER NOT NULL DEFAULT 1, FOREIGN KEY(question_id) REFERENCES research_question(question_id)
);
CREATE TABLE translation_candidate ( candidate_id TEXT PRIMARY KEY, ayah_id TEXT NOT NULL, language_code TEXT NOT NULL, text TEXT NOT NULL, reasoning TEXT, created_by TEXT, version INTEGER NOT NULL DEFAULT 1, status TEXT NOT NULL DEFAULT 'PROPOSED', FOREIGN KEY(ayah_id) REFERENCES ayah(ayah_id)
);
CREATE TABLE translation_decision ( decision_id TEXT PRIMARY KEY, ayah_id TEXT NOT NULL, selected_candidate_id TEXT, reasoning TEXT NOT NULL, version INTEGER NOT NULL DEFAULT 1, status TEXT NOT NULL DEFAULT 'PROPOSED', FOREIGN KEY(ayah_id) REFERENCES ayah(ayah_id),
 FOREIGN KEY(selected_candidate_id) REFERENCES translation_candidate(candidate_id)
);
CREATE TABLE formula ( formula_id TEXT PRIMARY KEY, name TEXT NOT NULL, definition TEXT NOT NULL, expression TEXT NOT NULL, input_requirements TEXT, limitations TEXT, version INTEGER NOT NULL DEFAULT 1, status TEXT NOT NULL DEFAULT 'DEFINED' );
CREATE TABLE metric ( metric_id TEXT PRIMARY KEY, formula_id TEXT NOT NULL, dataset_id TEXT NOT NULL, definition TEXT NOT NULL, unit TEXT, status TEXT NOT NULL DEFAULT 'DEFINED', FOREIGN KEY(formula_id) REFERENCES formula(formula_id)
);
CREATE TABLE calculation_run ( run_id TEXT PRIMARY KEY, metric_id TEXT NOT NULL, dataset_version TEXT NOT NULL, executed_at TEXT NOT NULL, software_version TEXT, result TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'CALCULATED', FOREIGN KEY(metric_id) REFERENCES metric(metric_id)
);
CREATE TABLE review ( review_id TEXT PRIMARY KEY, target_type TEXT NOT NULL, target_id TEXT NOT NULL, reviewer_id TEXT, decision TEXT NOT NULL, comments TEXT, reviewed_at TEXT NOT NULL );
CREATE TABLE audit_log ( audit_id TEXT PRIMARY KEY, entity_type TEXT NOT NULL, entity_id TEXT NOT NULL, action TEXT NOT NULL, old_version INTEGER, new_version INTEGER, actor TEXT, timestamp TEXT NOT NULL );
CREATE INDEX idx_token_ayah ON token(ayah_id);
CREATE INDEX idx_lexeme_root ON lexeme(root_id);
CREATE INDEX idx_question_status ON research_question(status);
CREATE INDEX idx_calculation_metric ON calculation_run(metric_id);
