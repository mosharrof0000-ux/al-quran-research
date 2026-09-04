# Workspace Data Model v1.0

এই ডকুমেন্ট Master Database-এর উপর ব্যবহারকারী-ভিত্তিক isolation-এর নকশা নির্ধারণ করে।

## Workspace

`workspace` হলো একজন ব্যবহারকারী/গবেষণা দলের নিজস্ব গবেষণা ক্ষেত্র।

প্রস্তাবিত ক্ষেত্র:
- workspace_id
- owner_user_id
- name
- status
- created_at
- updated_at
- base_dataset_release

## Membership

ভবিষ্যতে একটি workspace-এ একাধিক গবেষক থাকতে পারে।

- workspace_id
- user_id
- role (`OWNER`, `EDITOR`, `REVIEWER`, `VIEWER`)
- status

## Workspace isolation

Workspace-specific table-এর প্রতিটি record-এ `workspace_id` থাকবে। API এবং database query দু'জায়গাতেই scope enforce হবে।

## Correction proposal

কেউ ভুল ধরলে সরাসরি মূল record overwrite নয়। প্রথমে proposal:

- correction_id
- workspace_id
- entity_type
- entity_id
- proposed_value
- previous_version
- reason
- evidence_id
- proposer_user_id
- status (`PROPOSED`, `UNDER_REVIEW`, `ACCEPTED`, `REJECTED`, `WITHDRAWN`)
- reviewed_by
- reviewed_at
- created_at

## Version history

Accepted correction নতুন version তৈরি করবে। পুরোনো version audit history-তে থাকবে।

## Personal vs shared

`PRIVATE`: শুধু workspace সদস্যরা দেখতে পারবে।
`SHARED`: নির্দিষ্ট workspace/গবেষণা দলের সঙ্গে ভাগ করা যাবে।
`PUBLIC`: আলাদা প্রকাশনা স্তর; অনুমোদন ছাড়া private data public হবে না।

## Core dataset

Core Quran text বা মূল release-কে user workspace থেকে overwrite করা যাবে না। User analysis/core-এর উপর নিজের layer তৈরি করবে। এতে একই Quran foundation-এর উপর বিভিন্ন গবেষকের স্বাধীন বিশ্লেষণ সম্ভব হবে।

## ভবিষ্যৎ migration

এই মডেল SQLite pilot-এর সঙ্গে যুক্ত করা যাবে এবং পরে Cloudflare D1/অন্য relational database-এ migration করা যাবে।
