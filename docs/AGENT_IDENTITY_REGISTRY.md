# Agent Identity Registry — v1.0

প্রতিটি নতুন Project Agent কাজকে বাংলা মানব-পাঠ্য নাম, unique Agent ID, Task ID, Session ID এবং branch-এর সঙ্গে যুক্ত করা হবে।

## Rules
- প্রতিটি নতুন distinct task-এর জন্য নতুন Agent Identity।
- নাম কাজের ধরন অনুযায়ী নির্বাচন হবে।
- একই নাম আবার ব্যবহার হলে unique suffix হবে।
- Agent identity audit/history-এর জন্য; এটি কোনো বাস্তব ব্যক্তির পরিচয় নয়।
- inherited কাজের successor নতুন Agent ID পাবে; original history অপরিবর্তিত থাকবে।

## Required fields
Agent Name, Agent ID, Task ID, Session ID, Requester, Task Type, Parent Task ID, Branch, Created At, Status.

## Example
Agent Name: শাহীন
Agent ID: AGENT-SHAHEEN-20260921-001
Task ID: TASK-20260921-001
Task Type: Project Agent / System Architecture
Branch: agent/shaheen-agent-identity-001

## Related records
Detailed task history: AGENT_WORK_LEDGER.md
Handoff: AGENT_HANDOFF_PROTOCOL.md

## Status
ACTIVE — v1.0