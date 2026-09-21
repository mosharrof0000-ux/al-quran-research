# Project Agent Task Protocol v2

## লক্ষ্য
প্রতিটি নতুন কাজ স্বয়ংক্রিয়ভাবে আলাদা Agent Identity, Task ID, Session ID এবং isolated branch পাবে।

## Assignment
- কাজের ধরন দেখে বাংলা মানবসদৃশ Agent Name নির্বাচন হবে।
- একই কাজের জন্য পুরোনো identity পুনঃব্যবহার নয়।
- প্রতিটি request = নতুন Task ID + নতুন Session ID + নতুন agent/* branch।
- মূল production branch কাজের সময় অপরিবর্তিত থাকবে।

## Mandatory chain
Request → Identity → Task → Session → Isolated Branch → Inspect → Plan → Edit → Test → Record → Review → Approval → Deploy → Live Verify → Notify → Handoff

## Safety
- main-এ agent write নিষিদ্ধ।
- merge/deploy agent-এর ক্ষমতার বাইরে।
- protected paths: .github/workflows, database, migrations, validation, quran_research.db, schema.sql।
- ব্যর্থ হলে BLOCKED/INCOMPLETE record থাকবে।
- অসম্পূর্ণ কাজের successor নতুন identity নিয়ে parent task-এর সঙ্গে যুক্ত হবে।

## Permanent history
প্রতিটি task-এর record: docs/agent-tasks/<Task-ID>.md
