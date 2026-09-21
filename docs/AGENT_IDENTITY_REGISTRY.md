# Agent Identity Registry — v1.0

## উদ্দেশ্য
প্রতিটি নতুন Project Agent কাজের জন্য আলাদা মানবসদৃশ বাংলা Agent Name, Agent ID, Task ID, Session ID ও Branch identity থাকবে। নামটি শুধু ডাকনাম নয়; এটি কাজের ইতিহাসের অংশ।

## Naming rules
- কাজ শুরু হলে নতুন Task ID তৈরি হবে।
- একই Task-এ একই Agent identity বজায় থাকবে।
- নতুন স্বতন্ত্র কাজের জন্য পুরোনো Agent identity পুনঃব্যবহার করা যাবে না; প্রয়োজন হলে নতুন suffix/Agent ID নিতে হবে।
- নাম কাজের ধরন অনুযায়ী বাছাই করা হবে; নামের সঙ্গে Task ID-ই canonical identity।
- উদাহরণ: Agent Name=সাদিক, Agent ID=SADIK-AIH-001, Task ID=AGT-20260921-001, Branch=agent/sadek-ai-hardening-002।
- Branch name unique হলেও মানবিক Agent Name history-তে সংরক্ষিত থাকবে।

## Work roles
- Executor: মূল পরিবর্তনকারী Agent
- Reviewer: পরিবর্তন পর্যালোচনাকারী
- Verifier: independent verification
- Deployer: অনুমোদিত production promotion/deployment
- Successor: অসম্পূর্ণ কাজ গ্রহণকারী পরবর্তী Agent

একই Agent একাধিক role পালন করতে পারে, কিন্তু record-এ role আলাদা করে লিখতে হবে।

## Mandatory identity fields
Task record-এ কমপক্ষে:
Task ID, Agent Name, Agent ID, Session ID, Requester, Parent Task ID, Work Type, Status, Branch, Base Commit, Changed Files, Commit(s), Tests, Live Verification, Approval State, Handoff State, Started At, Updated At.

## Current strengthening task
- Agent Name: সাদিক
- Agent ID: SADIK-AIH-001
- Work Type: AI engine hardening
- Branch: agent/sadek-ai-hardening-002
- Base: agent/project-engine-v1-isolated
- Status: IN PROGRESS
