# Chat Connection Research v1.0

তারিখ: 2026-09-05

## উদ্দেশ্য
বর্তমান AI Chat কেন প্রশ্নের উত্তর না দিয়ে Local fallback দেখাচ্ছিল এবং কীভাবে বর্তমান ডিজাইন অক্ষুণ্ণ রেখে সংযোগকে নির্ভরযোগ্য করা যায়—তার স্থায়ী গবেষণা রেকর্ড।

## বর্তমান কাঠামো
`chat.html` থেকে POST যায়:
`https://al-quran-research.mosharrof0000-ux.workers.dev/`

POST payload:
- message
- mode
- language: bn

Worker entry প্রথমে Research API দেখে; এরপর মূল `worker.js` চালায়। মূল Worker-এ Gemini primary এবং Cloudflare Workers AI fallback আছে।

## শনাক্ত সমস্যা
চ্যাট পেজে Worker response না এলে বা `answer` না থাকলে frontend সরাসরি Local fallback দেখায়। ফলে ব্যবহারকারীর কাছে প্রকৃত backend failure-এর বিস্তারিত দেখা যায় না।

আরও গুরুত্বপূর্ণ: মূল Worker-এর CORS এবং POST route ঠিক থাকলেও frontend `Content-Type: text/plain` দিয়ে JSON body পাঠাচ্ছে। Worker `request.json()` দিয়ে এটি গ্রহণ করার চেষ্টা করছে। সাধারণত এটি কাজ করতে পারে, কিন্তু connection diagnosis-এর জন্য request/response contract একরকম রাখা বেশি নির্ভরযোগ্য।

## বর্তমান recovery
`worker-entry.js` v1.6 মূল Worker-এর 5xx response হলে `chat-recovery.js` চালায়। Recovery model বর্তমানে `@cf/meta/llama-3.1-8b-instruct-fp8-fast`।

## গুরুত্বপূর্ণ সীমাবদ্ধতা
শুধু code পরিবর্তন করলেই Gemini key/Cloudflare account configuration নিশ্চিত হয় না। `GEMINI_API_KEY` এবং `AI` binding runtime-এ উপস্থিত কি না এবং Gemini request সফল কি না তা `/diagnostic` দিয়ে যাচাই করা প্রয়োজন।

## গবেষণা নীতি
- Website design পরিবর্তন করা যাবে না।
- Raw research data overwrite করা যাবে না।
- AI output verified research data নয়।
- নির্দিষ্ট আয়াতের পাঠ কেবল যাচাইযোগ্য dataset থেকে নিতে হবে।
- Backend সমস্যা হলে Local fallback ব্যবহার করা যাবে, কিন্তু সেটিকে AI-এর প্রকৃত উত্তর হিসেবে দেখানো যাবে না।
- Connection fix-এর পর সাধারণ প্রশ্ন ও নির্দিষ্ট গবেষণা প্রশ্ন—দুই ধরনের smoke test চালাতে হবে।

## সিদ্ধান্ত
বর্তমান Chat UI যথেষ্ট প্রস্তুত; মূল কাজ হলো reliable backend connection এবং diagnostic/verification। Research Laboratory vision অনুযায়ী Chat ভবিষ্যতে Universal Controller হতে পারে, কিন্তু বর্তমান ধাপে design বা বড় architecture replacement প্রয়োজন নেই।

## পরবর্তী যাচাই
1. Worker health GET
2. `/diagnostic` GET
3. POST সাধারণ প্রশ্ন
4. POST Fatiha 1:1 research প্রশ্ন
5. Gemini ব্যর্থ হলে Workers AI recovery
6. সব সফল হলে known-good snapshot সংরক্ষণ
