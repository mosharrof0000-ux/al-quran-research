# Project Agent Identity Registry — v1.0

## Purpose
এই নথি Project Agent-এর স্থায়ী পরিচয়, কাজের ধরন, branch এবং দায়িত্বের audit trail রাখে। প্রতিটি নতুন স্বতন্ত্র কাজ একটি নতুন Agent Identity পাবে।

## Core rule
- প্রতিটি নতুন স্বতন্ত্র Task-এর জন্য নতুন Agent Identity তৈরি হবে।
- Agent Name বাংলা মানবসুলভ হবে এবং কাজের ধরন/দায়িত্বের সঙ্গে অর্থপূর্ণভাবে নির্বাচন করা হবে।
- একই সক্রিয় Task-এ একই Identity reuse করা যাবে; ভিন্ন স্বতন্ত্র Task-এ পুরোনো Identity পুনর্ব্যবহার করা যাবে না।
- নাম একা পরিচয় নয়: Agent ID + Task ID + Session ID + Branch একসঙ্গে canonical identity।
- Agent কখনো মানুষের পরিচয় বা বাস্তব কর্মী হিসেবে নিজেকে উপস্থাপন করবে না; এগুলো project audit identities।

## Naming examples
| কাজের ধরন | উদাহরণ Agent Name | Branch pattern |
|---|---|---|
| AI/engine strengthening | শাহীন | agent/shaheen-ai-strengthening-### |
| Chat/UI | শামীম | agent/shamim-chat-ui-### |
| Icon system | শাহীন/নতুন unique identity | agent/<identity>-icon-system-### |
| Reader/data | সুমন | agent/sumon-reader-### |
| Browser verification | নাঈম | agent/naim-browser-test-### |
| Notification/update | রাকিব | agent/rakib-notification-### |

Names are examples, not a fixed finite pool.

## Required identity fields
- Agent Name (বাংলা)
- Agent ID (stable unique identifier)
- Task ID
- Session ID
- Work Type
- Requester
- Parent Task ID, if inherited
- Branch
- Created/updated timestamps
- Status
- Current responsibility
- Successor, if any

## Identity lifecycle
ALLOCATED → ACTIVE → PAUSED/BLOCKED → COMPLETED/HANDED_OFF → CLOSED

An identity marked CLOSED must not silently resume a different task.

## Inheritance
If a task is incomplete:
1. Original agent records completed work and remaining work.
2. A successor receives a new Agent Identity.
3. The successor links Parent Task ID and Predecessor Agent ID.
4. The successor does not erase or rewrite the predecessor's history.
5. Final history shows the full chain.

## Safety
Identity records are audit metadata. They never authorize a merge, production deployment, database migration, or destructive change.
