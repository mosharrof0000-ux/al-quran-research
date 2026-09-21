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


## Active Task — 2026-09-21
- Task ID: AGENT-IDENTITY-001
- Requester: Project owner
- Agent Name: শাহীন
- Agent ID: SHAHIN-AGENT-IDENTITY-001
- Work Type: Project Agent শক্তিশালীকরণ / Identity & Handoff Foundation
- Status: WORKING
- Branch: agent/shahin-agent-identity-001
- Completed: identity registry, work ledger, handoff protocol, registry coverage
- Remaining: Agent runtime identity allocation, persistent task storage, browser/visual/console/network verification, self-repair loop, notification and soft-live-update integration
- Latest Commit: 0a015c5e4d3b4057829ca84c0e5beca03ce2b887
- Deployment: NOT DEPLOYED
- Live Verification: NOT RUN
- Next Step: implement runtime task/identity allocation in the isolated Project Agent engine; keep production unchanged until validation
