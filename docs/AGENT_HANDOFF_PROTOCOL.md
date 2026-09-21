# Project Agent Handoff Protocol v1

## উদ্দেশ্য
এক Agent-এর অসম্পূর্ণ কাজ অন্য Agent গ্রহণ করলে সম্পূর্ণ continuity বজায় রাখা।

## Handoff বাধ্যতামূলক যখন
- session শেষ হয়
- কাজ অসম্পূর্ণ থাকে
- কোনো blocker পাওয়া যায়
- verification ব্যর্থ হয়
- অন্য work type-এর specialist প্রয়োজন হয়

## Handoff Record
প্রতিটি handoff-এ:
1. Original Agent Name
2. Original Agent ID
3. Task ID
4. Original Branch
5. Current Commit
6. Completed Work
7. Remaining Work
8. Known Errors/Blockers
9. Files Changed
10. Tests Already Passed
11. Tests Still Required
12. Exact Next Action
13. Successor Agent Name
14. Successor Agent ID
15. Handoff Timestamp

## উত্তরাধিকার নিয়ম
Successor Agent original Agent-এর কাজ নিজের নামে overwrite করবে না। History-তে chain থাকবে:
`Original Agent → Successor Agent → Reviewer/Verifier`

## Completion rule
Successor কেবল নিজের করা পরিবর্তনের জন্য নিজস্ব Agent ID ব্যবহার করবে এবং final record-এ original work-এর attribution বজায় রাখবে।
