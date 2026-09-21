# Agent Work Ledger

প্রতিটি Project Agent কাজের audit trail:

Task ID → Requester → Agent ID/Name → Session → Branch → Files → Commits → Tests → Review → Approval → Deployment → Live Verification → Notification → Handoff.

## Status lifecycle
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

Failure states: BLOCKED, ROLLED_BACK.

## Mandatory completion record
- Task ID
- Agent Name / Agent ID
- request
- completed
- remaining
- files changed
- branch
- commit(s)
- test evidence
- verification result
- deployment/live status
- next action

কাজ থামলে বা অসম্পূর্ণ হলে handoff record বাধ্যতামূলক।
