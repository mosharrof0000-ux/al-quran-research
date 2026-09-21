# Agent Identity Registry — v2

## উদ্দেশ্য
প্রতিটি নতুন technical task-কে একটি নতুন Bengali human-readable identity দেওয়া হবে। নামটি স্থায়ী ব্যক্তি নয়; এটি কাজের audit identity।

## Identity
প্রতিটি task-এ:
- Agent Name
- Agent ID
- Agent Role
- Task ID
- Session ID
- Parent Task ID
- Branch
- Start/Update time

থাকবে।

## Work-type mapping
- System / architecture / AI core → শাহীন
- Chat / interface / icon → শামীম
- Quran reader / data / translation → সুমন
- Automation / notification → রাকিব
- Testing / browser / verification → নাঈম

একই নামের নতুন কাজ হলে timestamp/unique Agent ID দিয়ে আলাদা identity হবে। পুরনো কাজের ইতিহাস overwrite করা যাবে না।

## Chain
Requester → Agent Identity → Session → Branch → Files → Commit → Review → Validation → Promotion → Live Verification → Notification → Handoff

## Safety
Agent branch ছাড়া code write নয়। Main/production পরিবর্তন explicit promotion gate ছাড়া নয়। Live claim-এর জন্য deployment এবং live smoke verification উভয়ই প্রয়োজন।
