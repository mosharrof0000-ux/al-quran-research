# Agent Work Ledger

## Lifecycle
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE.
Failure states: BLOCKED, ROLLED_BACK.

## Completion requirement
কাজ শেষ বলা যাবে না যতক্ষণ নির্ধারিত verification শেষ না হয়। প্রতিটি task-এ request, inspected context, changes, unchanged protected areas, files, branch, commits, tests, review/approval, deployment/live result, blockers, remaining work এবং handoff থাকতে হবে।
