# Project Agent Task Engine — v1.1

## Purpose
Project Agent-এর প্রতিটি কাজকে persistent, traceable এবং resumable করা।

## Task identity
প্রতিটি কাজের সঙ্গে Task ID, Agent Name, Agent ID, Session ID, Work Type এবং Parent Task সংরক্ষিত থাকবে।

## State machine
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE.

ব্যর্থতা/স্থগিত: BLOCKED অথবা ROLLED_BACK.

## Persistent record
প্রতিটি task-এর জন্য docs/agent-tasks/<TaskID>.md record তৈরি হবে। এতে request, current state, identity, branch এবং progress/update রাখা হবে।

## Safety
- task record-ও isolated agent/* branch-এ লেখা হবে।
- main branch সরাসরি পরিবর্তন করা যাবে না।
- production deployment এই engine-এর দায়িত্ব নয়।
- incomplete task হলে successor agent-এর জন্য handoff evidence রাখা বাধ্যতামূলক।

## Current implementation
Project Agent Worker এখন task metadata গ্রহণ করে এবং persistent task-record tool ব্যবহার করতে পারে। এটি PR/merge/deploy-এর অনুমতি দেয় না।
