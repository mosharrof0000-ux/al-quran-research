# Agent Handoff Protocol — v1.0

## বাধ্যতামূলক handoff
Agent কাজ সম্পূর্ণ করতে না পারলে অবশ্যই লিখবে:
1. Agent Name / Agent ID
2. Task ID
3. কী করার কথা ছিল
4. কী সম্পন্ন হয়েছে
5. কী বাকি
6. কোন files বদলেছে
7. Branch ও latest commit
8. কোন test হয়েছে/হয়নি
9. Known issue/blocker
10. পরবর্তী Agent-এর নির্দিষ্ট কাজ

## উত্তরসূরি নিয়ম
নতুন Agent পুরোনো Agent-এর identity গ্রহণ করবে না। Successor নতুন Agent ID ও Task/Continuation ID পাবে এবং predecessor task ID দিয়ে সম্পর্কিত হবে।

## Completion
Completed handoff-এ final verification, review state, deployment state এবং live verification স্পষ্ট থাকবে।
