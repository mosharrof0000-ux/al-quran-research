# Project Agent Handoff Protocol — v1.0

## বাধ্যতামূলক
Agent session শেষ, pause, failure বা scope transfer হলে handoff record তৈরি করতে হবে।

## Handoff fields
Original Agent Name, Agent ID, Task ID, Parent Task ID, status, completed work, incomplete work, changed files, branch, commit, tests, known issues, exact next action, successor Agent Name/ID, timestamp.

## Successor rule
Successor নতুন identity নেবে। সে আগের agent-এর record পড়বে, কাজ পুনরায় inspect করবে, তারপর continuation করবে। Original attribution অপরিবর্তিত থাকবে।

## Completion rule
কাজ সম্পূর্ণ বলা যাবে শুধু যখন validation evidence আছে। Deployment success একা live success নয়।
