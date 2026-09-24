# Agent Identity Registry

প্রতিটি নতুন কাজের জন্য নতুন Task ID, Agent ID এবং isolated branch থাকবে। Agent Name মানবসদৃশ বাংলা নাম হবে এবং কাজের ধরন থেকে নির্ধারিত হবে। নামটি project-assigned identity; কোনো বাস্তব ব্যক্তির পরিচয় নয়।

## Work-type examples
- আইকন → শাহীন
- Reader/Quran → সুমন
- Chat/UI → শামীম
- Browser/Test/Verification → নাঈম
- Notification → রাকিব
- Data → তানভীর
- Research → আরিফ
- Agent/Backend → নাবিল

একই নাম আবার ব্যবহার করা গেলেও Agent ID/Task ID/Session ID নতুন ও আলাদা হতে হবে। অসম্পূর্ণ কাজ নিলে Parent Task এবং successor identity সংরক্ষণ করতে হবে।

## Required chain
Task ID → Requester → Agent Name/ID → Session ID → Work Type → Parent Task → Branch → Changed Files → Commit → Tests → Review → Approval → Deployment → Live Verification → Notification → Handoff.
