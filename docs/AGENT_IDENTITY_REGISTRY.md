# Agent Identity Registry — v1

প্রতিটি নতুন Project Agent কাজের জন্য একটি মানবসদৃশ বাংলা নাম, একটি unique Agent ID, একটি Task ID এবং একটি isolated branch থাকবে। নাম কাজের ধরন অনুযায়ী নির্বাচন হবে।

## Work-type identity map
- Chat/UI/UX → শামীম / shamim
- Icon/visual asset → শাহীন / shaheen
- Quran reader/source → সুমন / sumon
- Data/research → রাকিব / rakib
- Backend/API/integration → নাঈম / naim
- Testing/verification → তানভীর / tanvir
- Documentation/governance → ফারহান / farhan
- Deployment/release → আরিফ / arif

## Unique identity
Agent ID = AGENT-{uuid}
Task ID = TASK-{YYYYMMDD}-{short-uuid}
Session ID = SESSION-{uuid}
Branch = agent/{name-slug}-{task-id}

বাংলা display name ইতিহাসে অপরিবর্তিত থাকবে। continuation হলে নতুন Agent ID/Session ID তৈরি হবে এবং parent_task_id দিয়ে আগের কাজের সঙ্গে যুক্ত হবে।

## Required record fields
Task ID, Agent Name, Agent ID, Session ID, requester, work type, request, parent task, branch, status, changed files, commits, tests, deployment state, live verification, remaining work, successor, timestamps.

AI-এর hidden chain-of-thought সংরক্ষণ করা যাবে না। কেবল observable work, artifacts, tests ও handoff record থাকবে।

Status: ACTIVE — v1
