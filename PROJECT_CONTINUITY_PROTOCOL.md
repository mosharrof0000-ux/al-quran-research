# PROJECT CONTINUITY PROTOCOL — স্থায়ী প্রকল্প ধারাবাহিকতা ব্যবস্থা

## উদ্দেশ্য
এই ফাইলের উদ্দেশ্য হলো account, AI, device বা chat session পরিবর্তন হলেও প্রকল্পের কাজ যেন শুরু থেকে আবার বোঝাতে না হয়। নতুন AI বা নতুন session-কে repository-এর নথি দেখে প্রকল্পের বর্তমান অবস্থা, স্থায়ী নিয়ম, সাম্প্রতিক সিদ্ধান্ত এবং পরবর্তী কাজ বুঝতে হবে।

## বাধ্যতামূলক নীতি
কোনো কাজ শুরু করার আগে এই ক্রম অনুসরণ করতে হবে:

1. `MASTER_PROJECT.md` পড়ে স্থায়ী উদ্দেশ্য ও সীমা বুঝতে হবে।
2. `PROJECT_STATE.md` পড়ে বর্তমান অবস্থা বুঝতে হবে।
3. `PROJECT_WORK_LOG.md`-এর সর্বশেষ entry পড়ে সর্বশেষ সিদ্ধান্ত ও অসমাপ্ত কাজ বুঝতে হবে।
4. প্রাসঙ্গিক locked/master/demo/work file সরাসরি পরীক্ষা করতে হবে; অনুমান করা যাবে না।
5. পরিবর্তনের আগে বর্তমান file/commit/restore point শনাক্ত করতে হবে এবং backup reference লিখতে হবে।
6. ব্যবহারকারীর নির্দেশ নিজের ভাষায় সংক্ষেপে নিশ্চিত করতে হবে; অস্পষ্ট হলে অনুমতি ছাড়া পরিবর্তন করা যাবে না।
7. কাজ আলাদা working copy/branch/file-এ করতে হবে যদি master বা locked file পরিবর্তনের অনুমতি না থাকে।
8. পরিবর্তনের পরে code/file পরীক্ষা করতে হবে; সফল না হলে সফল বলা যাবে না।
9. ফলাফল `PROJECT_WORK_LOG.md`-এ লিখতে হবে।
10. `PROJECT_STATE.md`-এ শুধু বর্তমান স্থায়ী অবস্থা ও গুরুত্বপূর্ণ পরিবর্তন সংক্ষেপে আপডেট করতে হবে।
11. Backup/restore reference `PROJECT_BACKUP_INDEX.md`-এ লিখতে হবে।

## Conversation Continuity Rule
Chat-এর সম্পূর্ণ transcript repository-তে হুবহু কপি করা বাধ্যতামূলক নয়। কিন্তু কাজের জন্য গুরুত্বপূর্ণ তথ্য অবশ্যই সংরক্ষণ করতে হবে:

- ব্যবহারকারীর উদ্দেশ্য ও সিদ্ধান্ত
- কী পরিবর্তন করতে বলা হয়েছে
- কী পরিবর্তন করা হয়নি
- কোন file/branch/page প্রভাবিত
- backup/commit/restore reference
- verification result
- known problem
- next step

কোনো AI-এর hidden chain-of-thought সংরক্ষণ করা হবে না। শুধু ব্যবহারকারী-অনুমোদিত সিদ্ধান্ত, কার্যকর নির্দেশ, ফলাফল ও যাচাইযোগ্য প্রকল্প-তথ্য রাখা হবে।

## Handoff Rule
নতুন account বা AI এলে প্রথমে repository-এর এই চারটি ফাইল পড়তে হবে:

1. `MASTER_PROJECT.md`
2. `PROJECT_STATE.md`
3. `PROJECT_CONTINUITY_PROTOCOL.md`
4. `PROJECT_WORK_LOG.md`

তারপর প্রাসঙ্গিক `PROJECT_BACKUP_INDEX.md` এবং সংশ্লিষ্ট কাজের file পরীক্ষা করতে হবে। এই ধাপ শেষ না করে নতুন করে project সম্পর্কে অনুমান করা যাবে না।

## Change Record Template
প্রতিটি গুরুত্বপূর্ণ কাজের জন্য `PROJECT_WORK_LOG.md`-এ:

- Work ID
- Date/time
- User decision
- Objective
- Files/pages inspected
- Backup before change
- Working copy/branch
- Changes made
- Changes intentionally not made
- Verification
- Result/status
- Known issues
- Next step

## Priority
ব্যবহারকারীর নতুন স্পষ্ট নির্দেশ > এই continuity protocol > পুরোনো experimental assumption.
তবে locked/master protection এবং backup-before-change নীতি বজায় থাকবে যতক্ষণ না ব্যবহারকারী স্পষ্টভাবে তা পরিবর্তন করেন।
