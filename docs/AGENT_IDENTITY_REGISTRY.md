# Project Agent Identity Registry v1

## উদ্দেশ্য
প্রতিটি নতুন কাজের জন্য আলাদা Bengali human-like Agent Identity থাকবে। একই identity একই সময়ে দুইটি নতুন কাজের executor হিসেবে পুনঃব্যবহার করা যাবে না।

## Naming rule
কাজের ধরন অনুযায়ী human-like Bengali name নির্ধারণ করা হবে। উদাহরণ:
- UI / Chat → শামীম
- Icon / visual system → শাহীন
- Reader / Quran data → সুমন
- Notification / release → রাকিব
- Browser / runtime verification → নাঈম
- Data / database analysis → তানভীর
- Security / safety → ফারহান

এগুলো উদাহরণ; registry-তে নতুন কাজের জন্য নতুন identity record তৈরি হবে।

## Identity fields
- Agent Name (বাংলা)
- Agent ID (unique)
- Task ID
- Work Type
- Session ID
- Branch
- Parent Task ID (থাকলে)
- Status
- Started At
- Last Updated
- Successor Agent ID (থাকলে)

## গুরুত্বপূর্ণ নিয়ম
1. Agent Name একা পরিচয় নয়; Agent ID + Task ID-ই canonical identity।
2. নতুন কাজ = নতুন Task ID।
3. নতুন স্বতন্ত্র কাজ = নতুন Agent ID।
4. অসম্পূর্ণ কাজ অন্য Agent নিলে successor আলাদা Agent ID হবে।
5. ইতিহাস মুছে ফেলা যাবে না; successor original worker-কে replace করবে না।
6. একই কাজের ধারাবাহিকতায় নতুন session হলেও Task ID অপরিবর্তিত থাকবে।
7. Production deployment-এর আগে identity record-এ validation ও approval status থাকতে হবে।
