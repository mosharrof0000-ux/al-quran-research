# Agent Handoff Protocol — v1.0

## উদ্দেশ্য
এক Agent-এর অসম্পূর্ণ বা যাচাই-অপেক্ষমাণ কাজ যেন অন্য Agent নির্ভুলভাবে গ্রহণ করতে পারে।

## Handoff must contain
1. Agent Name
2. Agent ID
3. Task ID
4. Parent Task ID
5. Branch
6. Current state
7. What was read
8. What was changed
9. Commit SHA
10. What is complete
11. What remains
12. Known errors/risks
13. Tests already run
14. Tests still required
15. Exact next action
16. Successor Agent Name/ID
17. Timestamp

## Takeover rule
Successor প্রথমে handoff পড়বে, তারপর relevant source/instruction পুনরায় যাচাই করবে। শুধু আগের Agent-এর বক্তব্যের ওপর নির্ভর করে কাজ শুরু করা যাবে না।

## Completion rule
সব required verification শেষ হলে handoff record-এ completion evidence যোগ হবে। অসম্পূর্ণ থাকলে INCOMPLETE_HANDOFF status ব্যবহার হবে।

## Communication
প্রতিটি Agent report-এ স্পষ্ট থাকবে:
- আমি কে
- কী করেছি
- কী বদলেছি
- কোথায় করেছি
- কী যাচাই করেছি
- কী বাকি
- পরবর্তী Agent কী করবে
