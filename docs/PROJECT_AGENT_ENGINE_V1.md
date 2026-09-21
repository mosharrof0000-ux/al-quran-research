# Project Agent Engine v1.1 — Isolated & Identity-Aware

## উদ্দেশ্য
বর্তমান Gemini chat Worker-কে না ছুঁয়ে একটি আলাদা Project Agent Engine তৈরি করা হয়েছে। Engine-এর কাজ হবে প্রকল্পের ফাইল পড়া, code/context বিশ্লেষণ করা এবং নিরাপদ agent/* branch-এ text-file পরিবর্তন করা।

## Isolation rule
- আলাদা Cloudflare Worker: al-quran-research-project-agent
- production chat Worker-এর code path অপরিবর্তিত
- main branch-এ write নিষিদ্ধ
- শুধু agent/* branch-এ write
- merge নিষিদ্ধ
- production deploy নিষিদ্ধ
- .github/workflows, database, migrations, validation, quran_research.db এবং schema.sql agent write থেকে protected
- user approval ছাড়া main-এ promotion নয়

## Gemini tool layer
Gemini function calling ব্যবহার করে পাঁচটি tool:
1. project_read_file
2. project_list_directory
3. project_search_code
4. project_create_branch
5. project_write_file

Gemini নিজে GitHub পরিবর্তন করে না; Worker tool call গ্রহণ করে GitHub API-তে নিরাপদভাবে কাজ সম্পন্ন করে।

## Required secrets
Cloudflare Worker secrets হিসেবে আলাদাভাবে দিতে হবে:
- GEMINI_API_KEY
- GITHUB_TOKEN
- AGENT_ACCESS_TOKEN

GITHUB_TOKEN-এর জন্য repository Contents write permission প্রয়োজন। Workflow path পরিবর্তনের permission intentionally দেওয়া হয়নি।

## First rollout
প্রথমে engine-কে আলাদাভাবে deploy/test করতে হবে। সফল হলে পরে website-এর Gemini UI-তে একটি আলাদা Project Agent mode যুক্ত করা যাবে। Existing production chat, reader ও data pipeline এই engine-এর ব্যর্থতায় বন্ধ হবে না।

## Promotion gate
Agent branch → review → validation → explicit approval → main promotion → deployment verification.

## Current implementation status
Code and configuration are isolated in backend/project-agent/. This branch is a safety branch and has not been promoted to main.


## Identity / Handoff Governance
Every task receives Agent Name + Agent ID + Task ID + Session ID + isolated branch. Incomplete/paused/blocked work requires a Handoff Record. Successor work retains the Parent Task ID. See `docs/AGENT_IDENTITY_REGISTRY.md`, `docs/AGENT_HANDOFF_PROTOCOL.md`, and `docs/AGENT_WORK_LEDGER.md`.


## Agent Identity & Task Tracking — v1.1
- বর্তমান hardening worker identity: **শাহীন** (shaheen-agent-hardening-001)।
- প্রতিটি request-এ `task_id` ও `session_id` তৈরি/গ্রহণ করা হয়।
- response-এ agent name, agent id, task id, session id এবং বর্তমান status ফেরত দেওয়া হয়।
- কাজের status vocabulary Work Ledger-এর সঙ্গে সামঞ্জস্যপূর্ণ।
- tool-loop 8 থেকে 12 turn করা হয়েছে এবং conversation history 24 message-এ সীমিত রাখা হয়েছে।
- malformed reader decoding path সংশোধন করা হয়েছে।
- code search ফলাফলে query ও branch context ফেরত দেওয়া হয়।
- এই hardening branch এখনও isolated; main/production promotion করা হয়নি।

## নিরাপত্তা
Agent Name কোনো permission নয়। Branch + Task ID + Commit-ই পরিবর্তনের audit identity। অসম্পূর্ণ কাজ হলে Handoff Protocol অনুসরণ করতে হবে।
