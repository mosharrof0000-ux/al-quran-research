# Agent Work Ledger

এই নথি Project Agent-এর কাজের স্থায়ী audit trail-এর schema। এটি শুধু “কাজ হয়েছে” বলবে না; কে, কেন, কোথায়, কী পরিবর্তন করেছে এবং পরবর্তী Agent কীভাবে কাজটি গ্রহণ করবে তা সংরক্ষণ করবে।

## Task Record
প্রতিটি task record-এ থাকবে:
- Task ID
- Agent Name (বাংলা)
- Agent ID
- Session ID
- Requester
- Parent Task ID (থাকলে)
- Work Type
- User Command
- Status
- Created/Updated time
- Branch
- Base branch/commit
- Files inspected
- Files changed
- Commit SHA
- Tests performed
- Browser/console/network verification
- Live verification
- Deployment status
- User notification status
- Completed work
- Remaining work
- Blockers/issues
- Successor Agent
- Handoff Record

## State machine
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

ব্যর্থতা/বিরতির জন্য: BLOCKED বা ROLLED_BACK।

## Audit rule
- কোনো completed দাবি evidence ছাড়া লেখা যাবে না।
- deployment success = live success নয়। Live smoke test আলাদা evidence।
- incomplete task কখনো completed হিসেবে mark করা যাবে না।
- successor নিলে original Agent record এবং পরিবর্তনের ইতিহাস অক্ষুণ্ণ থাকবে।
