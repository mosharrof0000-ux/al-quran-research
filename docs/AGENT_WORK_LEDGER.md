# Project Agent — Work Ledger Protocol

প্রতিটি task-এর স্থায়ী record থাকবে: `docs/agent-tasks/TASK-*.md`।

## Required fields
Task ID, Agent Name/ID, Role, Requester, Session ID, Parent Task ID, Branch/Base, timestamps, Status, Files read/changed, Commits, Build/Runtime/Console/Network/Visual tests, Deployment, Live verification, Remaining work, Handoff/Successor.

## State machine
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

Pause/failure: BLOCKED বা ROLLED_BACK; অসম্পূর্ণ কাজের জন্য handoff বাধ্যতামূলক।

## Safety
main/live কখনো isolated Project Agent লিখবে না। শুধু `agent/*` branch write scope। Merge/deploy human approval ছাড়া নয়। Commit green হওয়া live verification নয়।
