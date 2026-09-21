# Project Agent — Handoff Protocol

## লক্ষ্য
এক Agent-এর অসম্পূর্ণ বা paused কাজ অন্য Agent নিরাপদে গ্রহণ করতে পারবে, কিন্তু আগের Agent-এর কাজ ও পরিচয় মুছে যাবে না।

## Handoff বাধ্যতামূলক যখন
- task অসম্পূর্ণ অবস্থায় session শেষ হয়
- test failure থেকে যায়
- external secret/permission প্রয়োজন
- user approval প্রয়োজন
- deployment অপেক্ষমাণ
- নতুন Agent দায়িত্ব নেয়

## Handoff record
প্রতিটি handoff-এ লিখতে হবে:
- From Agent Name
- From Agent ID
- To Agent Name
- To Agent ID (যদি ইতিমধ্যে assigned হয়)
- Task ID
- Parent Task ID
- Current Status
- Completed
- Remaining
- Changed Files
- Current Branch
- Latest Commit
- Tests Passed
- Tests Failed
- Known Risks
- Exact Next Step
- User Approval Needed
- Timestamp

## Takeover rule
নতুন Agent প্রথমে:
1. Handoff record পড়বে
2. সর্বশেষ commit/branch যাচাই করবে
3. changed files পুনরায় পড়বে
4. প্রয়োজনীয় runtime state যাচাই করবে
5. তারপরই নতুন পরিবর্তন করবে

## No false completion
শুধু code লেখা, commit হওয়া বা CI green হওয়া = completed নয়।
Live verification প্রয়োজন হলে live verification ছাড়া LIVE_VERIFIED লেখা যাবে না।

## Preservation
পুরোনো Agent-এর record, branch, commit ও handoff history immutable history হিসেবে সংরক্ষণ করতে হবে। নতুন Agent শুধু successor record যোগ করবে।
