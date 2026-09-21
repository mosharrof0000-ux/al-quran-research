# Project Agent Work Ledger v1

## উদ্দেশ্য
কে কী কাজ করেছে, কোথায় করেছে, কী পরিবর্তন করেছে এবং কোথায় কাজ থেমেছে—সবকিছুর স্থায়ী audit trail রাখা।

## Work Chain
`Task ID → Requester → Agent ID → Session ID → Workspace/Branch → Files → Commits → Review → Validation → Deployment → Live Verification → Notification → Handoff`

## Task status
`RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE`

ব্যর্থ/অসম্পূর্ণ অবস্থায়:
- BLOCKED
- ROLLED_BACK
- HANDOFF_REQUIRED

## প্রতিটি Task Record-এ থাকবে
- Task ID
- User Request
- Agent Name
- Agent ID
- Session ID
- Work Type
- Parent Task ID
- Branch
- Base Commit
- Current Commit
- Changed Files
- Tests Run
- Test Results
- Known Issues
- Approval State
- Deployment State
- Live Verification
- Notification State
- Handoff State
- Started/Updated/Completed timestamps

## নিরাপত্তা
- main branch-এ autonomous write নয়।
- production deploy আলাদা approval gate।
- protected project areas Agent Engine v1-এর safety policy অনুসরণ করবে।
- অসম্পূর্ণ কাজকে Completed বলা যাবে না।
