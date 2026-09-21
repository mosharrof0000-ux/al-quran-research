# Agent Handoff Protocol

## কখন handoff বাধ্যতামূলক
- কাজ অসম্পূর্ণ
- blocker পাওয়া গেছে
- session শেষ
- অন্য Agent কাজ গ্রহণ করেছে
- validation বাকি

## Handoff fields
- Task ID
- Original Agent Name
- Successor Agent Name (যদি থাকে)
- Role
- Request
- Status
- Completed
- Remaining
- Changed Files
- Branch
- Commit(s)
- Tests/verification
- Blockers
- Next Agent Instructions
- Timestamp

## নিয়ম
Original work history অপরিবর্তিত থাকবে। Successor কেবল নতুন continuation record যোগ করবে। কোনো Agent পূর্ববর্তী Agent-এর কাজ নিজের নামে দাবি করবে না।
