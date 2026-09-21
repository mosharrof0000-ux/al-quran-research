# Agent Work Ledger — Universal Work History

এই ledger প্রকল্পে কে কোন কাজ করেছে, কোথায় থেমেছে এবং কে পরে দায়িত্ব নিয়েছে—তার স্থায়ী ইতিহাস।

## নিয়ম
- নতুন কাজ = নতুন Task ID + Agent identity + isolated branch।
- কাজ অসম্পূর্ণ অবস্থায় থামলে Handoff Record বাধ্যতামূলক।
- অন্য Agent কাজ নিলে নতুন Agent identity এবং successor Task ID তৈরি হবে; original worker-এর ইতিহাস অপরিবর্তিত থাকবে।
- কোনো Agent অন্য Agent-এর completed/failed/incomplete history overwrite করবে না।
- Production/main পরিবর্তনের আগে review, validation এবং explicit approval থাকতে হবে।

## প্রতিটি task record
1. Task ID
2. Requester
3. Agent Name (বাংলা)
4. Agent ID
5. Session ID
6. কাজের ধরন
7. User command
8. Parent/Successor Task ID
9. Branch
10. Start/Update time
11. Read/inspected files
12. Changed files
13. Commit SHA
14. Tests এবং ফলাফল
15. সমস্যা/কারণ
16. Repair attempts
17. Validation
18. Deployment status
19. Live verification
20. User notification
21. Remaining work
22. Handoff instructions

## Audit principle
কাজের ফলাফল নয়, কাজের পথও সংরক্ষিত হবে। ফলে ভবিষ্যৎ Agent আগের সিদ্ধান্ত, পরিবর্তন, পরীক্ষা ও অসম্পূর্ণতা বুঝে কাজ চালাতে পারবে।
