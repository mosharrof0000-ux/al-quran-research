# আল-কুরআন গবেষণা — প্রকল্প ইতিহাস

এই ফাইলটি প্রকল্পের গুরুত্বপূর্ণ প্রযুক্তিগত পরিবর্তন, পরীক্ষা ও সমস্যার সমাধানের স্থায়ী রেকর্ড। ভবিষ্যতে কোনো AI সহকারী/ডেভেলপার কাজ শুরু করার আগে এই ইতিহাস পড়বে।

## ২০২৬-০৯-০৭ — Cloudflare AI চ্যাট সংযোগ সফল

### সমস্যা
রোবটের AI চ্যাটে আগে Worker/AI সংযোগ নিয়ে সমস্যা হচ্ছিল। পূর্বে `Worker HTTP 405` এবং `Failed to fetch` ধরনের সমস্যা দেখা গিয়েছিল।

### কী পরীক্ষা করা হয়েছিল
পরীক্ষার প্রশ্ন: **“আপনি কেমন আছেন”**

### কী পরিবর্তন করা হয়েছিল
রোবট চ্যাট পেজ:
`design-preview-work-chat-v3-cloudflare-ai-2026-09-07.html`

ফ্রন্টএন্ডের AI অনুরোধকে Worker-এর বর্তমান API চুক্তির সঙ্গে মিলিয়ে দেওয়া হয়:
- POST body-তে `message`, `mode`, `language` পাঠানো হয়।
- Worker-এর JSON response-এর `answer` field গ্রহণ করা হয়।
- `reply`/`text` fallback রাখা হয়।
- HTTP error ও raw response নিরাপদভাবে সামলানোর ব্যবস্থা করা হয়।

### Git commit
রোবট চ্যাট পেজের সংশোধনের commit:
`da05a3dedc361450fb7806fe985ea38693d15b12`

### পরীক্ষার ফল
২০২৬-০৯-০৭ তারিখে ওয়েবসাইটের রোবট চ্যাটে **“আপনি কেমন আছেন”** পাঠানোর পর সফলভাবে বাংলা AI উত্তর পাওয়া গেছে।

### বর্তমান অবস্থা
**Cloudflare Worker → AI → রোবট চ্যাট → উত্তর প্রদর্শন — সফল।**

এটি একটি কার্যকর সংযোগ পরীক্ষা হিসেবে গণ্য হবে। ভবিষ্যতে আবার AI উত্তর না দিলে প্রথমে এই ইতিহাস দেখে নিচের বিষয়গুলো পরীক্ষা করতে হবে:
1. রোবট পেজের request body এখনও `message/mode/language` পাঠাচ্ছে কি না।
2. Worker response-এ `answer` field আছে কি না।
3. Worker URL পরিবর্তিত হয়েছে কি না।
4. CORS/OPTIONS request ঠিক আছে কি না।
5. Cloudflare Worker deployment সক্রিয় আছে কি না।
6. Gemini/API configuration ও প্রয়োজনীয় secret/binding ঠিক আছে কি না।

## ২০২৬-০৯-০৭ — AI Research Brain v1 কেন্দ্রীয়করণ

### কারণ
AI-সংক্রান্ত গুরুত্বপূর্ণ চিন্তা ও নিয়ম বিভিন্ন project document-এ ছড়িয়ে ছিল। সেগুলো বাস্তবায়নের সময় কোনো একটি কেন্দ্রীয় operational specification না থাকলে AI-এর আচরণ অসম্পূর্ণ বা অসামঞ্জস্যপূর্ণ হওয়ার ঝুঁকি থাকে।

### কী করা হয়েছে
নতুন কেন্দ্রীয় specification তৈরি করা হয়েছে:
`docs/AI_RESEARCH_BRAIN_V1.md`

এতে একত্র করা হয়েছে:
- AI-এর ভূমিকা ও সীমা
- প্রশ্ন শ্রেণিবিন্যাস
- গবেষণা execution pipeline
- Evidence-first উত্তরনীতি
- কুরআন ভাষা গবেষণা
- Root/Lemma/Morphology/Grammar/Concordance-এর ভবিষ্যৎ ক্ষমতা
- Translation research
- Research Memory
- Research Chain awareness
- Status ও certainty
- Tool intelligence
- Universal Controller
- Voice intelligence
- AI independence/AI Bridge
- Human approval
- Hallucination control
- Technology Watcher
- AI answer quality checklist
- Brain v1/v2/v3 implementation roadmap

### Architecture principle
`User → Chat/Voice → Intent → Research/Tool Engine → Evidence/Analysis → Status/Verification → Answer/Record`

### Git commit
AI Research Brain specification:
`fee9d2800371de406d963b8d2bb4c3164ed0bad4`

README-তে specification যুক্ত করার commit:
`974c01a3df307f610eaeb0914be6173fc8fae2a4`

### গুরুত্বপূর্ণ সিদ্ধান্ত
এই specification কোনো পুরোনো Research Constitution বা Master Project rule বাতিল করে না। এটি বিভিন্ন নথিতে থাকা AI-সংক্রান্ত ধারণাগুলোকে একটি কেন্দ্রীয় implementation baseline হিসেবে একত্র করেছে।

পরবর্তী AI/backend উন্নয়ন এই specification-এর সঙ্গে মিলিয়ে করতে হবে এবং বর্তমান সফল Cloudflare AI সংযোগ নষ্ট করা যাবে না।

## ২০২৬-০৯-০৭ — AI Research Brain v1 বাস্তব কোডে সংযুক্ত

### উদ্দেশ্য
AI Brain-কে শুধু document হিসেবে না রেখে live Gemini chat-এর আচরণে কার্যকর করা।

### কী করা হয়েছে
নতুন backend module:
`backend/ai-research-brain.js`

এতে বাস্তবভাবে যুক্ত হয়েছে:
- প্রশ্নের intent classification
- research-type অনুযায়ী নির্দেশনা
- Evidence-first উত্তরনীতি
- uncertainty/verification control
- Bengali-first আচরণ
- Tool/continuation/research প্রশ্ন আলাদা করার ভিত্তি

তারপর live Worker entry:
`backend/worker-entry.js`
এ Brain v1-এর system policy ও intent classification ব্যবহার করতে আপডেট করা হয়েছে। পুরোনো chat API contract রাখা হয়েছে:
`POST {message, mode, language}`
এবং `answer` response field অপরিবর্তিত রাখা হয়েছে। অতিরিক্তভাবে `brain_version` ও `intent` metadata যোগ হয়েছে।

### Git commit
Brain module:
`9f4baf8af21ddfefb3fe11749807c7cfb7d7c0a0`

Worker integration:
`a6d01907ba4b589b7626a3bb7c1cf6d758fbed11`

### নিরাপত্তা সিদ্ধান্ত
- বর্তমান সফল Cloudflare/Gemini connection contract পরিবর্তন করা হয়নি।
- Research API ও raw research data পরিবর্তন করা হয়নি।
- Brain শুধু AI-এর request/policy layer-এ যুক্ত হয়েছে।
- ভবিষ্যৎ dataset retrieval আলাদা ধাপে করা হবে।

### বর্তমান অবস্থা
**AI Research Brain v1 specification → live Gemini backend — সংযুক্ত।**

### পরবর্তী ধাপ
পরবর্তী ধাপে Brain-কে প্রকল্পের read-only Research API-এর সঙ্গে যুক্ত করা হবে, যাতে প্রয়োজন অনুযায়ী Fatiha/master dataset থেকে যাচাইযোগ্য তথ্য এনে AI উত্তর দিতে পারে। তারপর Root/Lemma/Morphology/Grammar/Concordance intelligence ধাপে ধাপে যোগ হবে।

## প্রকল্পের গবেষণা নীতি
এই প্রযুক্তিগত ইতিহাস মূল গবেষণা-সংবিধানের বিকল্প নয়। কুরআন গবেষণায়:
- আকিদাভিত্তিক/মতবাদভিত্তিক পক্ষপাত এড়িয়ে ভাষাভিত্তিক গবেষণা করা হবে।
- কাঁচা তথ্য সংরক্ষণ করা হবে।
- AI-generated তথ্যকে স্বয়ংক্রিয়ভাবে যাচাইকৃত তথ্য ধরা হবে না।
- সিদ্ধান্তের সঙ্গে উৎস/প্রমাণ/নিশ্চয়তার মাত্রা রাখা হবে।
- অনির্ধারিত ব্যাখ্যা থাকলে তা আলাদা অবস্থান হিসেবে রাখা যাবে।
- প্রযুক্তিগত পরিবর্তনে গবেষণার ডেটা ও কাঠামো নষ্ট করা যাবে না।

## পরবর্তী কাজের নিয়ম
কোনো ভবিষ্যৎ AI সহকারী প্রকল্পে কাজ শুরু করলে প্রথমে এই `PROJECT_HISTORY.md`, `README.md`, `MASTER_PROJECT.md`, `PROJECT_STATE.md`, `docs/AI_RESEARCH_BRAIN_V1.md` এবং সংশ্লিষ্ট বর্তমান কোড দেখে বর্তমান অবস্থা বুঝবে। পুরোনো সফল সংযোগ পুনরায় নষ্ট না করে তারপর পরিবর্তন করবে।
