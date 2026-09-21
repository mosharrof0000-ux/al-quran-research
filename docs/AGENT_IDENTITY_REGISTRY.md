# Agent Identity Registry — v1.0

## Purpose
প্রতিটি নতুন Project Agent কাজের জন্য একটি স্বতন্ত্র বাংলা মানব-সদৃশ Agent Name, Agent ID, Task ID, Session ID এবং Branch পরিচয় থাকবে।

## Current Identity
- Agent Name: শাহীন
- Agent ID: SHAHEEN-001
- Task ID: AISTR-2026-09-21-001
- Work Type: AI / Project Agent strengthening
- Branch: agent/shaheen-ai-strength-v1-001
- Parent: PR #63 isolated Project Agent Engine v1
- Status: WORKING — safety branch only

## Naming Rules
1. একই active কাজের identity পুনরায় ব্যবহার করা যাবে না।
2. নতুন স্বতন্ত্র কাজ = নতুন Agent Identity + নতুন Task ID + নতুন branch।
3. নাম কাজের ধরন অনুযায়ী মানব-সদৃশ বাংলা নাম হবে।
4. একই নাম পুনর্ব্যবহার হলে numeric identity suffix থাকবে, যেমন SHAHEEN-002।
5. নাম শুধু display label নয়; history/branch/handoff-এ একই identity থাকবে।

## Work Chain
Task ID → Agent ID → Session ID → Branch → Files → Commit → Review → Validation → Promotion → Live Verification → Notification → Handoff

## Required Status
RECEIVED, INSPECTING, PLANNED, WORKING, TESTING, REPAIRING, VALIDATED, READY_FOR_REVIEW, APPROVED, DEPLOYING, LIVE_VERIFIED, NOTIFIED, HANDOFF_COMPLETE, BLOCKED, ROLLED_BACK.

## Security
Agent identity does not grant extra repository permissions. Existing isolation and protected-path rules remain mandatory.
