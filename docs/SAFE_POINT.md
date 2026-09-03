# নিরাপদ সংরক্ষণ বিন্দু (SAFE POINT)

## উদ্দেশ্য

এই নথি এমন একটি নির্ভরযোগ্য অবস্থান চিহ্নিত করে যেখান থেকে ওয়েবসাইট, গবেষণা কাঠামো ও ডকুমেন্টেশন নষ্ট হলে আগের অবস্থায় ফিরে যাওয়া যাবে।

## Safe Point নিয়ম

1. নতুন বড় পরিবর্তনের আগে সর্বশেষ ভালো অবস্থাকে Safe Point হিসেবে চিহ্নিত করতে হবে।
2. Safe Point কখনো মুছে ফেলা যাবে না।
3. পরবর্তী পরিবর্তন খারাপ হলে আগের Git commit-এ ফিরে যাওয়া যাবে।
4. মূল গবেষণা Database (`quran_research.db`) আলাদা নিরাপত্তা সম্পদ; Website পরিবর্তনের সঙ্গে এটি overwrite করা যাবে না।
5. কোনো পুরোনো ফাইল সরানোর আগে তার Git history থাকতে হবে।
6. নতুন পরিবর্তন Chain of Command-এর সঙ্গে যুক্ত হবে।

## বর্তমান Safe Point

Status: ACTIVE
Repository: `mosharrof0000-ux/al-quran-research`
Branch: `main`

এই Safe Point-এর ভিত্তি হলো বর্তমানে GitHub-এ সংরক্ষিত commit history। সর্বশেষ নিরাপদ অবস্থার নির্দিষ্ট commit SHA প্রতিটি Safe Point তৈরির সময় এখানে যোগ করতে হবে।

## Restore করার নিয়ম

সমস্যা দেখা দিলে:

**সমস্যাযুক্ত পরিবর্তন → শেষ Safe Point শনাক্ত → Git commit যাচাই → Website files restore → Database আলাদা যাচাই → Website পরীক্ষা → Chain record তৈরি**

## গুরুত্বপূর্ণ সতর্কতা

- শুধু Website নষ্ট হলে Database restore করা যাবে না।
- Database নষ্ট হলে Website-এর পুরোনো commit দিয়ে Database-এর জায়গা অনুমান করে বানানো যাবে না।
- কোনো restore-এর আগে বর্তমান সমস্যাযুক্ত অবস্থাটিও নতুন commit/backup হিসেবে রেখে দিতে হবে, যাতে তদন্তের ইতিহাস হারিয়ে না যায়।
- AI-generated কোনো restore সিদ্ধান্ত নিজে থেকে Verified নয়; মানব অনুমোদন প্রয়োজন।

## Safe Point Check List

- [ ] GitHub commit আছে
- [ ] Website স্বাভাবিকভাবে খোলে
- [ ] প্রধান navigation কাজ করে
- [ ] গবেষণা Database অপরিবর্তিত/যাচাইকৃত
- [ ] গুরুত্বপূর্ণ documentation আছে
- [ ] Chain of Command record আছে
- [ ] Restore instructions সংরক্ষিত

## Version

Safe Point Policy Version: 0.1
