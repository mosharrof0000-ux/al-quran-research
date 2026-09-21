# Project Agent Handoff Protocol — v1.0

## উদ্দেশ্য
এক Agent-এর অসম্পূর্ণ কাজ অন্য Agent গ্রহণ করলে কাজের ধারাবাহিকতা যেন হারিয়ে না যায়।

## Handoff record
প্রতিটি handoff-এ থাকবে:
- Previous Agent Name / Agent ID
- Previous Task ID
- Previous Branch
- Previous Status
- Completed work
- Incomplete work
- Known issues
- Changed files
- Last verified commit
- Tests already performed
- Required next action
- Successor Agent Name / Agent ID
- Successor Task ID
- Timestamp

## Ownership rule
কাজ অসম্পূর্ণ থাকলে original Agent-এর record অপরিবর্তিত থাকবে। Successor নতুন identity নিয়ে কাজ শুরু করবে এবং predecessor-কে reference করবে।

## Completion rule
কাজ সম্পূর্ণ না হলে “COMPLETE” বলা যাবে না। BLOCKED, INCOMPLETE, READY_FOR_REVIEW, VALIDATED ইত্যাদি সঠিক status ব্যবহার করতে হবে।

## Promotion rule
Handoff সম্পন্ন হওয়া main merge বা production deployment-এর অনুমতি নয়। Promotion gate আলাদা থাকবে।

## Privacy
কাজের audit metadata রাখা যাবে; AI-এর গোপন chain-of-thought রাখা যাবে না।
