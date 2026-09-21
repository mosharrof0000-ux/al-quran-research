# Agent Handoff Protocol — v1

## কখন Handoff বাধ্যতামূলক
- Agent session শেষ হলে
- কাজ অসম্পূর্ণ থাকলে
- blocked হলে
- অন্য Agent দায়িত্ব নিলে
- verification ব্যর্থ হলে
- কাজ pause করা হলে

## Handoff format
```
Task ID:
Original Agent:
Original Agent ID:
Successor Agent:
Successor Agent ID:
Status:
Completed:
Remaining:
Branch:
Commit:
Changed Files:
Tests:
Known Issues:
Last Verified:
Next Action:
```

## উত্তরাধিকার নীতি
Successor Agent পুরোনো কাজের ইতিহাস মুছবে না। সে প্রথমে পূর্ববর্তী Handoff Record পড়বে, তারপর source/runtime state পুনরায় যাচাই করবে এবং নিজের নতুন Task Event লিখবে।

## Completion rule
কাজকে “সম্পন্ন” বলা যাবে না যদি:
1. প্রয়োজনীয় source inspection হয়নি;
2. build/test হয়নি;
3. relevant runtime/browser verification হয়নি;
4. failure থাকলে repair cycle শেষ হয়নি;
5. live deployment হলে live smoke test হয়নি।

## Agent communication
প্রতিটি Agent-এর final report-এ অবশ্যই থাকবে:
- আমি কে
- কোন Task
- কী পড়েছি
- কী করেছি
- কী বদলেছে
- কী পরীক্ষা করেছি
- কী বাকি
- পরবর্তী Agent কীভাবে শুরু করবে
