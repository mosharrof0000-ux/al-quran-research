# Project Agent Identity Registry

## উদ্দেশ্য
প্রতিটি নতুন স্বতন্ত্র কাজের জন্য একটি স্বতন্ত্র Bengali human-like Agent Identity থাকবে। Identity শুধু নাম নয়; এটি Task ID, session, branch, commit ও handoff history-এর সঙ্গে যুক্ত থাকবে।

## Naming rule
- কাজের ধরন অনুযায়ী বাংলা মানবসদৃশ নাম নির্ধারণ করা হবে।
- একই সক্রিয় Task-এ একই Identity পুনর্ব্যবহার করা যাবে না।
- নতুন স্বতন্ত্র কাজ = নতুন Agent Identity.
- পুরোনো অসম্পূর্ণ কাজ গ্রহণ করলে নতুন successor identity হবে; original identity মুছে ফেলা যাবে না।

## Identity fields
- Agent Name (বাংলা)
- Agent ID
- Task ID
- Work Type
- Session ID
- Branch
- Parent Task ID (থাকলে)
- Status
- Started At
- Last Updated At

## Example
- শামীম — Chat UI
- শাহীন — Icon/System
- সুমন — Reader/Data
- রাকিব — Notification
- নাঈম — Browser Verification

এগুলো উদাহরণ; registry-তে একই identity সক্রিয় অবস্থায় দ্বৈতভাবে ব্যবহার করা যাবে না.
