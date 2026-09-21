# Agent Handoff Protocol

## অসম্পূর্ণ কাজ
কাজ থামলে, ব্যর্থ হলে বা Agent session শেষ হলে বাধ্যতামূলক handoff record তৈরি হবে।

## Handoff fields
- Original Agent Name / Agent ID
- Original Task ID
- Parent Task ID
- Current Status
- Completed work
- Incomplete work
- Changed files
- Branch
- Last commit
- Tests already passed
- Known failures / blockers
- Exact next steps
- Successor Agent Name / Agent ID / Task ID

## Successor rule
নতুন Agent আগের কাজ নিজের কাজ হিসেবে মুছে ফেলবে না। সে successor হিসেবে যুক্ত হবে এবং original worker-এর history অক্ষুণ্ণ রাখবে।

## Evidence rule
Handoff কেবল কথায় নয়; project documentation-এ সংরক্ষিত হবে যাতে পরবর্তী Agent একই ইতিহাস পুনরায় আবিষ্কার না করে সরাসরি কাজ চালাতে পারে।
