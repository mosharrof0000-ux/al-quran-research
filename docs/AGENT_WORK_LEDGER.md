# Project Agent Work Ledger — v1.0

## Ledger rule
প্রতিটি agent task-এর দৃশ্যমান audit record থাকবে। Secret, password বা AI-এর hidden chain-of-thought এখানে রাখা যাবে না।

## Required fields
- Task ID
- Parent Task ID
- Agent Name / Agent ID
- Request
- Status
- Started / Updated
- Branch
- Files changed
- Commits
- Tests
- Verification result
- Remaining work
- Approval state
- Promotion/live state
- Successor / handoff

## Status model
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → PROMOTING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

Failure: BLOCKED / ROLLED_BACK.

## Current task
Task ID: AI-STRENGTHENING-001
Agent: শামীম (SHAMIM-001)
Branch: agent/shamim-ai-strengthening-002
Status: WORKING
Scope: Project Agent identity, work history, stronger inspection/tool loop and safe handoff.
