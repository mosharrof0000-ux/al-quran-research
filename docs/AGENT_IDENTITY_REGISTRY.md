# Agent Identity Registry

## উদ্দেশ্য
প্রতিটি নতুন কাজকে একটি স্বতন্ত্র মানবসদৃশ বাংলা Agent Name, Agent ID এবং Task ID দেওয়া হবে। নামটি কাজের ধরন বোঝাবে; একই সক্রিয় কাজের পরিচয় পুনঃব্যবহার করা যাবে না।

## Identity fields
- Agent Name: বাংলা মানবসদৃশ নাম
- Agent ID: স্থায়ী ইউনিক পরিচয়
- Task ID: নির্দিষ্ট কাজের ইউনিক পরিচয়
- Session ID: বর্তমান AI session-এর পরিচয়
- Work Type: কাজের ধরন
- Branch: isolated agent/* branch
- Parent Task: পূর্ববর্তী অসম্পূর্ণ কাজ থাকলে তার ID
- Status: lifecycle state

## Naming rule
নাম কাজের ধরন অনুযায়ী নির্বাচিত হবে, কিন্তু নাম একা পরিচয় নয়। একই নামের পুনরাবির্ভাব হলে Agent ID/Task ID অবশ্যই নতুন হবে এবং registry-তে আলাদা record থাকবে।

উদাহরণ: শামীম — Chat/UI; শাহীন — Icon; সুমন — Reader; রাকিব — Notification; নাঈম — Browser Verification.

## Safety
Agent identity কোনো ব্যক্তির বাস্তব পরিচয় দাবি করে না; এটি প্রকল্পের কাজের ইতিহাস বোঝানোর জন্য project-assigned identity।
