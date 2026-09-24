# Project Agent Work Ledger — v1.1

প্রতিটি Agent task-এর দৃশ্যমান audit record থাকবে। Secret বা hidden chain-of-thought এখানে রাখা যাবে না।

## Required fields
Task ID; Parent Task ID; Agent Name/ID; Session ID; Request; Status; Branch; Files; Commits; Tests; Verification; Remaining Work; Approval; Promotion/Live state; Successor/Handoff; Timestamp.

## State model
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → PROMOTING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

Failure states: BLOCKED / ROLLED_BACK.

## Current strengthening task
- Agent: শামীম (SHAMIM-001)
- Task: AI-STRENGTHENING-001
- Branch: agent/shamim-ai-strengthening-20260921-01
- Scope: isolated Project Agent identity, inspection, history, bounded tool loop and handoff.
- Production/main: untouched.
