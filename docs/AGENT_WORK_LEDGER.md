# Agent Work Ledger

এই নথি Project Agent-এর কাজের ধারাবাহিক audit ledger। প্রতিটি task-এর শুরু, অগ্রগতি, অসম্পূর্ণতা, takeover এবং verification এখানে সংক্ষিপ্তভাবে থাকবে।

## Status vocabulary
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

Failure/paused states: BLOCKED, ROLLED_BACK, INCOMPLETE.

## Entry format
### TASK-YYYYMMDD-XXXX
- Agent Name:
- Agent ID:
- Session ID:
- Work type:
- Request:
- Parent Task:
- Branch:
- Status:
- Started:
- Updated:
- Changed files:
- Commits:
- Tests/verification:
- Live verification:
- Remaining work:
- Successor:
- Handoff:

## Rules
1. কাজ অসম্পূর্ণ অবস্থায় থামলে INCOMPLETE/HANDOFF record বাধ্যতামূলক।
2. অন্য Agent takeover করলে original Agent এবং successor দুজনের ইতিহাস থাকবে।
3. একই task-এর ইতিহাস overwrite নয়; traceable update থাকবে।
4. Production deployment আলাদা approval gate।

Status: ACTIVE — v1
