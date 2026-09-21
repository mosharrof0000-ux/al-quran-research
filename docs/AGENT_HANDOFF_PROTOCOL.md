# Agent Handoff Protocol

## মূলনীতি
কোনো Agent কাজ অসম্পূর্ণ রেখে থামলে পরবর্তী Agent যেন শুরু থেকে অনুমান না করে, তাই বাধ্যতামূলক Handoff Record তৈরি করতে হবে।

## Handoff Record
- Original Agent Name / ID
- Successor Agent Name / ID
- Task ID
- Session ID
- Current Status
- What was completed
- What remains
- Why it remains
- Files changed
- Branch
- Commit
- Tests already run
- Tests still required
- Known errors
- Last verified state
- Exact next action
- Timestamp

## উত্তরাধিকার
Successor Agent original task identity মুছে বা overwrite করবে না। নতুন Agent ID এবং নতুন Session ID দিয়ে কাজ চালাবে এবং parent task-এর সঙ্গে link করবে।

## Completion Rule
কাজ সত্যিই শেষ হলে completion record-এ functional, technical, visual এবং live verification-এর ফল থাকতে হবে।

## Rollback Rule
ব্যর্থ পরিবর্তন production-এ নেওয়া যাবে না। আগের verified live state সংরক্ষিত থাকবে এবং rollback তথ্য ledger-এ লেখা হবে।
