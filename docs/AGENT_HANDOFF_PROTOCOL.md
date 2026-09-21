# Agent Handoff Protocol

## উদ্দেশ্য
এক Agent-এর অসম্পূর্ণ কাজ অন্য Agent গ্রহণ করলে ইতিহাস হারাবে না।

## Handoff বাধ্যতামূলক ক্ষেত্র
- Previous Agent Name
- Previous Agent ID
- Previous Task ID
- Successor Agent Name
- Successor Agent ID
- Parent Task ID
- Current branch
- Last commit
- Completed work
- Remaining work
- Known failures
- Tests already run
- Tests still required
- Protected areas not to touch
- Exact next action

## Successor rule
নতুন Agent নতুন Task ID/Session ID পাবে এবং আগের Agent-এর কাজ নিজের কাজ হিসেবে মুছে ফেলবে না। সে “inherited from” হিসেবে সম্পর্ক রাখবে।

## Safety
Handoff থাকা মানে production approval নয়। Review, validation, explicit approval এবং live verification আলাদা ধাপ।