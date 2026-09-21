# Agent Handoff Protocol

## কখন handoff বাধ্যতামূলক
Agent session শেষ হলে, কাজ অসম্পূর্ণ থাকলে, blocker পাওয়া গেলে, অথবা অন্য Agent দায়িত্ব নিলে handoff record তৈরি করতে হবে।

## Handoff fields
- Original Agent Name / ID
- Original Task ID
- Current status
- What was completed
- What remains
- Exact files changed
- Current branch
- Last commit
- Tests already passed
- Tests not yet run
- Known errors/blockers
- Required next action
- Successor Agent Name / ID
- Timestamp

## উত্তরাধিকার নিয়ম
Successor Agent প্রথমে handoff পড়বে, তারপর source files ও current branch state পুনরায় যাচাই করবে। শুধু handoff-এর দাবির ওপর নির্ভর করে code change করা যাবে না। Source verification পুনরায় বাধ্যতামূলক।

## ইতিহাস
একটি কাজ একাধিক Agent অতিক্রম করলে chain হবে:
Original Agent → Successor Agent → Reviewer → Verifier → Deployer
প্রতিটি ধাপের পরিচয় ও ফলাফল project history-তে থাকবে।
