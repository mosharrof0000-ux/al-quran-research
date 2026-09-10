# আল-কুরআন রিচার্চ — Safe Workspace Protocol v1.0

## উদ্দেশ্য
কোনো নতুন coding/AI/chat/API কাজের কারণে বর্তমান ভালো অবস্থার design, research data, API বা working page নষ্ট হলে যেন সঙ্গে সঙ্গে Known-Good অবস্থায় ফিরে গিয়ে অন্য isolated workspace/page থেকে কাজ চালানো যায়।

## মূল নিয়ম
**MAIN = নিরাপদ ভিত্তি।** Main-এ সরাসরি experimental coding নয়।

প্রতিটি নতুন কাজের জন্য:
1. বর্তমান Known-Good main/commit শনাক্ত করো।
2. সেই অবস্থার backup branch তৈরি করো।
3. আলাদা কাজের branch তৈরি করো।
4. experimental page/file-এ কাজ করো।
5. Test ব্যর্থ হলে কাজের branch বন্ধ/বাতিল করে Known-Good অবস্থায় ফিরো।
6. Test সফল হলে তবেই merge করে main update করো।

## Page Isolation
একটি chat/research page-এ বড় পরিবর্তন করার সময় আগের Known-Good page অপরিবর্তিত থাকবে। নতুন versioned page ব্যবহার করতে হবে। উদাহরণ:
- `...-v3-...html` = Known-Good
- `...-v4-...html` = নতুন কাজ

পুরোনো Known-Good page-এর নাম/ফাইল overwrite করা যাবে না।

## Backend/API Isolation
Worker/API-এর পরিবর্তন আলাদা branch-এ হবে। Frontend ভালো থাকলেও backend পরীক্ষামূলক পরিবর্তনে সমস্যা হলে frontend rollback করার দরকার নেই; শুধু backend change rollback করতে হবে।

## Recovery Levels
### Level 1 — Page সমস্যা
Known-Good versioned page খুলে কাজ চালু।

### Level 2 — Frontend সমস্যা
আগের commit/branch থেকে Known-Good frontend restore।

### Level 3 — Worker/API সমস্যা
শেষ Known-Good Worker commit/deployment-এ ফিরে যাও।

### Level 4 — বড় সমস্যা
সর্বশেষ Known-Good backup branch থেকে পুরো project state পুনরুদ্ধার।

## Never Do
- Main-এ সরাসরি experimental change নয়।
- Known-Good page overwrite নয়।
- Raw research data overwrite নয়।
- API secret/key code-এ রাখা নয়।
- Test না করে merge নয়।
- শুধু code দেখে “live ঠিক” বলা নয়।

## Standard workflow
`KNOWN-GOOD → BACKUP → NEW BRANCH → NEW VERSION/PAGE → TEST → VERIFY → MERGE`

ব্যর্থ হলে:
`NEW BRANCH → STOP → KNOWN-GOOD → TEST → CONTINUE`

## Emergency principle
যদি কোনো কাজ কয়েক ঘণ্টা/দিন ধরে ঠিক না হয়, সমস্যাটি ঠিক করার জন্য একই নষ্ট page-এর ওপর কাজ চালিয়ে যাওয়া যাবে না। Known-Good version খুলে নতুন version/branch থেকে নতুন করে কাজ শুরু করতে হবে।

## Current Known-Good reference
এই protocol তৈরির সময়ের ভিত্তি: `main` commit `7454163d7920d85cd404094ee78c2ea1126bbf0e`.

## Important
এই protocol নিজে research data নয়। এটি project safety mechanism। ভবিষ্যতে architecture বড় হলে একই নিয়ম component-level, API-level, database-level এবং deployment-level isolation-এ প্রয়োগ করতে হবে।
