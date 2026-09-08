# Legacy Backend Cleanup Proposal — 2026-09-08

## উদ্দেশ্য

পুরোনো/বিকল্প backend ফাইল সরানোর আগে তাদের বর্তমান ব্যবহার, rollback value এবং archival value আলাদা করে মূল্যায়ন করা। এই প্রস্তাব production path পরিবর্তন করে না।

## বর্তমান production path

`backend/wrangler.jsonc` → `worker-entry.js` → `worker.js` + `research-api.js` + `chat-recovery.js` + `ai-research-brain.js`।

Deployment workflow `backend` directory থেকে `wrangler deploy --config wrangler.jsonc` চালায়।

## Legacy candidate মূল্যায়ন

### `worker-entry-v1.2.js`
- Historical addition: `7f3e473bdae2dce8596d6254554bcd78da865758`
- বর্তমান Wrangler `main` নয়।
- বর্তমান main-branch caller/reference পাওয়া যায়নি।
- মূল্য: পুরোনো rescue/rollback implementation হিসেবে সীমিত।
- সুপারিশ: এখনই delete নয়; আগে archive করা যেতে পারে।

### `chat-recovery-v3.js`
- Historical addition: `1b506b79505f695a01c5eb210e51a779fa6476d3`
- বর্তমান `worker-entry.js` এটি import করে না।
- বর্তমান main-branch caller/reference পাওয়া যায়নি।
- মূল্য: পুরোনো recovery implementation হিসেবে সীমিত।
- সুপারিশ: archive candidate।

### `research-api-entry.js`
- Historical addition: `e5ca2993cab6e9ff14d51fd0282f40d35ca1e605`
- বর্তমান Wrangler `main` নয়।
- বর্তমান deployment path-এ caller পাওয়া যায়নি।
- মূল্য: আলাদা Research API bridge হিসেবে ভবিষ্যৎ ব্যবহারের সম্ভাবনা আছে।
- সুপারিশ: delete নয়; archive/standalone reference হিসেবে রাখা ভালো।

## প্রস্তাবিত নিরাপদ পদ্ধতি

1. কোনো file সরাসরি delete না করা।
2. আগে repository-এর ভিতরে `archive/legacy-backend/`-এ move করার পরিকল্পনা করা অথবা Git history-তেই রেখে main tree থেকে অপসারণের পরিকল্পনা করা।
3. Archive করলে প্রতিটি ফাইলের origin commit, শেষ যাচাইকৃত active status এবং restore পদ্ধতি লিখে রাখা।
4. Cleanup-এর আগে নতুন backup branch তৈরি করা।
5. Cleanup-এর পরে Worker smoke test এবং exact live chat page পরীক্ষা করা।
6. ব্যর্থ হলে backup branch/previous commit থেকে rollback করা।

## সিদ্ধান্ত

বর্তমান প্রমাণ অনুযায়ী তিনটি file-ই **archive candidate**, কিন্তু কোনোটি production dependency নয়। তবে `research-api-entry.js`-এর সম্ভাব্য ভবিষ্যৎ standalone API value থাকায় এটিকে সবচেয়ে কম আগ্রাসীভাবে handle করা উচিত।

**এই নথি নিজে কোনো cleanup করে না।** Cleanup একটি আলাদা অনুমোদনযোগ্য পরিবর্তন হিসেবে গণ্য হবে।
