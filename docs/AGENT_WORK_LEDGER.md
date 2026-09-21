# Agent Work Ledger

প্রতিটি কাজের জন্য স্থায়ী Work Record রাখতে হবে।

## Required chain
Task ID → Requester → Agent Identity → Session → Branch → Files → Commits → Tests → Review → Approval → Deployment → Live Verification → Notification → Handoff

## Status
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

Failure states:
- BLOCKED
- ROLLED_BACK

## Required record
- কাজের অনুরোধ
- Agent Name/ID
- Task Type
- Parent Task
- Branch
- Changed files
- Commit(s)
- Completed
- Remaining
- Test results
- Known issues
- Verification
- Deployment status
- Live version
- User notification
- Next Agent instructions

## Rule
কাজ অসম্পূর্ণ অবস্থায় থামলে Handoff Record বাধ্যতামূলক। “Done” বলা যাবে না যতক্ষণ required verification সম্পন্ন না হয়।