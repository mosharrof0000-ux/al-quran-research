# Agent Identity Registry — Universal

## উদ্দেশ্য
প্রতিটি নতুন কাজ, chat/session এবং দায়িত্বশীল AI worker-এর জন্য প্রকল্পে স্থায়ী পরিচয় রাখা হবে। নামটি কাজের ধরন বোঝাবে এবং একই active identity একাধিক কাজে পুনঃব্যবহার করা যাবে না।

## পরিচয় কাঠামো
- Agent Name: বাংলা মানবসুলভ নাম (উদাহরণ: শাহীন, শামীম, সুমন)
- Agent ID: স্থায়ী unique identifier
- Task ID: প্রতিটি কাজের unique identifier
- Session ID: যে chat/session থেকে কাজ শুরু হয়েছে
- Branch: কাজের isolated branch
- Parent Task: অন্য কাজ থেকে উত্তরাধিকার হলে parent task ID

## Naming rule
1. System/Agent engineering কাজের জন্য নামের উদাহরণ: শাহীন
2. Chat/UI কাজ: শামীম
3. Reader/Data কাজ: সুমন
4. Verification/Browser কাজ: নাঈম
5. একই নামের নতুন কাজ হলে unique suffix/Agent ID আবশ্যক।
6. নাম কখনো ইতিহাস মুছে বা overwrite করবে না।

## Work chain
Task ID → Agent Name/ID → Session ID → Branch → Files → Commit → Review → Validation → Deployment → Live Verification → Notification → Handoff

## Required status
RECEIVED, INSPECTING, PLANNED, WORKING, TESTING, REPAIRING, VALIDATED, READY_FOR_REVIEW, APPROVED, DEPLOYING, LIVE_VERIFIED, NOTIFIED, HANDOFF_COMPLETE, BLOCKED, ROLLED_BACK

## Mandatory identity fields
- task_id
- agent_name_bn
- agent_id
- session_id
- requester
- task_type
- parent_task_id
- status
- branch
- created_at
- updated_at
- changed_files
- commit_sha
- tests
- deployment
- live_verification
- notification
- successor_task_id
