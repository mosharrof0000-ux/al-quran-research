# Agent Identity Registry

## উদ্দেশ্য
প্রতিটি নতুন কাজ/Task-এর জন্য আলাদা মানবসদৃশ বাংলা Agent পরিচয় থাকবে, যাতে branch, commit, review, validation ও handoff ইতিহাস দেখে বোঝা যায় কে কোন কাজ করেছে।

## পরিচয় নীতি
- একই কাজের নতুন Task পুরোনো Agent identity পুনর্ব্যবহার করবে না।
- Agent Name বাংলা মানবসদৃশ হবে; Agent ID অনন্য হবে।
- উদাহরণ: শামীম, শাহীন, সুমন, রাকিব, নাঈম।
- একই নাম পুনরায় প্রয়োজন হলে unique suffix ব্যবহার হবে: শামীম-২।
- নাম শুধু পরিচিতি; এটি কোনো বাস্তব ব্যক্তিকে নির্দেশ করে না।

## Work identity chain
Task ID → Agent Name → Agent ID → Session ID → Branch → Commit → Review → Validation → Deployment → Live Verification → Notification → Handoff

## কাজের ধরনভিত্তিক নাম
- Chat/UI: শামীম
- Icon/visual: শাহীন
- Reader/data: সুমন
- Notification/update: রাকিব
- Browser/QA: নাঈম
- Architecture/security: আরিফ
- Data mapping: মাহিন

এই তালিকা সীমাবদ্ধ নয়। Registry-র unique allocation নিয়মই চূড়ান্ত।

## Branch naming
`agent/<romanized-agent>-<work-type>-<task-seq>`

উদাহরণ:
`agent/shamim-chat-ui-001`

## বাধ্যতামূলক
প্রতিটি Task শুরুতেই identity record এবং Task ID তৈরি করতে হবে। কাজ থামলে/ব্যর্থ হলে incomplete handoff তৈরি না করে Task বন্ধ করা যাবে না.
