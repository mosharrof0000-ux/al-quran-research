# Project Agent Engine v2 — Isolated Autonomous Core

## উদ্দেশ্য
বর্তমান production Gemini chat Worker-কে না ছুঁয়ে আলাদা Project Agent Engine তৈরি করা হয়েছে। Engine প্রকল্পের governance/context পড়বে, কাজের ধরন শনাক্ত করবে, বাংলা human-like Agent identity দেবে, আলাদা task branch তৈরি করবে, Gemini-কে controlled tools দেবে এবং observable work metadata ফেরত দেবে।

## v2 শক্তিশালীকরণ
- Work-type based Agent Name: শামীম, শাহীন, সুমন, রাকিব, নাঈম, তানভীর, ফারহান, আরিফ
- unique Agent ID, Task ID, Session ID
- প্রতি task-এর isolated agent/* branch
- parent_task_id দিয়ে continuation/takeover chain
- task branch metadata response-এ ফেরত
- Agent Work Ledger এবং Handoff Protocol
- structured Cloudflare observability/logging
- Gemini tool loop 8 থেকে 10 turns
- existing protected paths অপরিবর্তিত

## Isolation rule
- আলাদা Cloudflare Worker: al-quran-research-project-agent
- production chat Worker-এর code path অপরিবর্তিত
- main branch-এ write নিষিদ্ধ
- শুধু agent/* branch-এ write
- merge নিষিদ্ধ
- production deploy নিষিদ্ধ
- .github/workflows, database, migrations, validation, quran_research.db এবং schema.sql agent write থেকে protected
- user approval ছাড়া main-এ promotion নয়

## Identity / continuity
প্রতিটি কাজের observable chain:
Task ID → Agent Name/ID → Session ID → Work Type → Branch → Files → Commits → Tests → Review → Deployment State → Live Verification → Notification → Handoff

অসম্পূর্ণ কাজের ক্ষেত্রে INCOMPLETE/HANDOFF record বাধ্যতামূলক। Successor নতুন identity নেবে; original worker-এর ইতিহাস থাকবে।

বিস্তারিত:
- docs/AGENT_IDENTITY_REGISTRY.md
- docs/AGENT_WORK_LEDGER.md
- docs/AGENT_HANDOFF_PROTOCOL.md

## Gemini tool layer
1. project_read_file
2. project_list_directory
3. project_search_code
4. project_create_branch
5. project_write_file

Gemini নিজে GitHub পরিবর্তন করে না; Worker tool call গ্রহণ করে GitHub API-তে নিরাপদভাবে কাজ সম্পন্ন করে।

## Required secrets
- GEMINI_API_KEY
- GITHUB_TOKEN
- AGENT_ACCESS_TOKEN

## Observability
Worker Logs এবং invocation logging enabled রাখা হয়েছে যাতে task শুরু/শেষ/ব্যর্থতার structured event দেখা যায়। Cloudflare Workers Logs/Observability বর্তমান debugging এবং production diagnosis-এর জন্য ব্যবহৃত হবে।

## Promotion gate
Agent branch → review → validation → explicit approval → main promotion → deployment verification.

## Current implementation status
v2 core is implemented on isolated branch agent/shamim-agent-core-003 and has not been promoted to main. Production deployment has not been claimed.

Status: REVIEW — v2
