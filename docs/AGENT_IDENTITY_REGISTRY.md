# Project Agent Identity Registry — v1.0

## উদ্দেশ্য
প্রতিটি নতুন Project Agent কাজকে মানব-পাঠযোগ্য বাংলা নাম, ইউনিক Agent ID, Task ID এবং আলাদা branch-এর সঙ্গে যুক্ত করা। এতে পরে বোঝা যাবে কে কী কাজ শুরু করেছে, কোথায় থেমেছে এবং কে কাজটি গ্রহণ করেছে।

## Naming rule
কাজের ধরন অনুযায়ী বাংলা মানব-সদৃশ নাম দেওয়া হবে। একই সক্রিয় Task-এ একই Agent Identity পুনর্ব্যবহার করা যাবে না।

প্রথম registered identity:
- Agent Name: সুমন
- Agent ID: AG-SUMON-001
- Role: AI System Strengthening / Project Agent Architecture
- Task ID: AGT-20260921-001
- Branch: agent/sumon-ai-system-001
- Parent: agent/project-engine-v1-isolated
- Started: 2026-09-21
- Status: WORKING

## Identity fields
প্রতিটি কাজের জন্য ন্যূনতম:
Agent Name, Agent ID, Task ID, Requester, Role, Session/Run ID, Parent Task ID (যদি থাকে), Branch, Status, Started At, Updated At.

## Continuation rule
অসম্পূর্ণ কাজ অন্য Agent গ্রহণ করলে নতুন Agent Name/Agent ID/Task ID হবে এবং পূর্ববর্তী Agent-এর Task ID parent হিসেবে থাকবে। পুরোনো কাজের record মুছে ফেলা যাবে না।

## Status values
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

ব্যর্থ/বিরত অবস্থায়: BLOCKED বা ROLLED_BACK।

## Safety
এই Registry নিজে production authority নয়। main promotion, merge এবং live deployment আলাদা approval gate-এর অধীন।
