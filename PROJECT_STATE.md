# আল-কুরআন ভাষাভিত্তিক গবেষণা — PROJECT STATE

## বর্তমান প্রকল্পের অবস্থা

Status: ACTIVE — Pilot Development

Project Name: al-quran-research

Repository:
mosharrof0000-ux/al-quran-research

## প্রকল্পের মূল উদ্দেশ্য

আল-কুরআনের ভাষাভিত্তিক, প্রমাণ-নির্ভর এবং ভবিষ্যতে সম্প্রসারণযোগ্য গবেষণা কাঠামো তৈরি করা।

এই প্রকল্পে থাকবে:

* মূল আরবি পাঠ
* বাংলা উচ্চারণ
* ভবিষ্যতে অন্যান্য ভাষার উচ্চারণ
* শব্দভিত্তিক বিশ্লেষণ
* Root / ধাতু
* Morphology / রূপতত্ত্ব
* Grammar / ব্যাকরণ
* অর্থপরিসর
* Context / প্রসঙ্গ
* Translation Candidate
* Translation Decision
* আন্তঃআয়াত তুলনা
* গবেষণা প্রশ্ন
* Evidence / প্রমাণ
* গণিত ও পরিসংখ্যান
* Version ও পরিবর্তনের ইতিহাস

---

# বর্তমানে GitHub-এ থাকা প্রধান Website Files

* index.html
* 1.html
* README.md

বর্তমান Website হলো প্রকল্পের প্রাথমিক Interface।

Website-এর কাজ:

মানুষের কাছে গবেষণার তথ্য সহজভাবে প্রদর্শন করা।

Website মূল গবেষণা Database নয়।

---

# গবেষণার মূল কাঠামো

বর্তমান Pilot Package:

al-quran-research-pilot-v0.1

প্রধান ফাইলসমূহ:

* research_rules.md
* data_dictionary.md
* schema.sql
* quran_research.db
* pilot.sql
* schema_manifest.json
* pilot_validation.md
* README.md

---

# গুরুত্বপূর্ণ নীতি

1. AI-generated তথ্য স্বয়ংক্রিয়ভাবে Verified নয়।
2. Raw data overwrite করা যাবে না।
3. সংশোধন হলে নতুন version/proposal তৈরি হবে।
4. প্রতিটি প্রকাশিত দাবির traceable evidence থাকতে হবে।
5. মতভেদ মুছে ফেলা হবে না।
6. OPEN QUESTION সংরক্ষণ করা হবে।
7. গাণিতিক ফলের definition ও formula থাকতে হবে।
8. Dataset/version ও calculation পুনরুৎপাদনযোগ্য হতে হবে।
9. Website পরিবর্তন হলেও মূল গবেষণা data ব্যবহারযোগ্য থাকতে হবে।

---

# বর্তমান Pilot

Schema Version: 0.1

Pilot Scope: সূরা আল-ফাতিহা

First Test Ayah ID: Q001001

বর্তমান অবস্থান:

গবেষণার Database কাঠামো তৈরি হয়েছে।

প্রাথমিক Website তৈরি হয়েছে।

GitHub Pages চালু হয়েছে।

Pilot documentation package তৈরি হয়েছে।

---

# বর্তমানে অসম্পূর্ণ কাজ

## ১. Master Project নিশ্চিতকরণ

MASTER_PROJECT.md GitHub-এ সফলভাবে Commit হয়েছে কি না যাচাই করতে হবে।

যদি না থাকে:

MASTER_PROJECT.md তৈরি ও Commit করতে হবে।

---

## ২. Project State

এই PROJECT_STATE.md ফাইলটি GitHub-এ Commit করতে হবে।

ভবিষ্যতে প্রতিটি গুরুত্বপূর্ণ কাজের পরে এই ফাইল Update করতে হবে।

---

## ৩. গবেষণা ফাইল GitHub কাঠামো

পরবর্তী ধাপে নিরাপদ Folder Structure তৈরি করতে হবে।

সম্ভাব্য কাঠামো:

/docs
/database
/data
/validation
/exports
/website

পুরোনো Website Files নষ্ট করা যাবে না।

---

## ৪. Database নিরাপত্তা

quran_research.db হলো গুরুত্বপূর্ণ গবেষণা Database।

Database পরিবর্তনের আগে:

* Backup রাখতে হবে
* Version রাখতে হবে
* পরিবর্তনের কারণ লিখতে হবে

---

# পরবর্তী একমাত্র কাজ

এই PROJECT_STATE.md GitHub-এ Commit করা।

Commit সফল হওয়ার পরে:

GitHub repository-এর বর্তমান File List পরীক্ষা করা হবে।

তারপর:

MASTER_PROJECT.md আছে কি না নিশ্চিত করা হবে।

তারপর গবেষণা Folder Structure ধাপে ধাপে GitHub-এ যোগ করা হবে।

---

# ভবিষ্যতে ChatGPT-কে কীভাবে প্রকল্পের অবস্থা জানাবেন

নতুন ChatGPT conversation-এ:

১. GitHub repository link দেবেন।

২. বলবেন:

"এই লিংক দেখে আমার আল-কুরআন গবেষণা প্রকল্পের বর্তমান অবস্থান নির্ণয় করুন।"

৩. সম্ভব হলে MASTER_PROJECT.md এবং PROJECT_STATE.md দেখাবেন।

তাহলে:

আগের কাজ → বর্তমান অবস্থা → পরবর্তী কাজ

দ্রুত পুনরুদ্ধার করা যাবে।

---

# সর্বশেষ আপডেট

Project State Version: 0.1

Last Recorded Date: 2026-08-29

Current Phase:

Project Memory and Research Infrastructure Setup

Next Step:

Commit PROJECT_STATE.md and verify repository status.

