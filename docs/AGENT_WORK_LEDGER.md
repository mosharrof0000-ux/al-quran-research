# Agent Work Ledger — v1

Canonical work chain:
Task ID → Requester → Agent ID → Session ID → Workspace/Branch → Changed Files → Commit → Review → Validation → Deployment → Live Verification → Notification → Handoff

Status:
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

Failure states: BLOCKED, PAUSED, ROLLED_BACK.

প্রতিটি গুরুত্বপূর্ণ পরিবর্তনে কে করেছে, কী করেছে, কোন branch/commit-এ করেছে, কী পরীক্ষা হয়েছে এবং পরবর্তী করণীয় লেখা থাকবে।