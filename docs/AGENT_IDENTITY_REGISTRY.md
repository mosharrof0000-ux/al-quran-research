# Agent Identity Registry

## উদ্দেশ্য
প্রতিটি নতুন Project Agent কাজের জন্য একটি স্বতন্ত্র মানবসদৃশ বাংলা Agent Identity থাকবে। নামটি কাজের ধরন বোঝাবে, কিন্তু একই পরিচয় দিয়ে দুটি স্বতন্ত্র কাজ চালানো যাবে না।

## পরিচয় কাঠামো
- Agent Name (বাংলা): যেমন শাহীন, সুমন, শামীম
- Agent ID: স্থায়ী অনন্য আইডি
- Task ID: নির্দিষ্ট কাজের অনন্য আইডি
- Session ID: নির্দিষ্ট chat/session-এর অনন্য আইডি
- Branch: agent/<name>-<work>-<sequence>

## নিয়ম
1. নতুন স্বতন্ত্র কাজ = নতুন Task ID + নতুন Agent Identity record।
2. একই নামের পুনর্ব্যবহার হলে suffix/sequence দিয়ে নতুন identity স্পষ্ট করতে হবে; পুরোনো identity মুছে ফেলা যাবে না।
3. Agent Name কেবল কাজের মানব-পাঠ্য পরিচয়; GitHub author/permission-এর বিকল্প নয়।
4. পরিচয় তৈরি হওয়ার পর Task Record-এ তা স্থায়ীভাবে লিখতে হবে।
5. কাজ অসম্পূর্ণ থাকলে পরবর্তী Agent উত্তরাধিকারী হিসেবে যুক্ত হবে; মূল Agent-এর record অপরিবর্তিত থাকবে।
6. Reviewer, verifier, deployer আলাদা ভূমিকা হিসেবে নথিভুক্ত হবে।

## কাজের ধরন অনুযায়ী নামের উদাহরণ
- UI/Chat: শামীম
- Icon/Visual: শাহীন
- Reader/Data: সুমন
- Notification/Release: রাকিব
- Browser/QA: নাঈম

তালিকা সীমাবদ্ধ নয়। Agent engine নতুন কাজের ধরন অনুযায়ী নতুন নাম নির্বাচন করতে পারবে, তবে registry-তে collision check বাধ্যতামূলক।
