# Backend Dependency Map — 2026-09-08

## উদ্দেশ্য

এই নথি backend-এর একাধিক/ভার্সনযুক্ত ফাইলের ভূমিকা, বর্তমান ব্যবহারের প্রমাণ এবং cleanup-এর আগে নিরাপদ অবস্থান নথিভুক্ত করে। কোনো ফাইল শুধু নাম দেখে delete করা যাবে না।

## যাচাই করা বর্তমান AI request path

`design-preview-work-chat-v3-cloudflare-ai-2026-09-07.html`
→ `WORKER_URL`
→ `https://al-quran-research.mosharrof0000.workers.dev/`
→ Cloudflare Worker
→ `backend/wrangler.jsonc`
→ `worker-entry.js`

Deployment workflow-এ `backend`-কে working directory করে `wrangler deploy --config wrangler.jsonc` চালানো হয়। তাই `worker-entry.js` বর্তমানে **সক্রিয় Worker entrypoint** হিসেবে প্রমাণিত।

## যাচাই করা backend dependency

### 1. `worker-entry.js` — ACTIVE / প্রধান entrypoint

`wrangler.jsonc`-এর `main` সরাসরি `worker-entry.js` নির্দেশ করে। এই entrypoint বর্তমানে নিচের module-গুলো import করে:

- `worker.js`
- `research-api.js`
- `chat-recovery.js`
- `ai-research-brain.js`

অতএব এই চারটি module-কে বর্তমান Worker path-এর অংশ হিসেবে গণ্য করতে হবে।

### 2. `worker.js` — ACTIVE / primary worker implementation

`worker-entry.js` এটি import করে এবং fallback/recovery-এর আগে `worker.fetch(...)` হিসেবে ব্যবহার করে। তাই এটি active supporting implementation।

### 3. `research-api.js` — ACTIVE / Research API implementation

`worker-entry.js` এটি import করে। এটি Master Dataset-কে read-only API হিসেবে পরিবেশন করে এবং `/api/v1/status`, `/surah`, `/ayah`, `/word`, `/search` route পরিচালনা করে।

### 4. `ai-research-brain.js` — ACTIVE / research intelligence layer

`worker-entry.js` এটি import করে এবং `BRAIN_VERSION`, `BRAIN_SYSTEM`, `buildBrainPrompt` ব্যবহার করে। এটি প্রশ্নের ধরন ও গবেষণা-নিয়ম অনুযায়ী Gemini prompt তৈরিতে যুক্ত।

### 5. `chat-recovery.js` — ACTIVE / recovery layer

`worker-entry.js` এটি import করে এবং primary response ব্যর্থ হলে `recoverChat(...)` চালায়। বর্তমানে এটি Cloudflare Workers AI recovery model-গুলোর fallback path হিসেবে ব্যবহৃত।

### 6. `worker-entry-v1.2.js` — LEGACY CANDIDATE / NOT ACTIVE ENTRYPOINT

বর্তমান `wrangler.jsonc` এটিকে `main` হিসেবে নির্দেশ করে না। বর্তমান deployment workflow-ও `wrangler.jsonc` ব্যবহার করে। Git history-তে এটি 2026-09-05-এ `চ্যাটের জন্য AI rescue backend v1.2 যোগ করা হয়েছে` commit-এ যোগ হয়েছিল। বর্তমান main-branch code search-এ এর active caller/reference পাওয়া যায়নি। তাই এটি বর্তমান production entrypoint নয়; rollback/history-এর জন্য আপাতত রাখা হবে।

### 7. `chat-recovery-v3.js` — LEGACY CANDIDATE / CURRENT CALLER NOT FOUND

বর্তমান `worker-entry.js` `chat-recovery.js` ব্যবহার করে, `chat-recovery-v3.js` নয়। Git history-তে এটি 2026-09-05-এ `AI chat recovery fallback v3 যোগ করা` commit-এ যোগ হয়েছিল। বর্তমান main-branch code search-এ active caller/reference পাওয়া যায়নি। তাই বর্তমান Worker call path-এ এটি নেই; এখনই delete নয়।

### 8. `research-api-entry.js` — LEGACY/SEPARATE ENTRY CANDIDATE

এটি `research-api.js` import করে একটি আলাদা Research API entrypoint দেয়, কিন্তু বর্তমান `wrangler.jsonc`-এর `main` এটি নয়। Git history-তে এটি 2026-09-04-এ `Add safe Research API entry bridge` commit-এ যোগ হয়েছিল। বর্তমান main-branch deployment path-এ এর caller পাওয়া যায়নি। তাই এটি বর্তমান deployed Worker entrypoint নয়; এখনই delete নয়।

## Git history / deployment verification — 2026-09-08

- `worker-entry-v1.2.js`-এর historical addition: commit `7f3e473bdae2dce8596d6254554bcd78da865758`।
- `chat-recovery-v3.js`-এর historical addition: commit `1b506b79505f695a01c5eb210e51a779fa6476d3`।
- `research-api-entry.js`-এর historical addition: commit `e5ca2993cab6e9ff14d51fd0282f40d35ca1e605`।
- বর্তমান deployment workflow `.github/workflows/deploy-worker.yml` backend directory থেকে `wrangler deploy --config wrangler.jsonc` চালায়।
- বর্তমান `backend/wrangler.jsonc`-এ `main` = `worker-entry.js`।
- যাচাই করা তিনটি versioned/alternate file-এর কোনোটি বর্তমান `main` entrypoint নয়।
- বর্তমান main-branch code search-এ তিনটির active caller/reference পাওয়া যায়নি।

## গুরুত্বপূর্ণ সিদ্ধান্ত

এখন পর্যন্ত প্রমাণ **legacy candidate** অবস্থানকে সমর্থন করে, কিন্তু historical file থাকা মানেই নিরাপদে delete করা যাবে—এমন প্রমাণ হয়নি। তাই এই ধাপে কোনো backend file delete/rename করা হয়নি। প্রথমে rollback value, historical deployment usage এবং recovery necessity আলাদা করে মূল্যায়ন করতে হবে।

## সংরক্ষিত অবস্থা

- কোনো backend file এই ধাপে delete করা হয়নি।
- `chat.html`-এ কোনো পরিবর্তন করা হয়নি।
- বর্তমান Worker endpoint পরিবর্তন করা হয়নি।
- এই যাচাইয়ের আগে backup: `backup/pre-git-history-legacy-verification-2026-09-08` → `7a9ea14f13c95937041238f2a09a2d2e9b395ef2`।

## পরবর্তী নিরাপদ কাজ

1. এই তিনটি legacy candidate-এর deployment/rollback মূল্য আলাদা করে মূল্যায়ন করা।
2. প্রয়োজন হলে delete নয়, আগে `archive/legacy-backend/`-জাতীয় নিরাপদ archival পরিকল্পনার প্রস্তাব তৈরি করা।
3. কোনো cleanup-এর আগে backup + rollback path নিশ্চিত করা।
4. ভবিষ্যতে provider-neutral AI Adapter যোগ করা যেতে পারে, তবে বর্তমান production path না ভেঙে আলাদা adapter layer হিসেবে।
