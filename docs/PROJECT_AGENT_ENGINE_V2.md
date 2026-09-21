# Project Agent Engine v2 — Autonomous Identity & Work Ledger

## Purpose
প্রতিটি নতুন Agent task-কে স্বয়ংক্রিয়ভাবে আলাদা বাংলা মানবসদৃশ Agent Name, Agent ID, Task ID, Session ID এবং isolated branch দেওয়া।

## Execution chain
USER COMMAND → IDENTITY → TASK ID → ISOLATED BRANCH → RECORD → INSPECT → WORK → TEST/REVIEW → HANDOFF

## Identity
কাজের ধরন দেখে নামের pool থেকে একটি বাংলা Agent Name নির্বাচন হয়। একই task-এর identity অপরিবর্তিত থাকে; প্রতিটি task-এর Agent ID ও Session ID নতুন।

## Persistent record
প্রতিটি task শুরুতেই docs/agent-tasks/<TASK-ID>.md তৈরি হয়। এতে request, identity, branch, status, verification, remaining work এবং handoff রাখা হয়।

## Safety
- main-এ write নয়
- automatic merge নয়
- production deploy নয়
- .github/workflows/, database/, migrations/, validation/, quran_research.db, schema.sql protected
- নতুন task-এর branch main-এর verified head থেকে তৈরি হয়

## Failure / handoff
Agent থেমে গেলে task record INCOMPLETE_HANDOFF হবে এবং পরবর্তী Agent branch/history দেখে কাজ নিতে পারবে। Original identity মুছে ফেলা যাবে না।

## Promotion gate
Agent branch → independent review → functional/technical/visual validation → explicit approval → promotion → deployment verification → live smoke test.
