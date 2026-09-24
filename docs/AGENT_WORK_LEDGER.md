# Agent Work Ledger — v1.0

## উদ্দেশ্য
Project Agent-এর কাজ কে শুরু করেছে, কে পরিবর্তন করেছে, কে যাচাই করেছে এবং কোথায় থেমেছে—তা স্থায়ীভাবে সংরক্ষণ করা।

## Task state machine
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

Failure/pause states:
BLOCKED, ROLLED_BACK, INCOMPLETE_HANDOFF.

## Ledger entry requirements
প্রতিটি Task-এর জন্য:
- Task ID
- Requester
- Agent Name / Agent ID
- Session ID
- Parent Task ID (যদি থাকে)
- Work Type
- User Request
- Current State
- Branch
- Files Read
- Files Changed
- Commit SHA
- Tests
- Browser/Console/Network verification
- Deployment status
- Live verification
- Notification status
- Completed work
- Remaining work
- Risks/known issues
- Next Agent
- Timestamp

## Non-negotiable rule
“কাজ শেষ” বলা যাবে না যতক্ষণ না required verification এবং ledger update সম্পন্ন হয়। Production deploy success নিজে Live Verified নয়।

## Current task
TASK-2026-09-21-AGENT-001
- Agent: শামীম (AGENT-BN-SHAMIM-001)
- Branch: agent/shamim-agent-core-001
- State: WORKING
- Scope: Project Agent core strengthening and continuity layer
- Production: untouched
