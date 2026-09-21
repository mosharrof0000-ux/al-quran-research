# Project Agent — Work Ledger

এই ledger-এর উদ্দেশ্য হলো ভবিষ্যৎ Agent যেন শুধু বর্তমান code নয়, কে কী করেছে, কোথায় থেমেছে এবং পরবর্তী Agent কী করবে—সব বুঝতে পারে।

## Mandatory chain
Task ID → Requester → Agent Name → Agent ID → Session ID → Branch → Changed Files → Commit → Review → Validation → Deployment → Live Verification → Notification → Handoff

## Task states
- RECEIVED
- INSPECTING
- PLANNED
- WORKING
- TESTING
- REPAIRING
- VALIDATED
- READY_FOR_REVIEW
- APPROVED
- DEPLOYING
- LIVE_VERIFIED
- NOTIFIED
- HANDOFF_COMPLETE
- BLOCKED
- ROLLED_BACK
- CLOSED

## Every task record must contain
1. Task ID
2. Human-readable request
3. Agent Name / Agent ID
4. Session ID
5. Parent Task ID
6. Work Type
7. Branch
8. Files read
9. Files changed
10. Commit SHA
11. Tests performed
12. Failures and repairs
13. Review state
14. Deployment state
15. Live verification result
16. User notification result
17. Remaining work
18. Successor Agent
19. Timestamp

## Incomplete work
অসম্পূর্ণ কাজকে কখনো completed হিসেবে লেখা যাবে না। Remaining Work-এ স্পষ্টভাবে লিখতে হবে:
- কী বাকি
- কেন বাকি
- কোথা থেকে পরবর্তী Agent শুরু করবে
- কোন ঝুঁকি আছে
- কোন test আবার চালাতে হবে

## Successor rule
অন্য Agent কাজ গ্রহণ করলে নতুন Agent Name + নতুন Agent ID + নতুন Session ID হবে। Parent Task ID দিয়ে আগের Agent-এর সাথে সম্পর্ক রাখা হবে। পুরোনো Agent-এর record অপরিবর্তিত থাকবে।

## Example chain
শামীম → Chat UI implementation
সুমন → শামীমের অসম্পূর্ণ কাজ গ্রহণ
নাঈম → browser/live verification

এতে কাজের ইতিহাস হারাবে না।
