# Agent Runtime Task Protocol — v1.2

## Purpose
প্রতিটি Project Agent request এখন আলাদা isolated task branch এবং persistent operational audit record পাবে।

## Runtime flow
REQUESTED → IDENTITY → ISOLATED BRANCH → TASK RECORD → INSPECT → WORK → TEST → HANDOFF/REVIEW

## Required identity
- Agent Name
- Agent ID
- Task ID
- Session ID
- Task Type
- Parent Task ID
- Branch
- Status

## Branch rule
প্রতিটি নতুন task-এর জন্য `agent/<agent-name>-<task-id>` ধরনের নতুন branch তৈরি হবে। Default base `main`; inherited work-এর জন্য caller অনুমোদিত `agent/*` base দিতে পারে।

## Audit record
Task record থাকে: `docs/agent-tasks/<TASK-ID>.md`

এতে operational facts রাখা হবে:
- user request
- lifecycle status
- branch
- agent identity
- result summary
- verification state
- remaining work

Hidden chain-of-thought সংরক্ষণ করা যাবে না।

## Safety
- main-এ direct write নিষিদ্ধ
- protected workflow/database/migration/validation paths নিষিদ্ধ
- merge/deploy ক্ষমতা নেই
- runtime response success production completion নয়
- browser/live verification আলাদা gate

## Handoff
যদি কাজ সম্পূর্ণভাবে live-verified না হয়, status `HANDOFF_REQUIRED` হবে এবং successor নতুন identity নিয়ে কাজ নেবে।

## Status
ACTIVE — v1.2
