# Agent Identity Registry — v1

প্রতিটি নতুন Project Agent কাজকে আলাদা বাংলা মানবসদৃশ Agent Name, Agent ID, Task ID, Session ID ও agent/* branch-এর সঙ্গে শনাক্ত করা হবে।

## পরিচয়
- Agent Name: কাজের ধরন অনুযায়ী বাংলা নাম
- Agent ID: unique পরিচয়
- Task ID: প্রতিটি কাজের unique ID
- Session ID: যে AI session কাজ শুরু করেছে
- Branch: isolated agent/* branch
- Parent Task ID: পূর্ববর্তী অসম্পূর্ণ কাজ থাকলে

## নামের নীতি
নাম কাজের ধরন বোঝাতে সাহায্য করবে; প্রকৃত পরিচয় Agent ID + Task ID + branch + commit দ্বারা নির্ধারিত হবে। একই সময়ে একই পরিচয় দুই কাজে ব্যবহার নয়।

উদাহরণ: আইকন—শাহীন; Chat UI—শামীম; Reader—সুমন; Notification—রাকিব; Browser verification—নাঈম।

Agent Name কোনো approval/deploy permission দেয় না।