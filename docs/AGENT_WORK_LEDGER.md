# Agent Work Ledger

প্রতিটি Project Agent task-এর স্থায়ী ইতিহাস এখানে/সম্পর্কিত task record-এ সংরক্ষিত হবে।

## Work Chain
Task ID → Requester → Agent Name/Role → Session → Branch → Changed Files → Commit(s) → Review → Validation → Deployment → Live Verification → Notification → Handoff

## Status
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

Failure/stop states:
BLOCKED, INCOMPLETE_HANDOFF, ROLLED_BACK

## উত্তরাধিকার
একজন Agent কাজ অসম্পূর্ণ রেখে গেলে successor সেই Task ID-এর ইতিহাস মুছবে না। successor-এর জন্য নতুন Agent Name/identity ও continuation record থাকবে।
