# Project Agent Work Ledger — v1.0

## Purpose
প্রতিটি AI/agent কাজের একটি স্থায়ী, অনুসরণযোগ্য Work Record থাকবে যাতে ভবিষ্যৎ agent বুঝতে পারে কে কী কাজ করেছে, কোথায় থেমেছে, কী পরিবর্তন হয়েছে এবং পরবর্তী কাজ কী।

## Canonical Work Chain
User Request → Task ID → Agent Identity → Session → Workspace/Branch → Inspection → Plan → Changes → Tests → Review → Approval → Promotion → Deployment → Live Verification → Notification → Handoff/Close

## Required Task Record
প্রতিটি Task Record-এ কমপক্ষে:
- Task ID
- Requester
- Agent Name
- Agent ID
- Session ID
- Work Type
- Parent Task ID
- User Request (সংক্ষিপ্ত, faithful record)
- Status
- Start/Update/End time
- Branch
- Base commit
- Changed files
- Commits
- Tests performed
- Verification result
- Known limitations
- Approval state
- Promotion/deployment state
- Live verification state
- Notification state
- Handoff record
- Successor Agent ID, if any

## Status model
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → PROMOTED → DEPLOYED → LIVE_VERIFIED → NOTIFIED → CLOSED

Failure/pause states:
BLOCKED, PAUSED, ROLLED_BACK, HANDED_OFF

A task must not be reported as complete when it is only deployed; live verification remains a separate state.

## Evidence rule
Claims such as “fixed”, “verified”, “live”, or “working” must point to an actual test/result. If a test was not possible, record NOT VERIFIED and explain why.

## Multi-agent rule
Multiple agents may work on related tasks, but each distinct task/session receives a separate identity and branch. A successor must link to the predecessor rather than overwriting their record.

## User visibility
The live Project Agent UI should eventually expose a concise status card:
Agent Name • Task ID • Status • Branch • Last verification • Next action

Sensitive credentials, tokens, hidden chain-of-thought, and private secrets must never be stored in the ledger.

## Current first record
Agent Name: শাহীন
Agent ID: AGENT-SHAHEEN-AI-001
Task ID: TASK-AI-STRENGTHEN-001
Work Type: AI/Project Agent strengthening
Branch: agent/shaheen-ai-strengthening-001
Status: WORKING
Parent Task: PR #63 isolated Project Agent Engine v1
