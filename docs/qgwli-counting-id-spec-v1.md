# QGWLI Counting & ID Specification v1.0

**Project:** আল-কুরআন Research  
**System:** Quran Global Word–Letter Index (QGWLI)  
**Status:** PROPOSED — Pilot implementation gate  
**Pilot:** সূরা আল-ফাতিহা

## 1. উদ্দেশ্য

QGWLI-এর লক্ষ্য হলো কুরআনের প্রতিটি Word Occurrence এবং Letter Occurrence-কে স্থায়ী, traceable এবং reproducible research identity দেওয়া।

মূল স্তর:

RAW → STRUCTURE → INDEX → LINGUISTIC ANNOTATION → RESEARCH

## 2. Canonical source

- Raw Arabic text কখনো overwrite করা যাবে না।
- Source ID, source version, dataset version এবং hash সংরক্ষণ করতে হবে।
- Normalized/index representation raw text-এর বিকল্প নয়।
- একই source + একই rule + একই version থেকে rebuild করলে একই index তৈরি হতে হবে।

বর্তমান Fatiha pilot dataset: `data/fatiha-master-v1.json`, dataset version `2026-09-04-fatiha-master-v1`.

## 3. Identity layers

### Surah
`SURAH-001`

### Ayah
`Q001001`

### Word Occurrence
উদাহরণ:

`WO-Q001001-W003`

এটি নির্দিষ্ট আয়াতের নির্দিষ্ট word occurrence।

### Global Word Position
উদাহরণ:

`GW-000001`

এটি corpus-এর ধারাবাহিক word sequence-এর অবস্থান।

### Letter Type
কোন Arabic letter তা নির্দেশ করে। এটি Unicode code point বা Abjad value নয়; এটি QGWLI project identity।

### Letter Occurrence
উদাহরণ:

`LO-WO-Q001001-W003-L001`

এটি নির্দিষ্ট word-এর নির্দিষ্ট letter occurrence।

### Global Letter Position
উদাহরণ:

`GL-000001`

এটি corpus-এর নির্ধারিত counting rule অনুযায়ী base-letter occurrence-এর global sequence।

## 4. Word বনাম morphology

Word/Token এবং morphological segment এক নয়।

একটি Arabic word-এর ভিতরে একাধিক morphological segment থাকতে পারে। QGWLI-তে Word Occurrence identity আলাদা থাকবে এবং morphology আলাদা annotation layer হিসেবে থাকবে। এটি বিদ্যমান Quranic Arabic Corpus-এর word/segment distinction-এর সঙ্গেও সামঞ্জস্যপূর্ণ। 

## 5. Word Type বনাম Word Occurrence

একই lexical/form একাধিক জায়গায় থাকলে:

1 Type/Lexeme → Multiple Occurrences

প্রতিটি occurrence-এর নিজস্ব Word Occurrence ID এবং Global Word Position থাকবে।

## 6. Letter counting rule

Pilot implementation-এর আগে counting rule versioned হতে হবে।

Default research rule:

- Base Arabic letters = counted units
- Diacritics/marks = আলাদা preserved information
- Raw Unicode sequence = source representation
- Normalized base-letter sequence = counting representation

কোনো mark/annotation base letter হিসেবে গণনা হবে কি না, তা rule version-এ স্পষ্টভাবে সংজ্ঞায়িত না করা পর্যন্ত numerical result publish করা যাবে না।

## 7. Local positions

Word:

`W001, W002, W003...`

Letter:

`L001, L002, L003...`

Public indexing 1-based হবে।

## 8. Reverse mapping

প্রতিটি global letter position থেকে এই পথ পুনরুদ্ধারযোগ্য হতে হবে:

Global Letter Position  
→ Letter Occurrence  
→ Word Occurrence  
→ Ayah  
→ Surah

একইভাবে:

Word Occurrence  
→ তার Letter Occurrences

পুনরুদ্ধারযোগ্য হতে হবে।

## 9. Deterministic build

Build input:

- Canonical source
- Dataset version
- Counting rule version
- Tokenization rule version
- Normalization rule version

একই inputs দিলে একই IDs, positions এবং mappings তৈরি হতে হবে।

## 10. Validation invariants

- Ayah ID unique
- Ayah number unique within Surah
- Word local position unique within Ayah
- Word Occurrence ID unique
- Global Word Position unique and gap-free
- Letter local position unique within Word Occurrence
- Letter Occurrence ID unique
- Global Letter Position unique and gap-free
- Every Letter Occurrence maps to exactly one Word Occurrence
- Every Word Occurrence maps to exactly one Ayah
- Every Ayah maps to exactly one Surah
- Raw source remains recoverable
- Rebuild is deterministic

## 11. Mathematical research interface

কোনো numerical result শুধু একটি সংখ্যা হিসেবে সংরক্ষণ করা যাবে না।

কমপক্ষে:

- Formula ID
- Formula
- Dataset ID
- Dataset Version
- Counting Rule Version
- Calculation Method
- Calculation Run ID
- Result
- Independent Validation
- Status

থাকতে হবে।

## 12. Correction policy

Raw/index data destructiveভাবে পরিবর্তন করা যাবে না।

Correction হলে:

Old Version → New Version / Proposal

এবং audit trail সংরক্ষিত থাকবে।

## 13. AI query contract

Natural language query:

→ Intent  
→ Entity resolution  
→ Index query  
→ Database result  
→ Evidence/Provenance  
→ AI explanation

Project data-তে record না থাকলে AI অনুমান করে project-verified result দেখাবে না। External evidence হলে তা External Evidence হিসেবে চিহ্নিত করতে হবে।

## 14. Future extensions

এই identity layer ভবিষ্যতে:

- pronunciation
- tajweed
- audio
- visual mushaf
- semantic graph
- root network
- concordance
- translation research
- mathematical research
- research graph

এর সঙ্গে যুক্ত হতে পারবে।

## 15. Governance gate

Implementation sequence:

CREATE → REVIEW → APPROVE → TEST FIXTURE → PILOT BUILD → VALIDATE → BACKUP → DOCUMENT → MAIN

QGWLI Pilot approval ছাড়া live site বা main research data পরিবর্তন করা যাবে না.
