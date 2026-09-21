# Project Agent Runtime Hardening v1

## লক্ষ্য
Project Agent-কে শুধু প্রশ্নের উত্তরদাতা নয়, evidence-driven engineering agent হিসেবে চালানো।

## বাধ্যতামূলক execution order
1. Request গ্রহণ
2. Task ID + Agent Identity নির্ধারণ
3. Existing instructions/state/previous handoff পড়া
4. Relevant source files এবং dependency chain inspect করা
5. Live/runtime impact নির্ধারণ
6. Safe agent/* workspace তৈরি/ব্যবহার
7. Minimal change
8. Static/syntax validation
9. Functional test
10. Browser/visual/console/network verification যেখানে প্রযোজ্য
11. Failure হলে root-cause → repair → retest loop
12. Evidence record করা
13. Review-এর জন্য প্রস্তুত করা
14. User approval ছাড়া main/deploy নয়
15. Final handoff/ledger update

## Evidence rule
কোনো কাজ “সম্পন্ন” বলা যাবে না শুধু code লেখা বা deployment command সফল হওয়ার ভিত্তিতে। প্রত্যেক দাবির সঙ্গে evidence থাকতে হবে: file, commit, test output, runtime result বা live verification।

## Self-repair rule
একটি test ব্যর্থ হলে প্রথমে error-এর প্রকৃত source নির্ধারণ করতে হবে। একই পরিবর্তন অন্ধভাবে পুনরাবৃত্তি করা যাবে না। সর্বোচ্চ নিরাপদ repair cycle শেষে BLOCKED status এবং পরবর্তী পদক্ষেপ লিখতে হবে।

## Scope protection
- main branch protected by process
- production Worker untouched during isolated development
- protected data/schema/deployment files require explicit review path
- user data এবং Quran source data অনুমান করে পরিবর্তন নয়

## Identity continuity
প্রতিটি নতুন স্বতন্ত্র কাজ = নতুন Agent Name + Agent ID + Task ID। Successor কখনো predecessor-এর identity reuse করবে না।

## Release gate
READY_FOR_REVIEW → explicit approval → promotion → deployment → live smoke test → notification.
