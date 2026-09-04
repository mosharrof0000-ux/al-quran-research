# Backup & Restore Policy v1.0

## লক্ষ্য

এই প্রকল্পে কোনো গুরুত্বপূর্ণ কাজ তৈরি, পরিবর্তন বা সংযোজন করার পর সেটি হারিয়ে যাওয়া ঠেকানো। কোনো পরিবর্তন ভুল হলে দ্রুত আগের কার্যকর অবস্থায় ফিরিয়ে নেওয়া যাবে।

## বাধ্যতামূলক নিয়ম

1. বড় বা ছোট গুরুত্বপূর্ণ পরিবর্তনের আগে বর্তমান কার্যকর অবস্থার পরিচয় শনাক্ত করতে হবে।
2. পরিবর্তনের পর সঙ্গে সঙ্গে একটি নতুন version/commit record তৈরি করতে হবে।
3. কোন ফাইল কী পরিবর্তিত হয়েছে তা Change History-তে traceable রাখতে হবে।
4. বর্তমান ভালো অবস্থার reference আলাদা করে রাখা হবে, যাতে rollback করা যায়।
5. ভুল পরিবর্তনের কারণে আগের ভালো design/data হারানো যাবে না।
6. Raw research data overwrite করা যাবে না; correction নতুন version/proposal হিসেবে থাকবে।
7. Website design-এ surgical change করতে হবে; অপ্রয়োজনীয় full-file replacement এড়াতে হবে।
8. Restore করলে শুধু প্রয়োজনীয় অংশ/সম্পূর্ণ known-good version থেকে পুনরুদ্ধার করা যাবে।
9. Backup-এর পাশাপাশি version history রাখা হবে, যাতে পরিবর্তনের কারণ ও সময় বোঝা যায়।
10. গুরুত্বপূর্ণ stable release হলে ভবিষ্যতে immutable release/tag ব্যবহার করা হবে।

## Restore model

`বর্তমান অবস্থা → Snapshot/Version → পরিবর্তন → পরীক্ষা`

যদি ভুল হয়:

`ভুল অবস্থা → আগের Known-Good Version শনাক্ত → Restore/Rollback → পরীক্ষা → পুনরায় কাজ`

## Backup স্তর

### স্তর ১ — Git version history
প্রতিটি গুরুত্বপূর্ণ পরিবর্তনের commit/version থাকবে। Git repository নিজেই revision history ধরে রাখে; GitHub-এর documentation অনুযায়ী mirror clone দিয়ে repository ও revision history backup করা যায়।

### স্তর ২ — Project snapshots
গুরুত্বপূর্ণ milestone-এ snapshot/reference রাখা হবে। যেমন:
- website-stable-v1
- research-data-stable-v1
- chat-stable-v1
- laboratory-foundation-v1

### স্তর ৩ — Stable releases
পরবর্তীতে প্রস্তুত ও যাচাইকৃত milestone release হিসেবে সংরক্ষণ করা হবে। সম্ভব হলে immutable release ব্যবহার করা হবে, যাতে প্রকাশিত release-এর tag/assets পরিবর্তন করা না যায়।

### স্তর ৪ — External backup
ভবিষ্যতে repository-এর বাইরে আলাদা backup location রাখা হবে, যাতে GitHub-এ সমস্যা হলেও project পুনরুদ্ধারের পথ থাকে। প্রয়োজন অনুযায়ী local/cloud backup ব্যবহার করা হবে।

## গুরুত্বপূর্ণ সতর্কতা

Backup মানে শুধু একটি copy নয়। Restore করা যায় এমন versioned copy প্রয়োজন। তাই প্রত্যেক গুরুত্বপূর্ণ কাজের সঙ্গে version, commit এবং known-good reference রাখা হবে।

## বর্তমান প্রকল্পে প্রয়োগ

এই policy Research Constitution, Master Database, Research API, Website UI, Chat System এবং ভবিষ্যতের Tool Registry/Tool Engine-এর ক্ষেত্রে প্রযোজ্য হবে।

কোনো নতুন Tool তৈরি হলে:

`Tool তৈরি → পরীক্ষা → version → backup/reference → registry → ব্যবহার`

কোনো Tool update হলে:

`পুরোনো version সংরক্ষণ → নতুন version তৈরি → পরীক্ষা → release/reference → ব্যবহার`

ব্যবহারকারীর Workspace customize হলে:

`মূল Tool অপরিবর্তিত → নিজের clone/workspace → নিজের version history`

## মূল অঙ্গীকার

**কোনো কিছু তৈরি করে পরে এমনভাবে পরিবর্তন করা যাবে না যাতে আগের ভালো অবস্থায় ফিরে যাওয়ার পথ হারিয়ে যায়।**

এই policy ভবিষ্যৎ Research Laboratory-এর স্থায়ী engineering rule হিসেবে সংরক্ষিত।
