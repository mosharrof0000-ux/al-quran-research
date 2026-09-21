# Project Agent Handoff Protocol — v1.0

## Purpose
এক agent অসম্পূর্ণ কাজ রেখে গেলে পরবর্তী agent যেন শূন্য থেকে শুরু না করে এবং পূর্ববর্তী কাজের ইতিহাস অক্ষুণ্ণ থাকে।

## Mandatory handoff trigger
Handoff Record বাধ্যতামূলক যখন:
- task অসম্পূর্ণ রেখে session শেষ হয়;
- agent blocked হয়;
- verification ব্যর্থ হয়;
- অন্য agent দায়িত্ব নেয়;
- user task স্থগিত করেন;
- deployment/promotion approval-এর অপেক্ষা থাকে।

## Handoff fields
1. Task ID
2. Original Agent Name
3. Original Agent ID
4. Successor Agent Name/ID
5. Parent Task ID
6. Objective
7. Completed work
8. Remaining work
9. Changed files
10. Branch
11. Commits
12. Tests and results
13. Known failures/limitations
14. Protected paths not touched
15. Required next action
16. Approval/deployment state
17. Timestamp

## Handoff rules
- Original record immutable in meaning: successor may append corrections/addenda but must not erase the predecessor's work history.
- Successor gets a new identity for the inherited continuation.
- Successor must read the predecessor handoff before editing.
- If the predecessor's change is unsafe, successor records the finding and creates a repair task rather than silently rewriting history.
- Completion of the successor does not mark the predecessor as completed; the chain records HANDED_OFF → COMPLETED_BY_SUCCESSOR.

## Verification handoff
A successor must independently verify inherited claims when practical. “Previous agent said it worked” is not sufficient evidence for VERIFIED or LIVE_VERIFIED.

## Final closure
A task may be CLOSED only when:
- required work is complete or explicitly accepted as stopped;
- remaining work is recorded;
- relevant tests are recorded;
- branch/commit state is recorded;
- approval/promotion state is explicit;
- successor relationship is recorded when applicable.
