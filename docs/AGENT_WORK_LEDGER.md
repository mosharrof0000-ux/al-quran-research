# Project Agent Work Ledger

এই ফাইল Project Agent-এর কাজের স্থায়ী audit trail-এর ভিত্তি।

## Required chain
Task ID → Requester → Agent Name → Agent ID → Session ID → Work Type → Branch → Changed Files → Commit → Review → Validation → Deployment → Live Verification → Notification → Handoff

## Status lifecycle
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

Failure/pause states:
- BLOCKED
- ROLLED_BACK
- INCOMPLETE_HANDOFF

## Handoff rule
কোনো agent কাজ অসম্পূর্ণ রেখে থামলে অবশ্যই লিখবে:
1. Agent Name
2. Task ID
3. কাজের উদ্দেশ্য
4. Completed
5. Remaining
6. Changed files
7. Branch
8. Commit
9. Tests already run
10. Known issues
11. Exact next step
12. Successor Agent Name/ID (যদি ইতিমধ্যে নির্ধারিত হয়)

অসম্পূর্ণ কাজকে কখনো Completed হিসেবে চিহ্নিত করা যাবে না।

## Current strengthening task
- Agent Name: শাহীন
- Agent ID: shaheen-system-strengthening-001
- Task ID: TASK-2026-09-21-SYSTEM-001
- Work Type: Project Agent / System Strengthening
- Branch: agent/shaheen-system-strengthening-001
- Parent: PR #63 isolated Project Agent Engine v1
- Status: WORKING
