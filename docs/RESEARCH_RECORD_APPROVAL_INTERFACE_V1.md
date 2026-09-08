# Research Record Approval Interface V1

তারিখ: 2026-09-08

## উদ্দেশ্য

AI গবেষণা-ফলকে সরাসরি Master Dataset বা research record-এ লিখে না দিয়ে মানব অনুমোদনের জন্য একটি পরিষ্কার, পুনরায় পরীক্ষা করা যায় এমন interface দেওয়া।

## Interface

ওয়েব পেজ: `research-approval.html`

এটি:
- `PENDING_REVIEW` proposal JSON গ্রহণ করে;
- JSON কাঠামো পরীক্ষা করে;
- `source_refs`, `scope.ayah_id`, `save_policy` এবং status দেখায়;
- proposal JSON কপি করার সুবিধা দেয়;
- Approval Workflow-এর GitHub Actions পেজে নিয়ে যায়;
- নিজে কোনো GitHub write করে না;
- নিজে `VERIFIED` status সেট করে না।

## নিরাপত্তা প্রবাহ

`AI research result`
→ `PENDING_REVIEW proposal`
→ `Approval Interface validation`
→ `Human review`
→ `GitHub Actions Approval Workflow`
→ `new immutable Version`
→ `supersedes = previous record`
→ `old Version remains intact`
→ `master dataset remains unchanged`

## গুরুত্বপূর্ণ সীমা

Interface থেকে সরাসরি GitHub API write বা approval bypass করা হয়নি। Approval credential/token browser-এর মধ্যে রাখা হয়নি। প্রকৃত save এখনও `.github/workflows/research-record-approval.yml`-এর মানব-চালিত workflow-এর মাধ্যমে হয়।

## Acceptance criteria

- [x] আলাদা approval interface তৈরি
- [x] PENDING_REVIEW validation
- [x] source/provenance পরিচয় দেখানো
- [x] approval workflow navigation
- [x] no direct browser write
- [x] no master dataset overwrite
- [x] old version preservation policy বজায়
- [x] `chat.html` পরিবর্তন করা হয়নি

## Backup

পরিবর্তনের আগে backup branch: `backup/pre-approval-interface-workflow-2026-09-08`
