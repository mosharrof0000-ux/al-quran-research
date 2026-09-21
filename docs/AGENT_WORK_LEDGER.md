# Agent Work Ledger — v1

প্রতিটি কাজের lifecycle এখানে নথিভুক্ত হবে। উদ্দেশ্য হলো ভবিষ্যৎ Agent যেন বুঝতে পারে কে কী করেছে, কী বাকি, এবং কোথা থেকে কাজ চালাতে হবে।

## Lifecycle
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

ব্যর্থ/থামানো অবস্থায়:
BLOCKED / ROLLED_BACK / INCOMPLETE

## Work record
প্রতিটি Task Record-এ থাকতে হবে:
- Task ID
- Agent Name
- Agent ID
- Session ID
- Requester
- Work Type
- Parent Task ID
- Status
- Request
- Inspection summary
- Changed files
- Branch
- Commit(s)
- Tests performed
- Failures and repairs
- Review status
- Deployment status
- Live verification
- User notification
- Remaining work
- Successor Agent
- Timestamp

## Non-destructive history
পুরোনো record overwrite করা যাবে না। নতুন status/continuation নতুন event হিসেবে যোগ হবে।

## Safety
main branch-কে Agent workspace হিসেবে ব্যবহার করা যাবে না। কাজ আগে isolated branch-এ হবে। Production পরিবর্তনের আগে review, validation এবং explicit approval প্রয়োজন।
