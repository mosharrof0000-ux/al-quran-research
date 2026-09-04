# Master Architecture v1.0

## উদ্দেশ্য
এই নথি বর্তমান ওয়েবসাইটের নকশা না বদলে গবেষণা ডেটার স্থায়ী কাঠামো নির্ধারণ করে। বর্তমান Pilot সূরা আল-ফাতিহা এবং প্রথম পরীক্ষিত আয়াত Q001001।

## মূল নীতি
1. Website = interface; database/research records = মূল সম্পদ।
2. Raw Quran text ও raw source data overwrite করা যাবে না।
3. Correction হলে নতুন version/proposal তৈরি হবে।
4. AI output কখনও নিজে থেকে Verified হবে না।
5. Published research claim-এর evidence/provenance বাধ্যতামূলক।
6. মতভেদ থাকলে analysis variant হিসেবে পাশাপাশি রাখা হবে।
7. Core searchable data relational tables-এ থাকবে; নতুন/ঐচ্ছিক extension JSON বা module table ব্যবহার করতে পারবে।
8. Schema version, data version এবং website version আলাদা থাকবে।
9. External source আমদানি করার আগে source, license, snapshot ও hash সংরক্ষণ করতে হবে।
10. ভবিষ্যতে SQLite থেকে অন্য database-এ নেওয়া গেলেও logical IDs ও data contract অপরিবর্তিত থাকবে।

## স্তর
```text
Quran Corpus -> Surah -> Ayah -> Word/Token
                         -> Lemma / Root / Morphology / Grammar
                         -> Syntax / Meaning / Concept
                         -> Evidence / Research Claim / Analysis Variant
                         -> Version / Audit / Metrics

Database -> Research API v1 -> Website UI
                         \-> AI Research Assistant
```

## বর্তমান Website → Data Map
| UI অংশ | প্রধান ডেটা | ভবিষ্যৎ সংযোগ |
|---|---|---|
| কুরআন খুলুন | Surah, Ayah | Audio, translation |
| সূরা তালিকা | Surah | metadata, search |
| আয়াত পাঠ | Ayah | word/token, translation |
| শব্দ গবেষণা | Word/Token | root, lemma, morphology, grammar |
| Research | Research Claim | evidence, variants, version |
| Search | derived search index | Arabic/Bengali/root/lemma |
| Concordance | Word/Root occurrence | network/filters |
| AI Chat | Research API | verified context + draft analysis |
| Math/metrics | Metric Definition/Run | reproducible calculations |
| Library | Research records | evidence/export |

## Core entities
`surah`, `ayah`, `token`, `lemma`, `root`, `morphology`, `grammar_annotation`, `syntax_relation`, `meaning`, `translation_edition`, `translation`, `evidence_source`, `evidence_link`, `research_claim`, `analysis_variant`, `data_version`, `change_log`, `metric_definition`, `metric_run`, `extension`, `sync_state`।

## ভবিষ্যৎ extension
Audio/recitation, semantic concept graph, external corpus imports, advanced search, visual graph, user annotations, API clients, export pipelines এবং নতুন গবেষণা মডিউল core schema ভেঙে না দিয়ে যোগ করা যাবে।

## Status lifecycle
`raw -> normalized -> verified -> published` এবং গবেষণা বিশ্লেষণের জন্য `draft -> reviewed -> published`। কোনো AI-generated claim সরাসরি verified নয়।

## Integrity rules
- প্রতিটি Ayah একটি নির্দিষ্ট Surah-এর child।
- একটি Surah-তে ayah number unique।
- একটি Ayah-তে token position unique।
- Root/Lemma/Meaning-এর record-এর provenance থাকতে হবে।
- Published claim-এর evidence link থাকতে হবে।
- Derived metric-এর definition, formula, dataset version এবং run record থাকতে হবে।
- কোনো correction পুরনো record মুছে ফেলবে না।

## Backup/Release
প্রতিটি data release-এ schema version, data version, source manifest, snapshot hash এবং export timestamp থাকবে। Git commit code/docs-এর ইতিহাস রাখবে; database snapshot আলাদা release artifact হিসেবে সংরক্ষণ করা হবে।
