# Multi-Workspace + Version + Correction Architecture v1.0

## উদ্দেশ্য
একই Research Engine বহু মানুষ ব্যবহার করতে পারবে, কিন্তু প্রত্যেক ব্যবহারকারীর গবেষণা, নোট, বিশ্লেষণ, সংশোধন ও কাস্টমাইজেশন আলাদা থাকবে।

## মূল নীতি
1. Core Quran data এবং গবেষণা কাঠামো আলাদা স্তর।
2. প্রতিটি ব্যবহারকারীর জন্য আলাদা `workspace_id`।
3. কোনো workspace-এর পরিবর্তন অন্য workspace-এ স্বয়ংক্রিয়ভাবে প্রয়োগ হবে না।
4. Raw data overwrite করা যাবে না।
5. সংশোধন হলে নতুন version/record তৈরি হবে।
6. সংশোধনের কারণ, প্রমাণ, প্রস্তাবকারী এবং যাচাইয়ের অবস্থা সংরক্ষিত হবে।
7. AI-generated analysis কখনো নিজে থেকে verified data প্রতিস্থাপন করবে না।
8. একাধিক বৈধ/বিতর্কিত analysis variant পাশাপাশি রাখা যাবে।
9. Public করা না হলে workspace-এর গবেষণা ব্যক্তিগত থাকবে।
10. ভবিষ্যতে shared/public research প্রকাশের জন্য আলাদা publication layer যোগ করা যাবে।

## ডেটা সীমারেখা

`Core Dataset`
- Quran text
- Surah/Ayah/Token identifiers
- স্থায়ী evidence references

`Workspace Data`
- ব্যক্তিগত গবেষণা
- নোট
- analysis variants
- correction proposals
- local customizations
- research claims

## Correction Flow

`ভুল শনাক্ত`
→ `Correction Proposal`
→ `কারণ + Evidence`
→ `Review`
→ `Accepted / Rejected / Needs Review`
→ `নতুন Version`
→ `Change History`

পুরোনো version মুছে যাবে না।

## Version ধারণা

প্রতিটি পরিবর্তন traceable হবে:
- entity/type
- entity id
- previous version
- new version
- change reason
- evidence
- proposer
- reviewer
- timestamp
- status

## ভবিষ্যৎ সম্প্রসারণ

বর্তমানে SQLite-compatible schema ব্যবহার করা হচ্ছে। পরে Cloudflare D1 বা অন্য relational backend যুক্ত হলেও এই workspace/version model অপরিবর্তিত রাখা যাবে।

## API নীতি

API-তে workspace scope সবসময় আলাদা থাকবে। ভবিষ্যতের authenticated request-এ server-side identity থেকে workspace নির্ধারণ করা হবে; client-এর পাঠানো workspace id-কে একা বিশ্বাস করা যাবে না।

প্রস্তাবিত resource pattern:
- `/api/v1/workspaces/:workspaceId`
- `/api/v1/workspaces/:workspaceId/research`
- `/api/v1/workspaces/:workspaceId/corrections`
- `/api/v1/workspaces/:workspaceId/versions`

Core public/read-only resources আলাদা থাকবে:
- `/api/v1/surah/:number`
- `/api/v1/ayah/:surah/:ayah`
- `/api/v1/word/:tokenId`
- `/api/v1/root/:rootId`

## নিরাপত্তা

Workspace isolation authentication/authorization স্তরে enforce করতে হবে। UI-তে workspace আলাদা দেখানো যথেষ্ট নয়। Database/API query-তেও workspace boundary বাধ্যতামূলক হতে হবে।
