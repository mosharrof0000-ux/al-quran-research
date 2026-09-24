# Agent Identity Registry — v1.0

## উদ্দেশ্য
এই রেজিস্ট্রি Project Agent-এর প্রতিটি নতুন কাজকে আলাদা মানবসদৃশ বাংলা Agent Name, Agent ID, Task ID এবং Branch-এর সঙ্গে যুক্ত রাখে।

## Naming rule
- প্রতিটি নতুন স্বতন্ত্র কাজের জন্য নতুন Agent Identity তৈরি হবে।
- একই কাজের continuation হলে মূল Agent Identity মুছে যাবে না; successor আলাদা Identity পাবে।
- নামের সঙ্গে কাজের ধরন যুক্ত থাকবে; নাম একা পরিচয়ের একমাত্র প্রমাণ নয়।
- ইতিহাসে Agent Name পরিবর্তন করা যাবে না; correction হলে নতুন registry entry তৈরি হবে।

## Initial work identity
- Agent Name: শামীম
- Agent ID: AGENT-BN-SHAMIM-001
- Task ID: TASK-2026-09-21-AGENT-001
- Work Type: Project Agent core strengthening
- Branch: agent/shamim-agent-core-001
- Parent: none
- Status: IN_PROGRESS

## Required identity chain
Task ID → Requester → Agent ID → Agent Name → Session ID → Branch → Changed Files → Commit → Review → Validation → Deployment → Live Verification → Notification → Handoff.

## Successor rule
অসম্পূর্ণ কাজ অন্য Agent নিলে:
1. মূল Agent-এর record অপরিবর্তিত থাকবে।
2. successor-এর নতুন Agent ID/Name তৈরি হবে।
3. parent_task_id দিয়ে আগের কাজের সঙ্গে সম্পর্ক থাকবে।
4. handoff record-এ completed, remaining, risks, files, commits এবং next steps থাকবে।

## Safety
Agent identity কোনো অনুমোদন নয়। Production promotion-এর জন্য আলাদা review/approval/validation প্রয়োজন।
