# Agent Identity Registry

## উদ্দেশ্য
প্রতিটি নতুন Project Agent কাজকে একটি আলাদা মানবসদৃশ বাংলা Agent Name, Agent ID, Task ID, Session ID এবং branch-এর সঙ্গে স্থায়ীভাবে শনাক্ত করা।

## বর্তমান Agent
- Agent Name: শাহীন
- Agent ID: SHAHIN-AGENT-001
- Task ID: AGENT-SYSTEM-001
- Branch: agent/shahin-agent-system-001
- দায়িত্ব: Project Agent identity, work history, handoff এবং নিরাপদ task tracking-এর ভিত্তি তৈরি করা
- Status: IN_PROGRESS

## Naming Rules
1. একই active task-এ একই Agent Identity পুনরায় ব্যবহার করা যাবে না।
2. নতুন স্বতন্ত্র কাজের জন্য নতুন Agent ID ও Task ID তৈরি হবে।
3. কাজের ধরন অনুযায়ী বাংলা মানবসদৃশ নাম নির্বাচন করা হবে।
4. নামের সঙ্গে স্থায়ী Agent ID থাকবে; শুধু নাম দেখে identity নির্ধারণ করা যাবে না।
5. অন্য Agent অসম্পূর্ণ কাজ নিলে original এবং successor—দুজনের ইতিহাস অক্ষুণ্ণ থাকবে।

## Work Chain
Task ID → Agent ID → Session ID → Branch → Files → Commit → Review → Validation → Deployment → Live Verification → Notification → Handoff

## নিরাপত্তা
Agent identity কোনো অনুমোদন বা production deployment-এর সমতুল্য নয়। Production promotion আলাদা review/approval gate-এর অধীন থাকবে.
