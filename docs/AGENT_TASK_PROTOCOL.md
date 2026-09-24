# Agent Task Protocol v1

প্রতিটি user command একটি traceable Task হিসেবে গণ্য হবে।

## Required fields
- Task ID
- Agent Name
- Agent ID
- Session ID
- Requester
- Work Type
- Parent Task ID
- State
- Branch
- Start/Update timestamps
- Files inspected
- Files changed
- Commit SHA
- Test evidence
- Runtime evidence
- Live evidence
- Approval state
- Handoff state

## State rules
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE.

BLOCKED, ROLLED_BACK এবং INCOMPLETE_HANDOFF আলাদা terminal/paused states।

## Continuation
অসম্পূর্ণ Task-এর successor নতুন identity নেবে এবং Parent Task ID ধরে কাজ চালাবে। predecessor-এর history অপরিবর্তিত থাকবে।

## Communication contract
Agent report-এ সবসময়: আমি কে, কী পড়েছি, কী করেছি, কী বদলেছি, কী যাচাই করেছি, কী বাকি, পরবর্তী পদক্ষেপ।
