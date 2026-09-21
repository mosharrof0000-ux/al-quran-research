# Project Agent Engine v2 — Isolated Autonomous Core

## উদ্দেশ্য
Project Agent-কে শুধু Gemini chat না রেখে **identity + task + branch + audit + handoff**-ভিত্তিক autonomous engineering core করা হয়েছে। Production chat Worker, reader এবং data pipeline এই isolated engine-এর বাইরে থাকবে।

## v2 capabilities
- প্রতিটি নতুন কাজের জন্য আলাদা Task ID
- কাজের ধরন অনুযায়ী Bengali human-like Agent Name
- Agent ID + Session ID দিয়ে নামের uniqueness
- আলাদা `agent/*` branch
- কাজের শুরুতেই persistent task record
- GitHub tool-call audit
- পরিবর্তিত file ও commit tracking
- কাজ অসম্পূর্ণ থাকলে remaining/handoff record
- successor agent-এর জন্য parent Task ID
- main merge ও production deployment Worker-এর বাইরে
- protected paths: `.github/workflows/`, `database/`, `migrations/`, `validation/`, `quran_research.db`, `schema.sql`

## Safety
Agent কখনো main-এ সরাসরি write করবে না। Production deployment-কে successful ধরে নেবে না। Review → validation → explicit approval → promotion → live verification আলাদা ধাপ।

## Identity examples
- আইকন → শাহীন
- Chat/UI → শামীম
- Reader/Qur'an → সুমন
- Notification/Version → রাকিব
- Browser/Test → নাঈম
- Data/Database → রিফাত
- Security/Auth → তানভীর
- Documentation/Handoff → আরিফ

নাম identity-এর একমাত্র key নয়; Agent ID + Task ID + Session ID আসল unique identity।

## Required secrets
- `GEMINI_API_KEY`
- `GITHUB_TOKEN`
- `AGENT_ACCESS_TOKEN`
- Cloudflare deployment secrets remain required by the isolated deployment workflow.

## Promotion gate
Agent branch → review → validation → explicit approval → main promotion → deployment verification → live smoke test → notification.

## Current status
v2 core code is on an isolated safety branch. It has not been promoted to main and has not changed the production chat Worker.
