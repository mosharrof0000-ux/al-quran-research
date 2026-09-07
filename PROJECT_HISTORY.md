# আল-কুরআন গবেষণা — প্রকল্প ইতিহাস

এই ফাইলটি প্রকল্পের গুরুত্বপূর্ণ প্রযুক্তিগত পরিবর্তন, পরীক্ষা ও সমস্যার সমাধানের স্থায়ী রেকর্ড। ভবিষ্যতে কোনো AI সহকারী/ডেভেলপার কাজ শুরু করার আগে এই ইতিহাস পড়বে।

## ২০২৬-০৯-০৭ — Cloudflare AI চ্যাট সংযোগ সফল

### সমস্যা
রোবটের AI চ্যাটে আগে Worker/AI সংযোগ নিয়ে সমস্যা হচ্ছিল। পূর্বে `Worker HTTP 405` এবং `Failed to fetch` ধরনের সমস্যা দেখা গিয়েছিল।

### পরীক্ষা
পরীক্ষার প্রশ্ন: **“আপনি কেমন আছেন”**। রোবট চ্যাটে সফলভাবে বাংলা AI উত্তর পাওয়া গেছে।

### বর্তমান অবস্থা
**Cloudflare Worker → AI → রোবট চ্যাট → উত্তর প্রদর্শন — সফল।**

## ২০২৬-০৯-০৭ — AI Research Brain v1 কেন্দ্রীয়করণ

নতুন কেন্দ্রীয় specification:
`docs/AI_RESEARCH_BRAIN_V1.md`

এতে AI-এর ভূমিকা, প্রশ্ন শ্রেণিবিন্যাস, গবেষণা execution pipeline, evidence-first উত্তরনীতি, কুরআন ভাষা গবেষণা, Root/Lemma/Morphology/Grammar/Concordance, Translation research, Research Memory, Research Chain, status/certainty, Tool intelligence, Universal Controller, Voice intelligence, AI Bridge, human approval, hallucination control এবং ভবিষ্যৎ roadmap একত্র করা হয়েছে।

Brain specification commit:
`fee9d2800371de406d963b8d2bb4c3164ed0bad4`

README সংযোগ commit:
`974c01a3df307f610eaeb0914be6173fc8fae2a4`

## ২০২৬-০৯-০৭ — AI Research Brain v1 বাস্তব কোডে সংযুক্ত

`backend/ai-research-brain.js`-এ intent classification, research instruction, evidence-first policy ও Bengali-first আচরণ বাস্তবায়ন করা হয়েছে।

`backend/worker-entry.js`-এ Brain v1 যুক্ত করা হয়েছে। পুরোনো chat API contract রাখা হয়েছে:
`POST {message, mode, language}`
এবং `answer` response field অপরিবর্তিত রাখা হয়েছে।

Brain module commit:
`9f4baf8af21ddfefb3fe11749807c7cfb7d7c0a0`

Worker integration commit:
`a6d01907ba4b589b7626a3bb7c1cf6d758fbed11`

## ২০২৬-০৯-০৭ — Research API → AI Research Brain সংযোগ

### উদ্দেশ্য
AI যেন শুধু Gemini-এর সাধারণ জ্ঞানের ওপর নির্ভর না করে, প্রকল্পের **read-only Research API** থেকে পাওয়া যাচাইযোগ্য গবেষণা-ডেটা প্রয়োজন হলে প্রসঙ্গ হিসেবে ব্যবহার করতে পারে।

### কী করা হয়েছে
`backend/worker-entry.js`-এ:
- সূরা/আয়াতের রেফারেন্স শনাক্ত করার ব্যবস্থা যোগ করা হয়েছে।
- নির্দিষ্ট রেফারেন্স পাওয়া গেলে Research API-এর read-only `/api/v1/ayah/{surah}/{ayah}` endpoint থেকে ডেটা নেওয়া হয়।
- সেই ডেটা AI Research Brain-এর context হিসেবে Gemini-কে দেওয়া হয়।
- AI response-এ `research_context_used` metadata যোগ করা হয়েছে।
- raw research data পরিবর্তন/overwrite করার কোনো ব্যবস্থা যোগ করা হয়নি।

### নিরাপত্তা
বর্তমান সফল chat API contract অপরিবর্তিত। Research API read-only। কাঁচা গবেষণা ডেটা AI দ্বারা পরিবর্তিত হয় না।

### Git commit
`2ff4248348d03c62e8016dbf5a62def6d29598ae`

### পরবর্তী ধাপ
প্রথমে ১:১ পরীক্ষাসহ live chat পরীক্ষা করতে হবে। সফল হলে পরবর্তী পর্যায়ে word/root/morphology/concordance retrieval ধাপে ধাপে যুক্ত করা হবে।
