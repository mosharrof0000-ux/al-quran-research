# Project Agent — Identity Registry

## উদ্দেশ্য
প্রতিটি নতুন Project Agent কাজকে একটি স্বতন্ত্র বাংলা মানবসদৃশ Agent Identity দেওয়া হবে। Identity শুধু নাম নয়; এটি কাজের ইতিহাসের স্থায়ী পরিচয়।

## Naming rules
- প্রতিটি নতুন স্বতন্ত্র কাজের জন্য নতুন Agent Identity তৈরি হবে।
- একই নামের সক্রিয় দুইটি কাজ থাকবে না।
- নামটি কাজের ধরন অনুযায়ী বাংলা মানবসদৃশ হবে; উদাহরণ: শামীম, শাহীন, সুমন, রাকিব, নাঈম।
- একই ব্যক্তি-নাম পুনরায় প্রয়োজন হলে unique suffix/Agent ID ব্যবহার করতে হবে; পুরোনো ইতিহাস overwrite করা যাবে না।
- Agent Identity ≠ GitHub login. GitHub login হলো প্রযুক্তিগত executor; বাংলা নাম হলো project work identity।

## Required identity fields
- Agent Name (বাংলা)
- Agent ID
- Task ID
- Session ID
- Work Type
- Requester
- Parent Task ID (যদি থাকে)
- Branch
- Created At
- Status

## Branch rule
প্রতিটি Agent-এর কাজ isolated `agent/*` branch-এ শুরু হবে। Production `main`-এ সরাসরি লেখা যাবে না।

## Example
Agent Name: সুমন
Agent ID: AGENT-SUMON-001
Task ID: TASK-20260921-001
Work Type: AI/System Strengthening
Branch: agent/sumon-agent-strengthening-001
Status: WORKING

## Identity lifecycle
RECEIVED → ASSIGNED → WORKING → PAUSED/BLOCKED → HANDOFF অথবা VALIDATED → CLOSED

কোনো কাজ অসম্পূর্ণ রেখে session শেষ হলে HANDOFF record বাধ্যতামূলক।
