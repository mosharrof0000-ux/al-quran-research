# Project Agent — Task History & Recovery Lineage Protocol v1

## উদ্দেশ্য
প্রতিটি Agent task-এর পরিচয়, parent/child সম্পর্ক, resume, checkpoint, error, verification এবং commit lineage স্থায়ীভাবে সংরক্ষণ করা।

## Task journal
প্রতিটি task-এর isolated branch-এ:
`docs/agent-work/runtime/<TASK_ID>.json`

মূল lineage fields:
- `task_id`
- `parent_task_id`
- `agent_id`
- `session_id`
- `branch`
- `state`
- `resume_count`
- `started_at`
- `deadline_at`
- `last_verified_step`
- `last_commit`
- `recovery_point`
- `previous_state`
- `verification_status`
- `history[]`

## History
প্রতিটি state persistence-এ একটি event যোগ হবে। সাম্প্রতিক 100টি event রাখা হবে যাতে journal সীমাহীনভাবে বড় না হয়।

প্রতিটি event-এ state, timestamp, resume count, commit, recovery point এবং error evidence থাকবে।

## Recovery
Incomplete task একই Task ID, session এবং isolated branch থেকে resume করবে। Resume attempt নতুন active execution window পাবে, কিন্তু পুরোনো history/checkpoint হারাবে না।

`WAITING_FOR_RECOVERY` বা `BLOCKED` অবস্থায় last recovery point সংরক্ষিত থাকবে। Verified completion হলে `HANDOFF_COMPLETE` এবং last verified step লেখা হবে।

## Safety
- শুধু `agent/*` branch।
- main-এ write নয়।
- merge/deploy নয়।
- protected paths অপরিবর্তিত।
- history/lineage কোনোভাবেই production data overwrite করবে না।
- independent verification ছাড়া success completion report নয়।

## Audit principle
একজন পরবর্তী Agent যেন শুধু Task ID দেখে বুঝতে পারে: কাজটি কে শুরু করেছে, কোন session/branch-এ হয়েছে, কতবার resume হয়েছে, কোথায় checkpoint ছিল, কোন commit সর্বশেষ প্রমাণিত এবং কেন recovery প্রয়োজন হয়েছিল।
