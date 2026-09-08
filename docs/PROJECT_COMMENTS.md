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

Research Core-কে Gemini/Cloudflare/provider-specific code থেকে আলাদা রাখার জন্য adapter layer-এর নকশা করা হবে। বর্তমান working system ভেঙে সরাসরি migration করা হবে না।

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
অবস্থা: `পর্যালোচনা প্রয়োজন`

`worker-entry-v1.2.js`, `chat-recovery-v3.js`, এবং `research-api-entry.js` বর্তমান `wrangler.jsonc` entrypoint/caller নয়—এটি যাচাই হয়েছে। Git history-তে তিনটির historical addition commit-ও নথিভুক্ত হয়েছে। এখনই delete করা হবে না; আগে rollback/deployment value এবং archival প্রয়োজন মূল্যায়ন করতে হবে।

## মালিকের মন্তব্য

মালিকের মন্তব্য/সিদ্ধান্ত এখানে যোগ করা যাবে।
