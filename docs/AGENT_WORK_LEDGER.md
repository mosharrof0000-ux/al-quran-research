# Agent Work Ledger — v1.0

## কাজের স্থায়ী chain
Task ID → Agent Name/ID → Session ID → Branch → Changed Files → Commit → Review → Validation → Deployment → Live Verification → Notification → Handoff

## Status lifecycle
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

ব্যর্থ/অসম্পূর্ণ অবস্থায়:
BLOCKED / ROLLED_BACK / HANDOFF_PENDING

## Mandatory record
প্রতিটি Task record-এ থাকতে হবে:
- Task ID
- Requester
- Agent Name
- Agent ID
- Work Type
- Parent Task ID (যদি থাকে)
- Session ID
- Branch
- Request
- Completed
- Remaining
- Changed Files
- Commit
- Tests/Verification
- Deployment state
- Live verification
- Handoff
- Next Agent
- Timestamp

## Incomplete work
কোনো Agent কাজ থামালে/ব্যর্থ হলে incomplete handoff বাধ্যতামূলক। পরবর্তী Agent নতুন identity নিয়ে কাজ নেবে এবং পূর্ববর্তী Agent-কে predecessor হিসেবে উল্লেখ করবে।
