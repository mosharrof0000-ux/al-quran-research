# Agent Identity Registry — v1.1

প্রতিটি নতুন Project Agent কাজকে বাংলা human-like display name, unique Agent ID, Task ID, Session ID এবং isolated branch-এর সঙ্গে যুক্ত করা হবে।

## Rules
- প্রতিটি নতুন distinct task-এর জন্য নতুন Agent Identity।
- নাম কাজের ধরন অনুযায়ী নির্বাচন হবে।
- একই display name পুনরায় প্রয়োজন হলে suffix ব্যবহার হবে; Agent ID কখনো পুনর্ব্যবহার হবে না।
- Identity audit label; এটি বাস্তব ব্যক্তির পরিচয় বা human authorship-এর প্রমাণ নয়।
- Inherited কাজের successor নতুন Agent ID পাবে; predecessor history অপরিবর্তিত থাকবে।
- Hidden chain-of-thought সংরক্ষণ করা যাবে না; শুধু operational audit facts রাখা যাবে।

## Work-type names
Chat/UI—শামীম; Icon/Visual—শাহীন; Reader/Data—সুমন; Notification/Live Update—রাকিব; Browser/QA—নাঈম; Backend/API—আরিফ; Database/Schema—ফারুক; Governance/Documentation—মাহিন; Security—তানভীর; Research/Data Analysis—রায়হান।

## Required fields
Agent Name, Agent ID, Task ID, Session ID, Requester, Task Type, Parent Task ID, Predecessor Agent, Branch, Created At, Status.

## Current task
- Agent Name: শাহীন
- Agent ID: SHAHEEN-AGENT-IDENTITY-001
- Task ID: AGT-20260921-001
- Task Type: agent-governance
- Branch: agent/shaheen-agent-identity-001
- Parent: PR-63
- Status: WORKING

## Work chain
Task ID → Agent ID → Session ID → Branch → Changed Files → Commit → Review → Validation → Promotion → Live Verification → Notification → Handoff

## Status
ACTIVE — v1.1
