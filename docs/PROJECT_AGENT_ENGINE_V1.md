# Project Agent Engine v1 — Isolated

## উদ্দেশ্য
বর্তমান production Gemini chat Worker-কে না ছুঁয়ে একটি আলাদা Project Agent Engine তৈরি করা হয়েছে। Engine-এর কাজ হবে প্রকল্পের ফাইল পড়া, code/context বিশ্লেষণ করা এবং নিরাপদ agent/* branch-এ text-file পরিবর্তন করা।

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
1. project_read_file
2. project_list_directory
3. project_search_code
4. project_create_branch
5. project_write_file

## Agent identity + work history
প্রতিটি নতুন স্বতন্ত্র কাজের জন্য Agent Identity, Task ID, Session ID এবং আলাদা agent branch থাকতে হবে। বাংলা human-like নাম কাজের ধরন বোঝাতে ব্যবহার হবে। অসম্পূর্ণ কাজের জন্য বাধ্যতামূলক handoff record থাকবে এবং successor আলাদা identity হিসেবে নথিভুক্ত হবে। বিস্তারিত schema: AGENT_IDENTITY_REGISTRY.md, AGENT_WORK_LEDGER.md, AGENT_HANDOFF_PROTOCOL.md।

## Required secrets
- GEMINI_API_KEY
- GITHUB_TOKEN
- AGENT_ACCESS_TOKEN

## First rollout
প্রথমে engine-কে আলাদাভাবে deploy/test করতে হবে। সফল হলে পরে website-এর Gemini UI-তে একটি আলাদা Project Agent mode যুক্ত করা যাবে। Existing production chat, reader ও data pipeline এই engine-এর ব্যর্থতায় বন্ধ হবে না।

## Promotion gate
Agent branch → review → validation → explicit approval → main promotion → deployment verification.

## Current implementation status
v1 isolated engine বিদ্যমান। Identity/work-ledger/handoff contract এই branch-এ শক্তিশালী করা হয়েছে। এটি এখনও main-এ promoted নয় এবং production chat Worker অপরিবর্তিত রাখা হয়েছে।
