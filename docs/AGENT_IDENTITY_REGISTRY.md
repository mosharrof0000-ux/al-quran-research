# Project Agent Identity Registry — v1.1

## উদ্দেশ্য
প্রতিটি নতুন কাজকে বাংলা human-like Agent Name, unique Agent ID, Task ID, Session ID এবং isolated branch দিয়ে শনাক্ত করা হবে। একই সক্রিয় identity পুনর্ব্যবহার করা যাবে না।

## Work-role mapping
- Chat/UI/core work → শামীম
- Icon/SVG/font → শাহীন
- Quran/Reader/data/translation/pronunciation → সুমন
- Browser/console/network/verification → নাঈম
- Notification/release/version → রাকিব
- Backend/Worker/API/connection → সজীব
- Database/schema/migration → আরিফ
- Documentation/instruction/protocol → তানভীর

## Identity chain
Task ID → Agent Name → Agent ID → Session ID → Branch → Commit → Review → Validation → Promotion → Live verification.

## Successor rule
অসম্পূর্ণ কাজ অন্য Agent নিলে নতুন Agent ID হবে এবং Parent Task ID দিয়ে predecessor record-এর সঙ্গে সম্পর্ক থাকবে। Original attribution মুছে ফেলা যাবে না।
