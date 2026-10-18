# Agent Work Ledger

এটি Project Agent-এর স্থায়ী কাজের ইতিহাসের কাঠামো।

## প্রতিটি Task record
- Task ID
- বাংলা Agent Name
- Agent ID
- Session ID
- Requester
- Parent Task ID (থাকলে)
- Work Type
- User Request
- Status
- Created At / Updated At
- Branch
- Changed Files
- Commit(s)
- Tests
- Validation Result
- Deployment Result
- Live Version
- Notification Result
- Handoff Record
- Blockers / Risks
- Next Action

## Status
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

ব্যর্থ/স্থগিত অবস্থায়:
- BLOCKED
- ROLLED_BACK
- INCOMPLETE_HANDOFF

## উত্তরাধিকার
কোনো Agent অসম্পূর্ণ কাজ রেখে গেলে successor Task অবশ্যই Parent Task ID উল্লেখ করবে এবং পূর্ববর্তী Agent-এর completed/remaining কাজ অপরিবর্তিত রাখবে।

## ইতিহাসের নিয়ম
কাজ মুছে ফেলা নয়; correction হলে নতুন record/append-only event দিয়ে history রাখা হবে।
