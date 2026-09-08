# প্রকল্প মন্তব্য ও সিদ্ধান্ত রেজিস্টার

এই ফাইলটি গুরুত্বপূর্ণ audit finding, উন্নতির পরামর্শ এবং মালিকের সিদ্ধান্তের সংক্ষিপ্ত রেকর্ডের জন্য।

## মন্তব্যের নিয়ম

- AI কোনো পরিবর্তনকে চূড়ান্ত সিদ্ধান্ত হিসেবে ধরে নেবে না।
- গুরুত্বপূর্ণ প্রস্তাবের পাশে মালিকের সিদ্ধান্ত: `গ্রহণ`, `পরে`, `না`, অথবা `পর্যালোচনা প্রয়োজন` হিসেবে রাখা যাবে।
- মন্তব্য না থাকা মানে অনুমোদন নয়।
- অনুমোদিত পরিবর্তনের আগে backup এবং পরে test/verification বাধ্যতামূলক।

## 2026-09-08 — Technology & Future-Proof Audit

### প্রস্তাব ১ — Backend dependency map
অবস্থা: `পরবর্তী কাজ`

Versioned backend files-এর কোনটি active এবং কোনটি legacy তা প্রমাণসহ mapping করা হবে। এখনই কোনো file delete করা হয়নি।

### প্রস্তাব ২ — Provider-neutral AI Adapter
অবস্থা: `ভবিষ্যৎ উন্নয়ন`

Research Core-কে Gemini/Cloudflare/provider-specific code থেকে আলাদা করার জন্য adapter layer-এর নকশা করা হবে। বর্তমান working system ভেঙে সরাসরি migration করা হবে না।

### প্রস্তাব ৩ — Technology Watch
অবস্থা: `চালু`

নতুন AI, hosting, search, browser, accessibility, free-tier এবং retirement পরিবর্তন পর্যবেক্ষণের জন্য registry রাখা হয়েছে।

### প্রস্তাব ৪ — Link Integrity
অবস্থা: `চালু/উন্নয়নাধীন`

Requested exact page-এর link, redirect, title এবং page identity যাচাই করা হবে।

### প্রস্তাব ৫ — Unsafe Surah-index automation
অবস্থা: `সংশোধিত`

`integrate-surah-index.yml` main push-এ `index.html` overwrite করার ঝুঁকি তৈরি করছিল। এটি main থেকে সরানো হয়েছে; আগের অবস্থাটি backup branch-এ রাখা আছে। ভবিষ্যতে সূরা index দরকার হলে নিরাপদ data-driven পদ্ধতি ব্যবহার করা হবে।

### প্রস্তাব ৬ — AI উত্তরের পরামর্শ সরাসরি পাঠানো
অবস্থা: `গ্রহণ ও বাস্তবায়িত`

AI উত্তরের নিচে `↗ পরামর্শটি পাঠান` বোতাম যোগ করা হয়েছে। বোতামে চাপলে ওই AI বার্তার লেখাটি সরাসরি পরবর্তী user message হিসেবে একই Cloudflare Worker AI chat-এ পাঠানো হয়। এটি বর্তমান নির্দিষ্ট গবেষণা-চ্যাট পেজেই যোগ করা হয়েছে; `chat.html` পরিবর্তন করা হয়নি।

### প্রস্তাব ৭ — Legacy backend history verification
অবস্থা: `সম্পন্ন — cleanup proposal প্রস্তুত`

`worker-entry-v1.2.js`, `chat-recovery-v3.js`, এবং `research-api-entry.js` বর্তমান production entrypoint/caller নয়—এটি Git history ও বর্তমান deployment configuration দিয়ে যাচাই হয়েছে। কোনো file delete করা হয়নি। নিরাপদ archival/cleanup-এর জন্য আলাদা proposal তৈরি হয়েছে: `docs/LEGACY_BACKEND_CLEANUP_PROPOSAL-2026-09-08.md`।

### প্রস্তাব ৮ — Legacy backend cleanup
অবস্থা: `পর্যালোচনা প্রয়োজন`

প্রস্তাবিত পরবর্তী ধাপ হলো legacy candidate file-গুলোকে সরাসরি delete না করে rollback value ও archival record নিশ্চিত করে নিরাপদ archive/cleanup করা। `research-api-entry.js`-এর সম্ভাব্য ভবিষ্যৎ standalone API value থাকায় এটিকে সবচেয়ে কম আগ্রাসীভাবে handle করার সুপারিশ করা হয়েছে।

### প্রস্তাব ৯ — AI Research Agent-কে প্রকল্পের গবেষণা-নীতি শেখানো
অবস্থা: `বাস্তবায়িত — নির্দেশিকা যুক্ত`

অন্য AI/agent যেন শুধু সাধারণ উত্তরদাতা না হয়ে এই প্রকল্পের file, research record, evidence, version, history, uncertainty এবং governance rules মেনে গবেষণা করতে পারে—এই উদ্দেশ্যে `docs/AI_RESEARCH_AGENT_SYSTEM_V1.md` তৈরি করা হয়েছে। এতে boot protocol, research workflow, file-reading rules, AI-এর ক্ষমতা/সীমা, backup/change discipline, Bengali-first rule এবং provider-independent architecture-এর নির্দেশনা দেওয়া হয়েছে।

এটি documentation/system-instruction স্তরের পরিবর্তন; কোনো raw research data বা বর্তমান production chat path পরিবর্তন করা হয়নি।

### প্রস্তাব ১০ — AI-কে প্রকল্পের ফাইল পড়ার runtime ক্ষমতা দেওয়া
অবস্থা: `বাস্তবায়িত — read-only context চালু`

AI chat-এর আগে একটি নিরাপদ read-only Project Context Loader যোগ করা হয়েছে। এটি GitHub-এর public project documents থেকে সর্বশেষ গবেষণা-নীতি, architecture, backup, AI rules, research chain, project comments, vision এবং technology watch context এনে AI-কে দেয়। Research API-এর raw research data path অপরিবর্তিত রাখা হয়েছে। Context cache করা হয় এবং কোনো project file এই loader নিজে পরিবর্তন করে না।

বর্তমান Worker path-এ `backend/research-project-context.js` যুক্ত হয়েছে এবং `backend/worker-entry.js` থেকে এটি AI prompt-এ দেওয়া হচ্ছে। এটি production AI-কে project documentation বাস্তবে পড়ার সক্ষমতা দেয়; `chat.html` ও বর্তমান নির্দিষ্ট design page পরিবর্তন করা হয়নি।

### প্রস্তাব ১১ — Smart Research Agent: source/provenance-aware runtime
অবস্থা: `বাস্তবায়িত — গবেষণা-উৎস স্তর শক্তিশালী করা হয়েছে`

AI-কে শুধু প্রকল্পের নিয়ম জানানো নয়, নির্দিষ্ট Research API record-এর সঙ্গে গবেষণা-উত্তরকে যুক্ত করা হয়েছে। Ayah research request হলে read-only master dataset থেকে record আনা হয় এবং AI-কে `source_file`, `dataset_version`, `ayah_id`, `token_id`, `text_status`, `analysis_status` ও available evidence record-এর পরিচয়সহ দেওয়া হয়। AI-কে প্রতিটি গবেষণা-দাবির পাশে সুনির্দিষ্ট প্রকল্প-উৎস, যাচাই-অবস্থা এবং অনুপস্থিত তথ্যের ক্ষেত্রে `প্রকল্পের ডেটায় নেই` বলতে বাধ্য করা হয়েছে। কোনো কাল্পনিক file/record/source তৈরি না করার নিয়মও runtime prompt-এ যুক্ত হয়েছে।

এটি raw research data পরিবর্তন করে না এবং `chat.html` পরিবর্তন করে না। ভবিষ্যৎ উন্নয়নের ভিত্তি হিসেবে read-only research retrieval, provenance, evidence এবং পরে versioned research-memory/recording layer যোগ করা যাবে।

### প্রস্তাব ১২ — Research Memory + Versioned Research Record
অবস্থা: `বাস্তবায়িত — read-only স্মৃতি স্তর চালু`

পূর্ববর্তী গবেষণা পুনঃব্যবহারযোগ্য করার জন্য `data/research-records/`-এ versioned research record কাঠামো যোগ করা হয়েছে। প্রথম pilot record `RR-Q001001-V1.json`। এটি `S001-A001` ও dataset version `2026-09-04-fatiha-master-v1`-এর সঙ্গে source reference ধরে রেখেছে এবং `PENDING_REVIEW` status বজায় রেখেছে।

`backend/research-memory.js` একটি read-only retrieval layer হিসেবে এই record AI prompt-এ দেয়। পুরোনো record overwrite করা হয় না; AI নিজে থেকে GitHub-এ নতুন record লিখে বা VERIFIED করে না। নতুন ফল সংরক্ষণ দরকার হলে ভবিষ্যতে অনুমোদিত write/approval workflow আলাদা করে যোগ করতে হবে।
