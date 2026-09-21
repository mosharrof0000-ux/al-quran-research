# Agent Identity Registry

## Purpose
প্রতিটি নতুন প্রকল্প-কাজকে আলাদা মানবসদৃশ বাংলা Agent Name, Task ID এবং isolated branch দেওয়া হবে। নাম কাজের ধরন বোঝাবে এবং ইতিহাসে স্থায়ী থাকবে।

## Current identity
- Agent Name: শাহীন
- Role: Project Agent Hardening
- Work Type: system
- Task ID: TASK-20260921-HARDEN-001
- Branch: agent/shahin-agent-hardening-001

## Naming examples
| কাজ | Agent | Branch pattern |
|---|---|---|
| Chat UI | শামীম | agent/shamim-chat-<task> |
| Icon system | শাহীন | agent/shaheen-icon-<task> |
| Reader | সুমন | agent/sumon-reader-<task> |
| Data | রাকিব | agent/rakib-data-<task> |
| Testing | নাঈম | agent/naim-test-<task> |
| Notification | তানভীর | agent/tanvir-notification-<task> |
| System | আরিফ | agent/arif-system-<task> |

একই কাজের নতুন স্বতন্ত্র session-এ একই পরিচয় পুনর্ব্যবহার করা যাবে না; Task ID নতুন হতে হবে এবং প্রয়োজন হলে identity suffix/নতুন Agent Name নিতে হবে।

## Required identity fields
Task ID, Agent Name, Role, Work Type, Session ID, Parent Task ID, Branch, Changed Files, Commit, Verification, Status, Remaining Work, Successor/Handoff.
