# Agent Handoff Protocol

## উদ্দেশ্য
এক Agent-এর অসম্পূর্ণ কাজ অন্য Agent গ্রহণ করলে আগের কাজ, সিদ্ধান্ত ও সীমাবদ্ধতা হারিয়ে না যায়।

## Handoff বাধ্যতামূলক ক্ষেত্র
- From Agent Name / Agent ID
- To Agent Name / Agent ID (known হলে)
- Task ID
- Parent Task ID
- কাজের উদ্দেশ্য
- সম্পন্ন কাজ
- অসম্পূর্ণ কাজ
- Changed Files
- Branch
- Commit
- Tests already run
- Known failures
- Known risks
- Exact next steps
- Last verified state
- Timestamp

## Successor rule
Successor পুরোনো Agent-এর পরিচয় ব্যবহার করবে না। নতুন Agent identity ও নতুন Task ID তৈরি করবে; Parent Task ID দিয়ে continuity দেখাবে।

## Verification rule
Successor প্রথমে handoff এবং changed files যাচাই করবে। পুরোনো Agent-এর দাবিকে blind trust করা যাবে না।

## Completion
সব remaining কাজ শেষ, tests pass, review/approval এবং প্রয়োজনীয় live verification সম্পন্ন হলে successor আলাদা completion record লিখবে। পুরোনো incomplete record overwrite করা যাবে না।
