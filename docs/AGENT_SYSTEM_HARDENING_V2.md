# Project Agent System Hardening V2

## Task
- Task ID: AI-STRENGTHENING-002
- Agent Name: শামীম
- Agent ID: SHAMIM-AI-002
- Work Type: AI / Project Agent hardening
- Base: main
- Branch: agent/shamim-ai-strengthening-004

## Objective
Project Agent-কে এমনভাবে শক্তিশালী করা যাতে প্রতিটি নতুন কাজ আলাদা পরিচয়, Task/Session, isolated branch, prior-history inspection এবং mandatory handoff record-এর মাধ্যমে অনুসরণযোগ্য থাকে।

## Safety Gates
1. main সরাসরি লেখা যাবে না।
2. production merge/deploy Agent নিজে করবে না।
3. protected .github/workflows/, database/, migrations/, validation/, quran_research.db, schema.sql-এ Agent write করবে না।
4. নতুন non-instruction file হলে sibling instruction যাচাই করতে হবে।
5. অসম্পূর্ণ কাজ হলে BLOCKED/hand-off state ও successor নির্দেশনা রাখতে হবে।
6. LIVE VERIFIED বলা যাবে কেবল বাস্তব live/browser verification-এর পরে।

## Required runtime sequence
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

Failure/Pause:
BLOCKED বা ROLLED_BACK → HANDOFF_REQUIRED

## Current status
Source-level Project Agent strengthening exists in isolated branches. Runtime Cloudflare/secret/browser validation and website Agent Mode integration remain separate gates and must not be claimed as complete without evidence.