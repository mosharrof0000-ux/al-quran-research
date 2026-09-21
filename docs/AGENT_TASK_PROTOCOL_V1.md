# Project Agent Task Protocol v1

## উদ্দেশ্য
Project Agent-কে প্রতিটি নতুন কাজকে একটি স্বতন্ত্র, অনুসরণযোগ্য এবং পুনরায় গ্রহণযোগ্য Task হিসেবে পরিচালনা করতে হবে।

## Task identity
প্রতিটি request-এ:
- Task ID
- Agent Name
- Agent ID
- Session ID
- Work Type
- Parent Task ID (যদি থাকে)
- Isolated Branch

সংরক্ষিত থাকবে।

## Lifecycle
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

Failure states:
- BLOCKED
- ROLLED_BACK

## Rules
1. নতুন কাজ পুরনো Task ID পুনঃব্যবহার করবে না।
2. কাজের ধরন অনুযায়ী মানবসদৃশ বাংলা Agent Name দেওয়া হবে।
3. Agent Name প্রকল্পের assigned identity; এটি কোনো বাস্তব ব্যক্তির পরিচয় দাবি করে না।
4. Agent কাজ শুরু করার আগে প্রয়োজনীয় project rules ও বর্তমান implementation পড়বে।
5. পরিবর্তন isolated agent/* branch-এ হবে।
6. main বা production-এ সরাসরি write/deploy করা যাবে না।
7. অসম্পূর্ণ কাজের handoff বাধ্যতামূলক।
8. successor Agent original Agent-এর history মুছবে না।
9. verification ছাড়া কাজকে COMPLETE বলা যাবে না।
10. প্রতিটি task-এর শেষে changed files, commit, tests, blockers, remaining work এবং next action লিখতে হবে।

## Current task
- Agent Name: রাকিব
- Agent ID: AGENT-RAKIB-002
- Task ID: AGENT-TASK-ENGINE-002
- Work Type: Project Agent Task Lifecycle
- Branch: agent/rakib-task-engine-002
- Parent: AGENT-HARDENING-001
