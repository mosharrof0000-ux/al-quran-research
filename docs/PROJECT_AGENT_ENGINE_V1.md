# Project Agent Engine v1.1 — Isolated

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

## Agent identity and continuity
প্রতিটি request-এর জন্য Agent Name, Agent ID, Task ID, Session ID, Task Type এবং optional Parent Task ID তৈরি হয়। Bengali human-like name কাজের ধরন অনুযায়ী নির্ধারিত হয়। Takeover হলে successor নতুন Agent ID পায় এবং predecessor history অক্ষুণ্ণ থাকে।

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
