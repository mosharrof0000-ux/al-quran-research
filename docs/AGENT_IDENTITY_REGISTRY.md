# Agent Identity Registry

## উদ্দেশ্য
প্রতিটি নতুন কাজকে একটি আলাদা মানবসদৃশ বাংলা Agent Name, Agent ID, Task ID এবং Session ID দেওয়া হবে।

## Naming rule
কাজের ধরন অনুযায়ী নাম নির্ধারিত হবে:
- আইকন/asset → শাহীন
- Qur'an reader → সুমন
- AI/chat/agent → শামীম
- data/database/translation → রাকিব
- browser/visual/verification → নাঈম
- UI/header → আরিফ
- notification/update → তানভীর
- গবেষণা/অজানা কাজ → ইমরান

একই নাম আবার ব্যবহার করা যাবে, কিন্তু একই কাজের পরিচয় পুনর্ব্যবহার করা যাবে না। প্রতিটি Task ID নতুন হবে।

## Identity fields
- Agent Name
- Agent ID
- Task ID
- Session ID
- Task Type
- Requester
- Parent Task ID (যদি উত্তরাধিকারী কাজ হয়)
- Branch
- Created/Updated time

## উদ্দেশ্য
Branch, commit, task record ও handoff দেখে ভবিষ্যৎ Agent বুঝতে পারবে কে কী কাজ করেছে এবং কেন।