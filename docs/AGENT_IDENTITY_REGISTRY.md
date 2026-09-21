# Agent Identity Registry

## উদ্দেশ্য
প্রতিটি নতুন কাজের জন্য আলাদা Bengali human-like Agent Identity থাকবে। নামটি কাজের ধরন বোঝাবে এবং একই কাজের ইতিহাসে পুনরায় একই identity ব্যবহার করা যাবে না।

## Identity fields
- Agent Name (বাংলা মানবসুলভ নাম)
- Agent ID
- Task ID
- Session ID
- Task Type
- Requester
- Parent Task ID
- Branch
- Created At
- Status

## Naming rule
নাম কাজের ধরন অনুযায়ী নির্বাচিত হবে, কিন্তু নাম একা identity নয়। আসল uniqueness হবে Agent ID + Task ID + Session ID দিয়ে। উদাহরণ: শামীম / AG-20260921-001 / TASK-20260921-001.

## Continuation
অসম্পূর্ণ কাজ অন্য agent গ্রহণ করলে নতুন Agent ID ও নতুন Task ID হবে। পুরোনো agent-এর নাম ও অসম্পূর্ণ handoff অক্ষত থাকবে এবং successor record-এ parent_task_id থাকবে।

## Production rule
Agent identity ইতিহাসে লেখা হবে। Production deployment-এর আগে task record, changed files, commit, verification ও approval status থাকতে হবে.
