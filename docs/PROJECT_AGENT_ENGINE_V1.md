# Project Agent Engine v1.1 — Isolated

## উদ্দেশ্য
আল-কুরআন রিসার্চের AI Agent এখন শুধু উত্তরদাতা নয়; এটি project-aware autonomous work engine-এর নিরাপদ foundation।

## নতুন শক্তি
- মানবসদৃশ বাংলা Agent Name নির্বাচন
- unique Agent ID, Task ID, Session ID
- নতুন কাজের জন্য আলাদা agent/* branch
- prior agent work/history খোঁজার tool
- branch status inspection
- 12-step tool loop
- task/handoff record সংরক্ষণ
- incomplete work successor-এর জন্য traceable করা
- governance-first এবং protected-path rules
- main merge/deploy নিষেধ

## Identity
Task → Agent Name → Agent ID → Session ID → Branch → Commit → Verification → Review → Promotion → Live Verification.

## Work states
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → PROMOTING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

Failure states: BLOCKED / ROLLED_BACK.

## Safety
Production chat Worker untouched. Main branch write forbidden. Protected project assets remain protected.

## Promotion gate
Agent branch → review → validation → explicit approval → main promotion → deployment verification.

## Current task
Agent: শামীম
Agent ID: SHAMIM-001
Task: AI-STRENGTHENING-001
Branch: agent/shamim-ai-strengthening-003
Status: safety-branch implementation.
