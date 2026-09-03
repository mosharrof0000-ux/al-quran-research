# গবেষণা প্রকল্প Backup Policy

## মূল লক্ষ্য

ওয়েবসাইটের ডিজাইন, গবেষণা নথি, Chain of Command এবং গবেষণা Database—কোনো একটি নষ্ট হলেও অন্যগুলো যেন নিরাপদ থাকে এবং আগের অবস্থায় ফিরে যাওয়া যায়।

## কী সংরক্ষণ করতে হবে

### ১. Website

GitHub commit history-তে প্রতিটি গুরুত্বপূর্ণ পরিবর্তন রাখতে হবে। বড় পরিবর্তনের আগে Safe Point তৈরি করতে হবে।

### ২. Research Database

`quran_research.db` আলাদা গুরুত্বপূর্ণ সম্পদ। Database পরিবর্তনের আগে backup এবং version record রাখতে হবে।

### ৩. Documentation

`MASTER_PROJECT.md`, `PROJECT_STATE.md`, `docs/` এবং গবেষণা নিয়মের ফাইলগুলো GitHub history-তে version-controlled থাকবে।

### ৪. Research Chain

প্রতিটি বড় চিন্তা, সিদ্ধান্ত, কাজ, পরীক্ষা ও সংশোধন Chain of Command registry-তে থাকবে।

## পরিবর্তনের নিরাপদ ধাপ

**Backup/বর্তমান অবস্থার সংরক্ষণ → Safe Point → পরিবর্তন → পরীক্ষা → ফলাফল → অনুমোদন → পরবর্তী Chain**

## Restore নীতি

কোনো পরিবর্তন ব্যর্থ হলে:

1. বর্তমান সমস্যাযুক্ত অবস্থাকে সংরক্ষণ করতে হবে।
2. কোন Safe Point-এর পর সমস্যা শুরু হয়েছে তা নির্ধারণ করতে হবে।
3. Safe Point-এর Git commit যাচাই করতে হবে।
4. প্রয়োজনীয় Website files সেই commit থেকে ফিরিয়ে আনতে হবে।
5. Database আলাদা করে যাচাই করতে হবে।
6. Website ও research functions পরীক্ষা করতে হবে।
7. Restore-টি নতুন Chain record হিসেবে লিখতে হবে।

## কখন Backup/Safe Point বাধ্যতামূলক

- Website design পরিবর্তনের আগে
- Database schema/data পরিবর্তনের আগে
- AI integration পরিবর্তনের আগে
- বড় folder/file restructuring-এর আগে
- পুরোনো file delete/replace করার আগে
- নতুন research engine বা feature যোগ করার আগে

## নিষিদ্ধ

- ইতিহাস মুছে ফেলা
- পুরোনো Safe Point overwrite করা
- Backup ছাড়া গুরুত্বপূর্ণ Database পরিবর্তন
- সমস্যাযুক্ত অবস্থার ইতিহাস মুছে ফেলে সরাসরি restore করা
- GitHub Secrets বা API key কোনো file-এ রাখা

## Version

Backup Policy Version: 0.1
