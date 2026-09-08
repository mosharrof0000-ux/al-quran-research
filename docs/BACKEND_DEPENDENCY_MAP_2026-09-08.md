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

বর্তমান `wrangler.jsonc` এটিকে `main` হিসেবে নির্দেশ করে না। বর্তমান deployment workflow-ও `wrangler.jsonc` ব্যবহার করে। তাই এটি বর্তমান production entrypoint নয়। তবে পুরোনো deployment/history বা rollback-এর প্রমাণ না দেখে delete করা যাবে না।

### 7. `chat-recovery-v3.js` — LEGACY CANDIDATE / CURRENT CALLER NOT FOUND

বর্তমান `worker-entry.js` `chat-recovery.js` ব্যবহার করে, `chat-recovery-v3.js` নয়। তাই বর্তমান Worker call path-এ এটি পাওয়া যায়নি। পুরোনো workflow/commit/history-তে ব্যবহার ছিল কি না যাচাই না করে delete নয়।

### 8. `research-api-entry.js` — LEGACY/SEPARATE ENTRY CANDIDATE

এটি `research-api.js` import করে একটি আলাদা Research API entrypoint দেয়, কিন্তু বর্তমান `wrangler.jsonc`-এর `main` এটি নয়। তাই এটি বর্তমান deployed Worker entrypoint নয়। ভবিষ্যৎ আলাদা API deployment-এর জন্য রাখা হতে পারে; delete নয়।

## গুরুত্বপূর্ণ যাচাই ফল

- বর্তমান deployed Worker-এর entrypoint: **`worker-entry.js`**।
- বর্তমান entrypoint-এর চারটি সরাসরি dependency: **`worker.js` + `research-api.js` + `chat-recovery.js` + `ai-research-brain.js`**।
- `worker-entry-v1.2.js`, `chat-recovery-v3.js`, `research-api-entry.js` বর্তমানে মূল deployment configuration-এর entrypoint/caller নয়।
- কোনো backend file এই ধাপে delete করা হয়নি।
- `chat.html`-এ কোনো পরিবর্তন করা হয়নি।
- বর্তমান Worker endpoint পরিবর্তন করা হয়নি।

## পরবর্তী নিরাপদ কাজ

1. পুরোনো versioned backend ফাইলগুলোর Git history/Actions workflow reference যাচাই করা।
2. কোনো পুরোনো ফাইল কেবল legacy candidate হিসেবে নিশ্চিত হলে তার জন্য আলাদা cleanup proposal তৈরি করা।
3. Cleanup-এর আগে অবশ্যই নতুন backup এবং rollback path নিশ্চিত করা।
4. ভবিষ্যতে provider-neutral AI Adapter যোগ করা যেতে পারে, তবে বর্তমান production path না ভেঙে আলাদা adapter layer হিসেবে।
