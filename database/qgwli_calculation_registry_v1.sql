-- QGWLI calculation registry seed v1
-- Connects mathematical formulas/metrics to the existing SQLite research database.
INSERT OR IGNORE INTO formula (formula_id,name,definition,expression,input_requirements,limitations,version,status) VALUES
('F-QGWLI-WORD-COUNT-V1','Word Occurrence Count','Counts indexed word occurrences in the selected dataset.','word_count = COUNT(word_occurrence)','word occurrence records + dataset version','Only valid for a dataset with deterministic word-occurrence indexing.',1,'DEFINED'),
('F-QGWLI-BASE-LETTER-COUNT-V1','Base Letter Count','Sums the base-letter count attached to each indexed word occurrence.','base_letter_count = SUM(word.letter_count)','word occurrence records + base-letter counting rule + dataset version','Combining marks/diacritics are excluded according to the active counting rule.',1,'DEFINED');

INSERT OR IGNORE INTO metric (metric_id,formula_id,dataset_id,definition,unit,status) VALUES
('QGWLI_COUNT_A001','F-QGWLI-WORD-COUNT-V1','QGWLI-FATIHA-A001-PILOT-001','Fatiha A001 indexed word-occurrence count','occurrences','DEFINED'),
('QGWLI_BASE_LETTER_A001','F-QGWLI-BASE-LETTER-COUNT-V1','QGWLI-FATIHA-A001-PILOT-001','Fatiha A001 indexed base-letter occurrence count','occurrences','DEFINED');
