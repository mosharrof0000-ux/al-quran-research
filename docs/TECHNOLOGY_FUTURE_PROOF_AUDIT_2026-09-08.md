# Technology & Future-Proof Audit — 2026-09-08

## Audit status

এই audit-এর উদ্দেশ্য হলো বর্তমান কাজ করা গবেষণা ব্যবস্থা অযথা পরিবর্তন না করে প্রযুক্তিগত ঝুঁকি, ভবিষ্যৎ নির্ভরতা এবং রক্ষণাবেক্ষণের প্রয়োজন চিহ্নিত করা।

**নীতি:** যা ভালো আছে তা রাখা; যা ভুল তা প্রমাণসহ ঠিক করা; যা অপ্রয়োজনীয় তা আগে শনাক্ত করা; পুরোনো/legacy জিনিস অনুমোদিত প্রমাণ ছাড়া মুছে না ফেলা।

## Current architecture

Research Data → Research API → Research Brain → AI provider adapter/worker → Website Chat

বর্তমান AI provider ও hosting প্রযুক্তি পরিবর্তনযোগ্য স্তর। Research Data, Evidence, IDs, Versions, History, Rules এবং API Contract স্থায়ী সম্পদ হিসেবে বিবেচিত হবে।

## Immediate corrections completed

### 1. AI Chat smoke-test endpoint

Smoke test-এ ভুল Worker domain ছিল। সেটি বর্তমান Worker domain-এ সংশোধন করা হয়েছে।

### 2. Unsafe automatic Surah-index workflow

`.github/workflows/integrate-surah-index.yml` প্রতিটি `main` push-এ `index.html` পরিবর্তন করার ক্ষমতা রাখত এবং `contents: write` ব্যবহার করত। বর্তমান `index.html` একটি নির্দিষ্ট research interface-এ redirect করে। ফলে এই workflow ভবিষ্যতে মূল entry point অনিচ্ছাকৃতভাবে বদলে দিতে পারত।

Workflow-টি main থেকে সরানো হয়েছে। পূর্ববর্তী অবস্থার backup branch-এ তার সম্পূর্ণ history সংরক্ষিত আছে। ভবিষ্যতে সূরা index দরকার হলে আলাদা data-driven, reviewable implementation করতে হবে; সরাসরি main entry page overwrite করা যাবে না।

## Systems to preserve

- Research Constitution / governance rules
- Master Project and Project State documentation
- Research data files and version history
- Research API contract
- AI Research Brain specification
- Backup and continuity system
- Current working design-preview chat page
- Cloudflare Worker deployment path
- GitHub Pages hosting path, যতক্ষণ এটি উপযুক্ত ও কার্যকর

## Systems requiring further inventory

### Backend

নিম্নোক্ত versioned/legacy-looking files-এর dependency map করতে হবে, কিন্তু এখনই delete করা যাবে না:

- `backend/worker-entry.js`
- `backend/worker-entry-v1.2.js`
- `backend/worker.js`
- `backend/chat-recovery.js`
- `backend/chat-recovery-v3.js`
- `backend/research-api.js`
- `backend/research-api-entry.js`
- `backend/ai-research-brain.js`

প্রতিটির জন্য active caller, deployment path, purpose, overlap এবং rollback value নির্ধারণ করতে হবে।

### Workflows

বর্তমান workflows-কে Active / Required / Manual / Legacy / Risky হিসেবে শ্রেণিবদ্ধ করতে হবে। কোনো workflow শুধু পুরোনো নাম বা failure দেখে মুছে ফেলা যাবে না।

## Future-proof improvements

### Technology Watch

`docs/TECHNOLOGY_WATCH.md`-এ provider availability, pricing/free tier, security, retirement, migration এবং viewer experience নজরদারির registry রাখা হয়েছে।

### Provider independence

ভবিষ্যৎ architecture-এ provider-specific code যতটা সম্ভব একটি adapter layer-এর মধ্যে সীমাবদ্ধ রাখা হবে। লক্ষ্য:

`Research Core → Research API → AI Adapter → Provider`

এতে Gemini, Cloudflare বা অন্য কোনো provider পরিবর্তন হলেও research core অক্ষত থাকবে।

### Link Integrity

প্রকল্পের গুরুত্বপূর্ণ links-এর জন্য source → redirect → final target → title/page identity পরীক্ষা বাধ্যতামূলক করা হয়েছে/হবে। ভুল related page-কে requested page হিসেবে দেওয়া যাবে না।

### Viewer/User watch

মোবাইল ব্যবহার, accessibility, Bengali-first UI, দ্রুত search, evidence visibility, low-bandwidth support, export/offline সুবিধা এবং browser/device compatibility ভবিষ্যৎ উন্নয়নের অংশ হবে।

## Items intentionally NOT changed

- Research data
- `chat.html`
- Current design layout/colors/functionality, যদি না নির্দিষ্ট অনুমোদন থাকে
- Legacy backend files
- Other workflows, unless a concrete safety/correctness issue is verified
- Existing backup history

## Next work queue

1. Backend dependency map
2. Workflow inventory and failure classification
3. Link Integrity live verification
4. Provider-specific code inventory
5. AI Adapter Layer proposal (implementation only after evidence and approval)
6. Dependency/version/retirement registry
7. Viewer technology improvement watch
8. Periodic Technology Watch report

## Change discipline

প্রতিটি বাস্তব পরিবর্তন:

**দেখা → বোঝা → জানানো → অনুমতি → Backup → কাজ → পরীক্ষা → সংরক্ষণ → যাচাই → রিপোর্ট**

এই audit নিজে কোনো research claim-এর সত্যতা প্রমাণ করে না; এটি project technology/governance audit।
