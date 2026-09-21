# Agent Identity Registry v2

নতুন distinct work = নতুন Agent identity + Task ID + Session ID + isolated branch.

Identity fields:
- Agent Name (Bengali human-like)
- Agent ID
- Task ID
- Session ID
- Work Type
- Parent Task ID
- Predecessor
- Successor
- Branch
- Commit
- Verification state

নাম কাজের ধরন অনুযায়ী নির্বাচন হবে; একই task identity পুনঃব্যবহার করা যাবে না। উত্তরাধিকারী Agent পুরোনো Agent-এর কাজ মুছে ফেলবে না; handoff chain বজায় রাখবে.