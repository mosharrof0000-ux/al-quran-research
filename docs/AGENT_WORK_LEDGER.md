# Agent Work Ledger

প্রতিটি কাজের শুরু থেকে শেষ পর্যন্ত audit trail সংরক্ষণ করতে হবে।

## Required chain
Task ID → Requester → Agent Name/ID → Session ID → Work Type → Parent Task → Branch → Changed Files → Commits → Tests → Review → Approval → Deployment → Live Verification → Notification → Handoff.

## Status lifecycle
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE.

ব্যর্থতার ক্ষেত্রে: BLOCKED বা ROLLED_BACK.

## Current active work
- Agent Name: রাকিব
- Agent ID: AGENT-RAKIB-002
- Task ID: AGENT-TASK-ENGINE-002
- Work Type: Project Agent Task Lifecycle
- Parent Task: AGENT-HARDENING-001
- Branch: agent/rakib-task-engine-002
- Current Status: WORKING

## Completion record
প্রতিটি task record-এ অন্তত থাকবে:
- কী চাওয়া হয়েছিল
- কী পড়া/পরীক্ষা করা হয়েছে
- কী পরিবর্তন হয়েছে
- কী পরিবর্তন হয়নি
- changed files
- branch ও commit
- test results
- live result
- remaining work
- next action
- timestamp

কোনো Agent “done” বলবে না যতক্ষণ না নির্ধারিত verification শেষ হয়েছে।
