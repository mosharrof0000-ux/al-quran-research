# আল-কুরআন ভাষাভিত্তিক গবেষণা — PROJECT STATE

## ১. বর্তমান প্রকল্পের অবস্থা

Status: ACTIVE — Pilot + Research Infrastructure + Interface Experimentation
Project Name: al-quran-research
Repository: mosharrof0000-ux/al-quran-research

এই Project State হলো বর্তমান দৃশ্যমান প্রকল্প-অবস্থার রেকর্ড। এটি Master Project-এর বিকল্প নয়।

## ২. প্রকল্পের মূল উদ্দেশ্য

আল-কুরআনের ভাষা, শব্দ, Root/ধাতু, Morphology, Grammar, Syntax, অর্থপরিসর, Context, Translation, Evidence এবং পরিসংখ্যানকে স্বচ্ছ, প্রমাণ-নির্ভর, version-controlled এবং ভবিষ্যতে সম্প্রসারণযোগ্য গবেষণা কাঠামোয় সংরক্ষণ করা।

দীর্ঘমেয়াদি লক্ষ্য হলো Quran Research-কে ভিত্তি করে একটি বৃহত্তর Research Laboratory Engine তৈরি করা, যেখানে ভবিষ্যতে বিভিন্ন গবেষণা-tool ও universal chat/voice controller যুক্ত হতে পারবে।

## ৩. স্থায়ী গবেষণা নীতি

1. AI-generated তথ্য স্বয়ংক্রিয়ভাবে Verified নয়।
2. Raw data overwrite করা যাবে না।
3. সংশোধন হলে নতুন version/proposal তৈরি হবে।
4. প্রকাশিত গবেষণা-দাবির traceable evidence থাকতে হবে।
5. মতভেদ মুছে ফেলা হবে না; পৃথক analysis variant রাখা হবে।
6. OPEN QUESTION স্থায়ীভাবে সংরক্ষণ করা হবে।
7. গণিত/পরিসংখ্যানের definition, formula, dataset/version ও calculation record থাকতে হবে।
8. Research result পুনরুৎপাদনযোগ্য হতে হবে।
9. Website interface বদলালেও মূল database/research data ব্যবহারযোগ্য থাকতে হবে।
10. গবেষণা aqidah-neutral এবং ভাষাভিত্তিক থাকবে।
11. মানুষের সিদ্ধান্ত, গবেষণা-ইতিহাস ও audit trail সংরক্ষণ করা হবে; কোনো AI-এর গোপন chain-of-thought সংরক্ষণ করা হবে না।

## ৪. বর্তমান Master Database Schema

বর্তমান `schema.sql`-এ Schema Version 1.0 হিসেবে SQLite-compatible master structure আছে।

মূল entityগুলো:

project_meta, schema_migrations, surah, ayah, token, root, lemma, morphology, grammar_annotation, syntax_relation, meaning, translation_edition, translation, evidence_source, evidence_link, research_claim, analysis_variant, data_release, change_log, metric_definition, metric_run, extension_registry, external_resource, sync_state, concept, concept_relation.

এতে version, status, certainty, evidence, hash/snapshot, release, change log, metric এবং concept relation-এর ভিত্তি আছে।

## ৫. Research Chain

গবেষণার দৃশ্যমান কাজের ধারাবাহিকতা:

চিন্তা → প্রশ্ন → উদ্দেশ্য → সিদ্ধান্ত → নির্দেশ → কাজ → পরিবর্তন → পরীক্ষা → ফলাফল → যাচাই → সংশোধন/অনুমোদন → পরবর্তী কাজ

Chain ID এবং Parent Chain ID-এর মাধ্যমে গুরুত্বপূর্ণ গবেষণা-ইতিহাস অনুসরণযোগ্য রাখার নীতি আছে। বিস্তারিত নথি:

`docs/RESEARCH_CHAIN_OF_COMMAND.md`

গুরুত্বপূর্ণ চিন্তা ও দীর্ঘমেয়াদি vision-এর নথি:

`docs/OUR_THINKING_AND_VISION.md`

## ৬. বর্তমান Website / Interface

বর্তমান `index.html` একটি mobile-first Quran research interface। এতে home, Quran reading, research, search, library/chat এবং bottom navigation-এর ভিত্তি আছে। বর্তমান visual language-এ dark green/gold, cream reading surface, research purple এবং card-based interface ব্যবহৃত হয়েছে।

Website মূল research database নয়; এটি database/research system-এর ব্যবহারকারী Interface।

## ৭. বর্তমান Pilot

Pilot Scope: সূরা আল-ফাতিহা
First Test Ayah ID: Q001001

Pilot documentation ও database foundation ইতিমধ্যে তৈরি। Arabic source যাচাই ছাড়া কোনো Arabic text-কে Verified হিসেবে বসানো যাবে না।

## ৮. বর্তমান AI Chat / Voice Infrastructure

`chat-system.js` বর্তমানে Chat System v2.7। এতে:

* সাধারণ প্রশ্ন
* শব্দ গবেষণা
* আয়াত বিশ্লেষণ
* গাণিতিক গবেষণা
* একই শব্দ অনুসন্ধান / Concordance
* অনুবাদ গবেষণা
* বাংলা voice input
* বাংলা speech output
* local fallback
* Universal Tool Engine registration
* Universal Controller-এর ভবিষ্যৎ ভিত্তি
* Backup & Restore Controller-এর ভিত্তি

রয়েছে।

AI backend উত্তর না দিলে local research assistant fallback ব্যবহার করে; অনুমানকে Verified তথ্য হিসেবে দেখানো যাবে না।

## ৯. বর্তমান Robot / Home Interface Work

### Page 1 — Locked Master
`design-preview.html`

এটি পূর্বে অনুমোদিত/লক করা master design। সরাসরি edit করা যাবে না।

Live:
https://mosharrof0000-ux.github.io/al-quran-research/design-preview.html

### Page 2 — Robot Work
`design-preview-work.html`

তিন-robot interaction-এর experimental work page। বড় robot draggable; ছোট দুই robot button-এর সঙ্গে যুক্ত। Quran/Research interaction অনুযায়ী reaction ও navigation behaviour নির্ধারিত।

Live:
https://mosharrof0000-ux.github.io/al-quran-research/design-preview-work.html

### Page 1 Chat/Voice Demo
`design-preview-page1-chatbox-robot-demo.html`

বর্তমান নকশায় বড় robot voice interaction-এর জন্য এবং ছোট robot visual chatbox interaction-এর জন্য ব্যবহারের ভিত্তি আছে।

### Locked Voice Home v4
`page-1-home-voice-v4.html`

বড় robot: voice-only interaction; visual chatbox নয়।
ছোট robot: visual chatbox open/close interaction।

Live:
https://mosharrof0000-ux.github.io/al-quran-research/page-1-home-voice-v4.html

Locked branch:
`locked/page-1-home-voice-v4-2026-09-07`

এই locked version সরাসরি পরিবর্তন করা যাবে না। নতুন পরীক্ষা আলাদা file-এ করতে হবে।

## ১০. নতুন Sufi/Spiritual Design Experiment

`suﬁ-spiritual-design-demo-v1.html` নয়; প্রকৃত filename:

`sufi-spiritual-design-demo-v1.html`

এটি আলাদা experimental demo। এতে dark green, gold, stars, crescent, central robot এবং Quran/Research action-এর সুফি-আধ্যাত্মিক visual direction পরীক্ষা করা হয়েছে।

Live:
https://mosharrof0000-ux.github.io/al-quran-research/sufi-spiritual-design-demo-v1.html

এটি এখনও locked final design নয়।

## ১১. পরবর্তী Interface Direction — এখনও Experimental

পরবর্তী design experiment-এ নিচের ধারণাগুলো একত্রে পরীক্ষা করা হবে:

1. ধীর Ambient colour transition
2. Content-aware/context-aware environment
3. Sufi spiritual atmosphere + modern research laboratory feel
4. Material-style expressive motion
5. Subtle depth/glass, অতিরিক্ত decoration নয়
6. Robot-responsive glow/state
7. Button spring/shape response
8. Fluid page transition
9. Voice-first interaction
10. Mobile-first adaptive layout
11. তথ্যের status বোঝাতে purposeful colour/state
12. Research result-এর evidence/version/uncertainty দৃশ্যমান করা

এগুলো design proposal; কোনো locked page-এ প্রয়োগ করা হয়নি।

## ১২. ভবিষ্যৎ Research Graph

Schema-তে `concept` এবং `concept_relation` আছে। ভবিষ্যতে শব্দ, Root, আয়াত, ধারণা, evidence এবং research claim-এর মধ্যে অনুসরণযোগ্য knowledge graph তৈরি করা হবে।

## ১৩. Permanent Research Object

ভবিষ্যতে প্রতিটি গুরুত্বপূর্ণ Token/শব্দকে স্থায়ী research object হিসেবে দেখা হবে:

শব্দ → উচ্চারণ → Root → Lemma → Morphology → Grammar → অর্থপরিসর → আয়াতসমূহ → Context → Evidence → Research History → Version

এটি ভবিষ্যৎ architecture-এর লক্ষ্য; বর্তমান Pilot-এ সম্পূর্ণভাবে বাস্তবায়িত হয়েছে বলে দাবি করা হচ্ছে না।

## ১৪. Evidence-first AI

ভবিষ্যৎ AI research response-এর লক্ষ্য:

উত্তর → ব্যবহৃত Data → Evidence → Version → Certainty/Status → প্রয়োজনে Alternative Analysis

AI-এর উত্তর এবং Verified Research Finding আলাদা থাকবে।

## ১৫. Universal Controller

দীর্ঘমেয়াদি লক্ষ্য হলো ব্যবহারকারী স্বাভাবিক বাংলায় নির্দেশ দিলে Chat/Voice প্রয়োজনীয় Tool ও research capability নির্বাচন করবে। উদাহরণ:

“সূরা ফাতিহার ১ নম্বর আয়াত খুলুন” → আয়াত খুলবে।

“বিসমিল্লাহ শব্দটি দেখান” → সংশ্লিষ্ট token research object দেখাবে।

“এর Root দেখান” → Root analysis দেখাবে।

এটি ভবিষ্যৎ capability; বর্তমানে Universal Tool Engine-এর ভিত্তি তৈরি হয়েছে, পূর্ণ controller হিসেবে সম্পূর্ণ হয়নি।

## ১৬. Research Question Lifecycle

ভবিষ্যৎ standard workflow:

OPEN → INVESTIGATING → EVIDENCE FOUND → ANALYSIS → VERIFIED → PUBLISHED

যে প্রশ্নের উত্তর পাওয়া যায়নি সেটি মুছে ফেলা হবে না।

## ১৭. Reproducible Research

Metrics-এর ক্ষেত্রে:

Definition → Formula → Dataset → Calculation → Independent Check → Result → Interpretation

এই ধারাটি বাধ্যতামূলক করার লক্ষ্য রয়েছে।

## ১৮. বর্তমান কাজের অবস্থা

### সম্পন্ন/বিদ্যমান

* GitHub repository ও GitHub Pages চালু
* Master project documentation বিদ্যমান
* Project State বিদ্যমান
* Pilot research structure বিদ্যমান
* Master database schema v1.0 বিদ্যমান
* SQLite research database বিদ্যমান
* Evidence/version/change-log architecture বিদ্যমান
* Concept relation-এর schema বিদ্যমান
* Research Chain documentation বিদ্যমান
* Quran website interface বিদ্যমান
* AI Chat v2.7 infrastructure বিদ্যমান
* Universal Tool Engine-এর ভিত্তি বিদ্যমান
* Robot interaction demos তৈরি
* Voice Home v4 তৈরি ও locked
* Sufi spiritual design demo তৈরি

### এখনও অসম্পূর্ণ

* পূর্ণ ১১৪ সূরার research corpus তৈরি
* সম্পূর্ণ token/lemma/root/morphology/grammar data population
* সম্পূর্ণ evidence-linked research claims
* Production-grade Universal Controller
* সম্পূর্ণ Research Graph UI
* Permanent Word Research Object UI
* Reproducible calculation execution/validation pipeline সম্পূর্ণ করা
* Evidence-first AI response pipeline সম্পূর্ণ করা
* Context-aware voice command দিয়ে website navigation/action সম্পূর্ণ করা
* Final modern interface নির্বাচন ও production integration

## ১৯. নিরাপত্তা ও Backup নীতি

কোনো locked/approved page সরাসরি edit করা যাবে না। নতুন experimental file তৈরি করতে হবে। গুরুত্বপূর্ণ পরিবর্তনের আগে পুরোনো অবস্থার rollback path রাখতে হবে। Git history নিজেও version/rollback record হিসেবে থাকবে। Database পরিবর্তনের আগে আলাদা backup রাখতে হবে।

## ২০. বর্তমান Phase

**Phase: Research Infrastructure + Pilot + Interface Experimentation**

এখন আর শুধু visual design নয়; Data + Evidence + Research Engine + Universal Controller + Interface—এই পাঁচ স্তর সমন্বিতভাবে এগোবে।

## ২১. পরবর্তী অগ্রাধিকার

১. Project State বাস্তব repository-এর সঙ্গে synchronised রাখা।
২. Research folder/data structure পরিষ্কার ও স্থিতিশীল করা।
৩. Pilot data validation সম্পূর্ণ করা।
৪. Research Graph ও Permanent Word Object-এর technical design নির্ধারণ করা।
৫. Evidence-first AI response structure তৈরি করা।
৬. Universal Controller-এর নিরাপদ tool-routing design তৈরি করা।
৭. তারপর নতুন modern Sufi/ambient interface-এর experimental versions তৈরি ও তুলনা করা।

## ২২. গুরুত্বপূর্ণ Locked Pages

প্রথম locked master:
`design-preview.html`

সর্বশেষ গুরুত্বপূর্ণ locked voice version:
`page-1-home-voice-v4.html`

Locked branch:
`locked/page-1-home-voice-v4-2026-09-07`

Locked files সরাসরি পরিবর্তন নয়; copy → experiment → verify → approve → নতুন version lock—এই নিয়ম চলবে।

## ২৩. সর্বশেষ আপডেট

Project State Version: 0.3
Last Recorded Date: 2026-09-11
Update Reason: Universal AI governance control set `cf6a49812e14ab7a04d0aafb2ce9a7dc6bde4c3a`-এ main-এ promoted হয়েছে; GitHub Actions deployment ও smoke test সফল হয়েছে; Cloudflare production build সফল হয়েছে; এবং ব্যবহারকারী live site খুলে connection ও chat response কাজ করছে বলে বাস্তব পরীক্ষা নিশ্চিত করেছেন। এই state-টি stable checkpoint হিসেবে নথিভুক্ত করা হলো।

Status: VERIFIED — STABLE CHECKPOINT
Verification: `PROJECT_STATE.md` ও এর instruction পর্যালোচনা করা হয়েছে; deployment/check results এবং ব্যবহারকারীর live-site verification-এর সঙ্গে state মিলিয়ে আপডেট করা হয়েছে।