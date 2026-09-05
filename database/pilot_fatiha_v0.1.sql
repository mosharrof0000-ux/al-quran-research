-- Al-Quran Research — Fatiha Pilot Seed v0.1
-- Source dataset: data/fatiha-master-v1.json
-- Purpose: reproducible SQLite seed for the pilot scope (Surah 1).
-- IMPORTANT: This seed preserves uncertainty; disputed roots remain DISPUTED.

PRAGMA foreign_keys = ON;

INSERT INTO surah (surah_id, surah_number, name_ar, name_transliteration, status, version)
VALUES ('S001', 1, 'الفاتحة', 'Al-Fatihah', 'ACTIVE', 1);

INSERT INTO ayah (ayah_id, surah_id, ayah_number, arabic_text, text_version, status) VALUES
('S001-A001','S001',1,'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',1,'ACTIVE'),
('S001-A002','S001',2,'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',1,'ACTIVE'),
('S001-A003','S001',3,'الرَّحْمَٰنِ الرَّحِيمِ',1,'ACTIVE'),
('S001-A004','S001',4,'مَالِكِ يَوْمِ الدِّينِ',1,'ACTIVE'),
('S001-A005','S001',5,'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',1,'ACTIVE'),
('S001-A006','S001',6,'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',1,'ACTIVE'),
('S001-A007','S001',7,'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',1,'ACTIVE');

INSERT INTO root (root_id, root_form, root_system, status, version) VALUES
('R-RAHM','ر-ح-م','TRILITERAL','ESTABLISHED',1),
('R-SMW-WSM','س-م-و / و-س-م','DISPUTED','DISPUTED',1),
('R-ILH','إ-ل-ه','TRILITERAL','DISPUTED',1);

INSERT INTO lexeme (lexeme_id, lemma, root_id, status, version) VALUES
('L-ISM','اسْم','R-SMW-WSM','PROPOSED',1),
('L-ALLAH','اللَّه','R-ILH','PROPOSED',1),
('L-RAHMAN','رَحْمَان','R-RAHM','PROPOSED',1),
('L-RAHIM','رَحِيم','R-RAHM','PROPOSED',1);

INSERT INTO token (token_id, ayah_id, position, surface_form, normalized_form, tokenization_version, status) VALUES
('S001-A001-T001','S001-A001',1,'بِسْمِ','بسم',1,'ACTIVE'),
('S001-A001-T002','S001-A001',2,'اللَّهِ','الله',1,'ACTIVE'),
('S001-A001-T003','S001-A001',3,'الرَّحْمَٰنِ','الرحمن',1,'ACTIVE'),
('S001-A001-T004','S001-A001',4,'الرَّحِيمِ','الرحيم',1,'ACTIVE');

INSERT INTO token_lexeme (token_id, lexeme_id, version) VALUES
('S001-A001-T001','L-ISM',1),
('S001-A001-T002','L-ALLAH',1),
('S001-A001-T003','L-RAHMAN',1),
('S001-A001-T004','L-RAHIM',1);

INSERT INTO morphology (morphology_id, token_id, part_of_speech, features_json, status, version) VALUES
('M-S001-A001-T001','S001-A001-T001','PARTICLE+NOUN','{"analysis_bn":"بِـ প্রিপোজিশন + اسْم নামবাচক পদ; اسْم এখানে مجرور।","certainty":"HIGH"}','PROPOSED',1),
('M-S001-A001-T002','S001-A001-T002','PROPER_NOUN','{"analysis_bn":"বিশেষ নাম (اسم عَلَم)।","certainty":"HIGH"}','PROPOSED',1),
('M-S001-A001-T003','S001-A001-T003','ADJECTIVE','{"pattern_ar":"فَعْلَان","analysis_bn":"الـ + رَحْمَان; ওজন فَعْلَان।","certainty":"HIGH"}','PROPOSED',1),
('M-S001-A001-T004','S001-A001-T004','ADJECTIVE','{"pattern_ar":"فَعِيل","analysis_bn":"الـ + رَحِيم; ওজন فَعِيل।","certainty":"HIGH"}','PROPOSED',1);

INSERT INTO pronunciation (pronunciation_id, token_id, language_code, pronunciation, system, status, version) VALUES
('P-S001-A001-T001-BN','S001-A001-T001','bn','বিসমি','BENGALI_APPROX','PROPOSED',1),
('P-S001-A001-T002-BN','S001-A001-T002','bn','আল্লাহি','BENGALI_APPROX','PROPOSED',1),
('P-S001-A001-T003-BN','S001-A001-T003','bn','আর-রহমানি','BENGALI_APPROX','PROPOSED',1),
('P-S001-A001-T004-BN','S001-A001-T004','bn','আর-রহিমি','BENGALI_APPROX','PROPOSED',1);

INSERT INTO source (source_id, source_type, title, author, publisher, identifier)
VALUES ('SRC-QAC','LINGUISTIC_REFERENCE','Quranic Arabic Corpus',NULL,NULL,'https://corpus.quran.com/');

INSERT INTO evidence (evidence_id, source_id, evidence_type, content_reference, status)
VALUES ('E-QAC-001','SRC-QAC','LINGUISTIC_REFERENCE','Arabic morphology, syntax and word-by-word analysis','PROPOSED');

-- No Translation Decision is inserted in this pilot because the current dataset
-- does not contain a reviewed final translation record.
-- No AI-generated analysis is marked VERIFIED by this seed.
