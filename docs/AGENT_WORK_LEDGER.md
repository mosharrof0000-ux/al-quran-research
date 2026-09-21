# Agent Work Ledger — v1.0

## Purpose
Project Agent-এর দৃশ্যমান audit trail: কে, কোন কাজ, কোন branch, কী পরিবর্তন, কী পরীক্ষা, কী বাকি এবং কে পরবর্তী দায়িত্ব নিল।

## Lifecycle
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

Failure states: BLOCKED / ROLLED_BACK / INCOMPLETE.

## Required record
Task ID, Agent Name, Agent ID, Session ID, Requester, Task Type, User Request, Parent Task ID, Branch, Changed Files, Commit(s), Verification, Deployment state, Live state, Remaining work, Successor Agent, Handoff status, Timestamp.

## History
Completed and incomplete work must remain. Successor never overwrites original history. Only visible work, decisions, evidence and results are stored; hidden AI chain-of-thought is not stored.

## Status
ACTIVE — v1.0