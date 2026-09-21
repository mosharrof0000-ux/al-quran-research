# Agent Identity Registry

## উদ্দেশ্য
প্রতিটি নতুন Project Agent কাজের জন্য আলাদা মানবসদৃশ বাংলা Agent Name, Agent ID, Task ID এবং Branch পরিচয় থাকবে। একই কাজের ইতিহাসে পরিচয় পুনর্ব্যবহার করা যাবে না।

## Identity fields
- Agent Name (বাংলা): যেমন শাহীন, সুমন, শামীম
- Agent ID: স্থায়ী unique identifier
- Task ID: কাজের unique identifier
- Session ID: যে chat/session থেকে কাজ শুরু হয়েছে
- Work Type: কাজের ধরন
- Branch: agent/*
- Parent Task ID: অন্য কাজ থেকে উত্তরাধিকার হলে
- Created / Updated timestamp

## Naming rules
1. নতুন স্বতন্ত্র কাজ = নতুন Agent Identity.
2. একই নাম আবার ব্যবহার হলে unique suffix/identity ID বাধ্যতামূলক।
3. নামটি কাজের ধরন বোঝাতে সাহায্য করবে, কিন্তু নাম দিয়ে অনুমানভিত্তিক ক্ষমতা/দক্ষতা নির্ধারণ করা যাবে না।
4. Agent identity ইতিহাসে সংরক্ষিত থাকবে; মুছে ফেলা নয়, status পরিবর্তন করা যাবে।
5. Incomplete কাজ অন্য Agent নিলে Original Agent এবং Successor Agent দুজনের নামই থাকবে।

## Example
- আইকন কাজ → শাহীন → Task ID → Branch
- Reader কাজ → সুমন → Task ID → Branch
- Browser verification → নাঈম → Task ID → Branch

## Source of truth
Identity registry + work ledger + handoff record একসাথে একটি audit trail তৈরি করবে।
