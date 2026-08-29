# Data Dictionary — আল-কুরআন ভাষাভিত্তিক গবেষণা

## উদ্দেশ্য

এই নথিতে প্রকল্পে ব্যবহৃত প্রধান Data Entity, Field এবং তাদের অর্থ সংরক্ষণ করা হবে।

---

## ১. Surah

একটি পূর্ণ সূরা সম্পর্কিত মৌলিক তথ্য।

প্রধান তথ্য:

* surah_id — স্থায়ী Unique ID
* surah_number — সূরার ক্রমিক নম্বর
* name_ar — আরবি নাম
* name_transliteration — বাংলা উচ্চারণভিত্তিক নাম
* status — বর্তমান Record Status
* version — Record Version

---

## ২. Ayah

একটি নির্দিষ্ট আয়াতের মৌলিক Record।

প্রধান তথ্য:

* ayah_id — স্থায়ী Unique ID
* surah_id — সংশ্লিষ্ট সূরার ID
* ayah_number — সূরার মধ্যে আয়াত নম্বর
* arabic_text — যাচাইকৃত আরবি মূল পাঠ
* text_version — পাঠের Version
* status — Record Status

---

## ৩. Token

একটি আয়াতের শব্দ বা Text Token।

প্রতিটি Token-এর সঙ্গে ভবিষ্যতে সংরক্ষণ করা হবে:

* token_id
* ayah_id
* position
* arabic_form
* normalized_form
* transliteration
* lexeme_id

---

## ৪. Lexeme

একটি শব্দের মূল অভিধানভিত্তিক শব্দরূপ।

সম্ভাব্য তথ্য:

* lexeme_id
* lemma
* root_id
* part_of_speech
* gloss
* status

---

## ৫. Root

আরবি শব্দের মূল বা ধাতু।

সম্ভাব্য তথ্য:

* root_id
* root_ar
* transliteration
* normalized_root

---

## ৬. Morphology

শব্দের রূপতাত্ত্বিক বিশ্লেষণ।

সম্ভাব্য তথ্য:

* morphology_id
* token_id
* pattern
* person
* gender
* number
* tense_aspect
* voice
* case_or_mood

---

## ৭. Syntax

বাক্যে শব্দের ব্যাকরণগত ভূমিকা।

সম্ভাব্য তথ্য:

* syntax_id
* token_id
* grammatical_role
* dependency
* related_token

---

## ৮. Evidence

যেকোনো গবেষণা দাবির প্রমাণ।

সম্ভাব্য তথ্য:

* evidence_id
* source
* source_version
* citation
* evidence_type
* verification_status

---

## ৯. Claim

একটি গবেষণাগত দাবি বা বক্তব্য।

সম্ভাব্য তথ্য:

* claim_id
* claim_text
* evidence_id
* confidence_level
* status

---

## ১০. Translation Candidate

একটি আয়াতের সম্ভাব্য অনুবাদ।

সম্ভাব্য তথ্য:

* translation_candidate_id
* ayah_id
* translation_text
* translation_type
* reasoning
* evidence

---

## ১১. Translation Decision

নির্বাচিত অনুবাদ সংক্রান্ত সিদ্ধান্ত।

সম্ভাব্য তথ্য:

* decision_id
* ayah_id
* selected_candidate
* reasoning
* evidence
* version

---

## ১২. Research Question

গবেষণার জন্য সংরক্ষিত প্রশ্ন।

সম্ভাব্য তথ্য:

* question_id
* original_question
* normalized_question
* category
* status
* related_ayahs

---

## Status-এর সাধারণ মান

সম্ভাব্য Status:

* ACTIVE
* DRAFT
* PROPOSED
* VERIFIED
* DISPUTED
* ARCHIVED
* OPEN QUESTION

প্রতিটি নতুন Status ব্যবহারের আগে তার সংজ্ঞা সংরক্ষণ করতে হবে।

---

Data Dictionary Version: 0.1

Last Updated: 2026-08-30
