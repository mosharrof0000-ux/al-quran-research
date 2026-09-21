# Agent Handoff Protocol

## উদ্দেশ্য
এক Agent-এর অসম্পূর্ণ কাজ অন্য Agent যেন ইতিহাস না হারিয়ে নিরাপদে গ্রহণ করতে পারে।

## Handoff record
- Original Agent Name / ID
- Original Task ID
- Original Session ID
- কাজের উদ্দেশ্য
- সম্পন্ন অংশ
- অসম্পূর্ণ অংশ
- পরিবর্তিত ফাইল
- Branch / Commit
- শেষ পরীক্ষার ফল
- জানা সমস্যা
- ঝুঁকি
- পরবর্তী Agent-এর প্রথম কাজ
- Successor Agent Name / ID
- Handoff timestamp

## Takeover rule
Successor Agent প্রথমে handoff, branch, commit এবং বর্তমান project state যাচাই করবে। পুরোনো কাজকে নিজের কাজ বলে overwrite করবে না।

## Completion rule
Successor সফল হলে record-এ Original → Successor chain সংরক্ষিত থাকবে এবং final verifier-এর পরিচয় আলাদাভাবে লেখা হবে।
