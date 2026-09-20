# QGWLI File Architecture v1.0

Status: PROPOSED — Review Required

## উদ্দেশ্য
QGWLI-কে ছোট, আলাদা, traceable এবং scalable file structure-এ রাখা। একটি বিশাল monolithic file-এর পরিবর্তে domain/layer অনুযায়ী পৃথক file রাখা হবে।

## Directory map

| Layer | Purpose |
|---|---|
| 00_MASTER | master index, rules, versions |
| 01_CORPUS | surah, ayah, raw text |
| 02_WORD | word type/occurrence/index |
| 03_LETTER | letter type/occurrence/index |
| 04_MORPHOLOGY | segments, root, lemma |
| 05_GRAMMAR | syntax/dependency |
| 06_EVIDENCE | sources/citations/verification |
| 07_RESEARCH | questions/analyses/open questions |
| 08_TRANSLATION | candidates/decisions |
| 09_CALCULATION | formulas/datasets/runs |
| 10_VALIDATION | fixtures/tests/reports |
| 11_AUDIT | changes/versions/backups |

## Identity separation
Word Type, Word Occurrence, Global Word Position, Letter Type, Letter Occurrence এবং Global Letter Position কখনো একই ID হিসেবে ব্যবহার করা হবে না।

## Source separation
Raw text, normalized text, linguistic annotation, evidence, translation এবং derived calculation আলাদা layer-এ থাকবে।

## Scalability rule
প্রয়োজন অনুযায়ী প্রতিটি domain-এর record আলাদা file-এ যোগ হবে; বড় monolithic data file তৈরি করা হবে না। একই সঙ্গে অপ্রয়োজনীয় duplicate copy তৈরি করা যাবে না।

## Safety gate
Create → Review → Approve → Store → Backup → Document → Main

বর্তমান QGWLI Fatiha pilot branch-এ এই architecture প্রস্তাব হিসেবে রাখা হচ্ছে। Main branch-এ সরাসরি পরিবর্তন করা হচ্ছে না।
