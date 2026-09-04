# আল-কুরআন ভাষাভিত্তিক গবেষণা — Master Architecture v1.0

লক্ষ্য: প্রমাণ-নির্ভর, version-controlled এবং পুনরুৎপাদনযোগ্য কুরআন গবেষণা অবকাঠামো।

মূল নীতি:
- Raw data overwrite নয়; correction = নতুন version/proposal।
- AI-generated তথ্য স্বয়ংক্রিয়ভাবে verified নয়।
- Published claim-এর traceable evidence থাকতে হবে।
- Metric-এর definition, formula, dataset/version ও calculation run থাকতে হবে।
- মতভেদ মুছে না দিয়ে আলাদা analysis হিসেবে সংরক্ষণ করা হবে।
- Website হলো interface; database ও research records হলো মূল সম্পদ।
- Core data stable IDs দিয়ে সংরক্ষিত হবে; ভবিষ্যৎ extension core identity ভাঙবে না।
- Schema version, data version এবং website version আলাদা থাকবে।

বর্তমান Pilot: সূরা আল-ফাতিহা; প্রথম পরীক্ষা Q001001।

## Master architecture files
- `docs/master-architecture-v1.md` — সম্পূর্ণ data/website/backend architecture
- `docs/master-database-schema-v1.sql` — SQLite-compatible master schema
- `docs/website-data-map-v1.md` — বর্তমান website UI থেকে database/API mapping
- `data/fatiha.json` — Pilot data foundation; অসম্পূর্ণ অংশ verified না হওয়া পর্যন্ত verified হিসেবে গণ্য নয়
- `docs/research-laboratory-vision-v1.md` — ভবিষ্যৎ বৃহৎ Research Laboratory, Tool, Workspace ও Universal Chat Controller-এর Vision
- `docs/backup-restore-policy-v1.md` — প্রতিটি গুরুত্বপূর্ণ কাজের version, backup, known-good reference ও দ্রুত restore-এর স্থায়ী নীতি

## Data flow
`Database -> Research API v1 -> Website -> AI Chat`

## Long-term direction
আল-কুরআন গবেষণা এই প্রকল্পের প্রথম গবেষণা-ক্ষেত্র। ভবিষ্যতে একই Core Engine-এর উপর বিভিন্ন Research Domain, Tool, ব্যক্তিগত Workspace, Tool sharing/promotion এবং Chat-controlled Tool ecosystem তৈরি করা হবে।

বর্তমান website design অক্ষুণ্ণ রেখে database architecture ও ভবিষ্যৎ laboratory engine ধাপে ধাপে বাস্তবায়ন করা হবে। কোনো পরিবর্তন করার পর version/backup/reference রেখে known-good অবস্থায় ফিরে যাওয়ার পথ বজায় রাখতে হবে।
