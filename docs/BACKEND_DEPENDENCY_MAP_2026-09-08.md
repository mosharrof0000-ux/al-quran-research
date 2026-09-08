# Backend Dependency Map — 2026-09-08

## উদ্দেশ্য

এই নথি backend-এর একাধিক/ভার্সনযুক্ত ফাইলের ভূমিকা, বর্তমান ব্যবহারের প্রমাণ এবং cleanup-এর আগে নিরাপদ অবস্থান নথিভুক্ত করে। কোনো ফাইল শুধু নাম দেখে delete করা যাবে না।

## বর্তমান AI request path

`design-preview-work-chat-v3-cloudflare-ai-2026-09-07.html`
→ `WORKER_URL`
→ `https://al-quran-research.mosharrof0000.workers.dev/`
→ Cloudflare Worker

বর্তমান chat page-এ সরাসরি provider-neutral adapter নেই; browser থেকে Worker endpoint-এ POST যায়। তাই provider-neutral adapter-কে ভবিষ্যৎ উন্নয়ন হিসেবে রাখা হয়েছে, তাৎক্ষণিক migration নয়।

## Backend file inventory

নিচের ফাইলগুলো repository-তে পাওয়া backend/AI-related নাম হিসেবে inventory করা হয়েছে:

- `worker.js` — Worker implementation candidate; active কিনা deployment configuration দিয়ে নিশ্চিত করতে হবে।
- `worker-entry.js` — Worker entry candidate; deployment reference দিয়ে active কিনা নিশ্চিত করতে হবে।
- `worker-entry-v1.2.js` — versioned entry candidate; legacy/experimental হওয়ার সম্ভাবনা আছে, কিন্তু প্রমাণ ছাড়া delete নয়।
- `chat-recovery.js` — chat recovery logic candidate; caller/deployment reference পরীক্ষা প্রয়োজন।
- `chat-recovery-v3.js` — versioned recovery logic candidate; caller/deployment reference পরীক্ষা প্রয়োজন।
- `research-api.js` — research API implementation candidate।
- `research-api-entry.js` — research API entry candidate।
- `ai-research-brain.js` — project-specific AI research logic candidate; active call path যাচাই প্রয়োজন।

## সিদ্ধান্ত

1. কোনো backend file এই audit-এ delete করা হয়নি।
2. Active/legacy status নির্ধারণের জন্য deployment config, workflow এবং code callers-এর পূর্ণ cross-reference পরবর্তী ধাপে করতে হবে।
3. বর্তমান working Worker endpoint পরিবর্তন করা হয়নি।
4. Cleanup-এর আগে আলাদা backup বাধ্যতামূলক থাকবে।

## পরবর্তী নিরাপদ কাজ

- Wrangler/deployment configuration খুঁজে active entrypoint নির্ধারণ।
- GitHub Actions workflow-এ কোন backend file deploy/modify হয় তা নির্ধারণ।
- `import`, `fetch`, `Worker`, `research-api`, `ai-research-brain` caller/reference cross-reference করা।
- তারপর প্রতিটি file-কে `active`, `supporting`, `legacy candidate`, `experimental`, বা `unknown` হিসেবে চিহ্নিত করা।
- প্রমাণ ছাড়া cleanup নয়।
