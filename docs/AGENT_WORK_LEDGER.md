# Agent Work Ledger

প্রতিটি Project Agent কাজের সম্পূর্ণ জীবনচক্র এখানে নথিভুক্ত হবে।

## Required record
- Task ID
- Requester
- Agent Name (বাংলা)
- Agent ID
- Session ID
- Parent Task ID
- Work Type
- User Request
- Status
- Branch
- Changed Files
- Commit SHA
- Tests
- Validation
- Deployment State
- Live Verification
- Notification State
- Remaining Work
- Handoff To
- Created At / Updated At

## Status flow
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE

## Failure states
BLOCKED / ROLLED_BACK / INCOMPLETE

## Rule
কোনো কাজ অসম্পূর্ণ অবস্থায় session শেষ হলে Handoff Record বাধ্যতামূলক।
