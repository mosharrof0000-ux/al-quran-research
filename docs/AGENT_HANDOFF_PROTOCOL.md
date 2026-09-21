# Agent Handoff Protocol

## Rule
কোনো Agent কাজ থামালে—সম্পূর্ণ হোক বা অসম্পূর্ণ—পরবর্তী Agent যেন শূন্য থেকে শুরু না করে।

## Handoff record
- Task ID
- Original Agent Name
- Successor Agent Name
- Request
- Current Status
- Completed Work
- Remaining Work
- Files Read
- Files Changed
- Branch
- Commit
- Tests Performed
- Known Problems
- Exact Next Step
- Timestamp

## Status chain
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

Failure states: BLOCKED, ROLLED_BACK.

## Continuation rule
অসম্পূর্ণ কাজ successor Agent গ্রহণ করলে history-তে Original Agent এবং Successor Agent দুজনের নাম আলাদা থাকবে। Successor পুরনো কাজ মুছে নিজের নামে চালাবে না; parent Task ID ব্যবহার করবে।

## Safety
Agent branch ছাড়া write নয়। main-এ সরাসরি write নয়। Production deployment কেবল explicit promotion gate ও live verification-এর পরে।
