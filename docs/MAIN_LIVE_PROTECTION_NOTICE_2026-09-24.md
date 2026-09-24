# MAIN LIVE PROTECTION NOTICE — 2026-09-24

**Status:** ACTIVE — বাধ্যতামূলক

## স্থায়ী সিদ্ধান্ত
প্রকল্পের নির্ধারিত Main Live URL কোনো feature/update-এর কারণে পরিবর্তন করা যাবে না।

**Canonical Main Live URL:**
https://mosharrof0000-ux.github.io/al-quran-research/#quran

## বাধ্যতামূলক Update Rule
1. Main Live URL একই থাকবে।
2. নতুন feature-এর direct/test URL-কে Main Live হিসেবে ঘোষণা করা যাবে না।
3. কাজের আগে Main-এর সর্বশেষ নিরাপদ অবস্থার backup/restore point নিতে হবে।
4. কাজ branch/safe copy-তে প্রস্তুত ও যাচাই করতে হবে।
5. অনুমোদিত পরিবর্তন Main branch-এ merge হবে।
6. Production deployment সফল না হওয়া পর্যন্ত কাজ সম্পূর্ণ বলা যাবে না।
7. Feature/Test URL থাকলে সেটি কেবল পরীক্ষার লিংক।
8. Live সমস্যা হলে সর্বশেষ নিরাপদ backup restore করতে হবে।
9. ব্যর্থ version মুছে ফেলা যাবে না; Storage/History-তে FAILED বা CANCELLED হিসেবে সংরক্ষণ করতে হবে।
10. Main Live URL বদলানো যাবে না, ব্যবহারকারীর আলাদা স্পষ্ট অনুমোদন ছাড়া।

## URL ভুল প্রতিরোধ
ভবিষ্যৎ রিপোর্টে সবসময় আলাদা করে দেখাতে হবে:
- Main Live: canonical URL
- Feature/Test: প্রয়োজনে আলাদা test URL
- Deployment Status: workflow URL

Feature/Test URL-কে Main Live হিসেবে উপস্থাপন করা নিষিদ্ধ।

## Current backup
Smart Face কাজের আগে backup branch:
backup/pre-mosharrif-smart-face-2026-09-24

## Current rule
মেইন লাইভ হবে স্থায়ী প্রবেশদ্বার; পরিবর্তন হবে controlled deployment-এর মাধ্যমে।