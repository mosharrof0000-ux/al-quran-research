# QGWLI Fatiha Pilot Test Cases & Expected Results v1.0

**Project:** আল-কুরআন Research  
**System:** QGWLI  
**Pilot Corpus:** সূরা আল-ফাতিহা  
**Status:** PROPOSED — Implementation gate

## Test convention

- PASS = rule অনুযায়ী সফল
- FAIL = rule ভঙ্গ
- BLOCKED = প্রয়োজনীয় source/rule অনুপস্থিত
- REVIEW = ফল আছে, মানব যাচাই প্রয়োজন

### T01 — Canonical Source Integrity
**Severity:** CRITICAL  
Source ID, version, raw text এবং hash থাকতে হবে। একই source পুনরায় নিলে একই raw input পাওয়া যাবে।

### T02 — Raw Text Preservation
**Severity:** CRITICAL  
Normalization/indexing raw Arabic overwrite করতে পারবে না। raw এবং normalized representation আলাদা থাকবে।

### T03 — Surah Identity
**Severity:** CRITICAL  
Fatiha-এর স্থায়ী Surah identity থাকবে এবং rebuild-এ অপরিবর্তিত থাকবে।

### T04 — Ayah Identity
**Severity:** CRITICAL  
প্রতিটি আয়াতের stable ID থাকবে; একই canonical dataset rebuild করলে ID একই থাকবে।

### T05 — Ayah Sequence
**Severity:** CRITICAL  
Pilot-এর ৭টি আয়াত শনাক্ত হবে; duplicate, missing বা reordered ayah থাকবে না।

### T06 — Word Segmentation
**Severity:** CRITICAL  
Fixed tokenization rule অনুযায়ী প্রতিটি আয়াতের word boundary deterministic হবে।

### T07 — Local Word Position
**Severity:** MAJOR  
প্রতিটি আয়াতের word positions 1-based, unique এবং gap-free হবে।

### T08 — Word Occurrence ID
**Severity:** CRITICAL  
প্রতিটি নির্দিষ্ট word occurrence-এর unique `WO-...` ID থাকবে।

### T09 — Global Word Position
**Severity:** CRITICAL  
Global word sequence 1-based, unique এবং gap-free হবে।

### T10 — Word Type vs Occurrence
**Severity:** CRITICAL  
একই word/form-এর একাধিক occurrence merge হবে না; Type/Lexeme ও Occurrence আলাদা থাকবে।

### T11 — Letter Classification
**Severity:** CRITICAL  
Base letter এবং diacritic/mark-এর classification versioned rule দ্বারা নির্ধারিত হবে।

### T12 — Letter Type ID
**Severity:** CRITICAL  
Arabic letter-এর project identity Unicode/Abjad value থেকে আলাদা থাকবে।

### T13 — Letter Occurrence ID
**Severity:** CRITICAL  
প্রতিটি নির্দিষ্ট letter occurrence-এর unique `LO-...` ID থাকবে।

### T14 — Local Letter Position
**Severity:** MAJOR  
একটি word-এর letter positions 1-based, unique এবং gap-free হবে।

### T15 — Global Letter Position
**Severity:** CRITICAL  
নির্ধারিত counting rule অনুযায়ী global letter sequence unique ও gap-free হবে। অযাচাইকৃত মোট সংখ্যা আগে থেকে বসানো যাবে না।

### T16 — Word → Letter Mapping
**Severity:** CRITICAL  
একটি Word Occurrence ID থেকে তার সব Letter Occurrence নির্ভুলভাবে পাওয়া যাবে।

### T17 — Letter → Word Reverse Mapping
**Severity:** CRITICAL  
Global Letter Position থেকে Letter → Word → Ayah → Surah পুনরুদ্ধারযোগ্য হবে।

### T18 — Repeated Word Retrieval
**Severity:** CRITICAL  
একই word/form-এর সব occurrence আলাদা ID ও অবস্থানসহ পাওয়া যাবে।

### T19 — Repeated Letter Retrieval
**Severity:** MAJOR  
একটি Letter Type-এর occurrence-গুলো আলাদা Letter Occurrence ID ও global positionসহ পাওয়া যাবে।

### T20 — Deterministic Rebuild
**Severity:** CRITICAL  
একই source + একই rules + একই version দিয়ে দুইবার build করলে IDs, positions এবং mappings একই হতে হবে।

### T21 — Independent Recount
**Severity:** CRITICAL  
Indexer-এর বাইরে দ্বিতীয় validation method দিয়ে count যাচাই করতে হবে। একই algorithm দুবার চালানো independent validation নয়।

### T22 — Raw/Normalized Traceability
**Severity:** CRITICAL  
প্রতিটি indexed entity-এর raw source-এ trace-back করা যাবে।

### T23 — Source/Version Traceability
**Severity:** CRITICAL  
প্রয়োজনে Source ID, Source Version, Dataset Version এবং Rule Version থেকে result-এর provenance নির্ণয় করা যাবে।

### T24 — Formula Traceability
**Severity:** CRITICAL  
প্রতিটি numerical result-এর Formula, Dataset Version, Counting Rule এবং Calculation Run সংরক্ষিত থাকবে।

### T25 — Non-Destructive Correction
**Severity:** CRITICAL  
Correction পুরনো data মুছে ফেলবে না; নতুন version/proposal ও audit trail তৈরি হবে।

## Acceptance Rule

সব CRITICAL test PASS না হলে Pilot **NOT READY**।

MAJOR test FAIL থাকলে সংশোধন ছাড়া পরবর্তী scale-up নয়।

BLOCKED test থাকলে status হবে:

`BLOCKED — NOT READY FOR SCALE`

## No Unverified Number Rule

এই test document কোনো মোট Word count, Letter count বা mathematical result আগে থেকে সত্য ধরে নেয় না।

Numerical result আসবে:

Canonical Dataset + Counting Rule + Build Run + Validation

থেকে।

## Implementation Gate

CREATE → REVIEW → APPROVE → TEST FIXTURE → PILOT BUILD → VALIDATE → BACKUP → DOCUMENT → MAIN
