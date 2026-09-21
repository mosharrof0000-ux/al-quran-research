# Project Agent Engine v1.1 — Isolated Identity + Work Ledger

## উদ্দেশ্য
বর্তমান Gemini chat Worker ও Live Page-কে সরাসরি না বদলে একটি আলাদা Project Agent Engine তৈরি করা হয়েছে। Engine প্রকল্প বুঝবে, প্রয়োজনীয় ফাইল পড়বে, নিরাপদ agent/* branch-এ কাজ করবে এবং প্রতিটি নতুন কাজকে আলাদা মানব-সদৃশ Bengali Agent Identity ও Task ID দেবে।

## বর্তমান নিরাপত্তা
- production chat Worker অপরিবর্তিত
- main branch-এ write নিষিদ্ধ
- শুধুমাত্র agent/* branch
- protected: .github/workflows, database, migrations, validation, quran_research.db, schema.sql
- merge/deploy এই engine-এর ক্ষমতার বাইরে
- promotion আলাদা review/approval gate-এর অধীন

## নতুন Agent Identity ব্যবস্থা
প্রতিটি নতুন request-এর শুরুতেই:
1. Task ID তৈরি হয়
2. কাজের ধরন শনাক্ত হয়
3. কাজের ধরন অনুযায়ী Bengali human-like Agent Name নির্ধারিত হয়
4. একটি নতুন isolated branch তৈরি হয়
5. Task Ledger তৈরি হয়
6. Ledger-এর sibling instruction তৈরি হয়
7. তারপর Gemini agent কাজ শুরু করে

উদাহরণ role mapping:
- Icon/SVG → শাহীন
- Reader/Quran/Ayah → সুমন
- Chat/AI/Voice → শামীম
- Font/Typography → রাকিব
- Verification/Browser/Test → নাঈম
- Data/Database → আরিফ
- Agent/System/Engine → ইমরান
- General → সোহেল

একই base name হলেও প্রতিটি task-এর identity Task timestamp/random suffix দ্বারা আলাদা থাকে। ফলে ইতিহাসে কোন কাজ কোন Agent instance করেছে তা আলাদা করা যায়।

## Work Ledger
প্রতিটি task branch-এ:
docs/agent-work-ledger/TASK-*.md
এবং:
docs/agent-work-ledger/TASK-*.md.instruction.md

Ledger-এ থাকে:
- Agent Name
- Agent Role
- Task ID
- Branch
- Base Branch
- User Request
- Status
- Handoff rule
- পরবর্তী Agent-এর জন্য continuity তথ্য

পরবর্তী ধাপে task lifecycle অনুযায়ী একই ledger-এ completed files, commits, verification, remaining work, approval, deployment এবং live verification যোগ করা হবে।

## Task Lifecycle
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

ব্যর্থতা:
- BLOCKED
- ROLLED_BACK

## Handoff Rule
কাজ অসম্পূর্ণ হলে Agent অবশ্যই লিখবে:
- Completed
- Remaining
- Changed files
- Current branch
- Current commit
- Verification result
- Known issue
- Next action
- Successor Agent

অন্য Agent একই Task ID/branch গ্রহণ করলে তার নিজের Agent Identity আলাদাভাবে record হবে। Original Agent-এর ইতিহাস overwrite করা যাবে না।

## AI শক্তিশালী করার মূল স্তর
v1.1 থেকে foundation:
- identity-aware execution
- task isolation
- automatic branch creation
- automatic work ledger
- colocated instruction for each generated task record
- governance-aware system prompt
- 10-turn tool loop
- read/search/write tool separation

পরবর্তী controlled upgrades:
1. Browser/DOM/visual inspection
2. Console/network verification
3. automated repair loop
4. build/test result capture
5. explicit approval gate
6. live smoke verification
7. user notification
8. soft live update
9. multi-agent handoff chain
10. persistent Agent Communication Registry

## গুরুত্বপূর্ণ সীমা
এই v1.1 branch এখনও production main-এ promoted নয়। Worker deployment/secret configuration এবং real browser/live end-to-end test সফল না হওয়া পর্যন্ত এটিকে LIVE VERIFIED বলা যাবে না।
