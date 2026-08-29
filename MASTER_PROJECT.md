# আল-কুরআন ভাষাভিত্তিক গবেষণা — MASTER PROJECT

## ১. প্রকল্পের উদ্দেশ্য

আল-কুরআনের ভাষা, শব্দ, মূল/ধাতু, ব্যাকরণ, অর্থপরিসর, বিষয়, অনুবাদ, প্রমাণ এবং পরিসংখ্যানকে একটি স্বচ্ছ, যাচাইযোগ্য ও ভবিষ্যৎ-উপযোগী গবেষণা কাঠামোয় সংরক্ষণ করা।

## ২. মূল নীতি

* অনুমানকে যাচাইকৃত তথ্য হিসেবে প্রকাশ করা যাবে না।
* AI-এর তৈরি তথ্য নিজে থেকে Verified হবে না।
* মূল তথ্য overwrite করা যাবে না; সংশোধন হলে নতুন version/proposal তৈরি হবে।
* প্রতিটি গবেষণা-দাবির সঙ্গে যাচাইযোগ্য প্রমাণ থাকবে।
* গাণিতিক ফলের সংজ্ঞা, সূত্র, dataset/version এবং calculation record থাকবে।
* মতভেদ থাকলে তা মুছে না দিয়ে পৃথক analysis হিসেবে রাখা হবে।
* পাঠকের অজানা প্রশ্নও স্থায়ী গবেষণা প্রশ্ন হিসেবে সংরক্ষণ করা যাবে।
* Website বদলালেও মূল database ও research data ব্যবহারযোগ্য থাকতে হবে।

## ৩. গবেষণার প্রধান স্তর

মূল আরবি পাঠ → আয়াত → শব্দ/Token → Lexeme → Root → Morphology → Syntax → Context/Semantics → Evidence → Claim → Finding → Translation Decision

Research Question → Research Task → Analysis → Finding

Formula → Metric → Calculation → Validation

## ৪. অনুবাদ নীতি

একটি আয়াতের একাধিক Translation Candidate থাকতে পারে।

Candidate এবং Final Translation Decision আলাদা record হবে।

কেন একটি অনুবাদ নির্বাচিত হয়েছে তার reasoning সংরক্ষণ করতে হবে।

বাংলা উচ্চারণ থাকবে; ভবিষ্যতে English ও অন্যান্য ভাষার pronunciation যোগ করা যাবে।

## ৫. প্রশ্ন সংগ্রহশালা

প্রতিটি প্রশ্নের সঙ্গে সংরক্ষণ করা হবে:

* Original Question
* Normalized Question
* Category
* Status
* Related Ayahs
* Evidence
* Findings
* Research History

যে প্রশ্নের উত্তর এখনো পাওয়া যায়নি সেটিও মুছে ফেলা হবে না; OPEN QUESTION হিসেবে থাকবে।

## ৬. গণিত ও পরিসংখ্যান

প্রথমে:

সংজ্ঞা → Formula → Dataset → Calculation → Independent Check → Result → Interpretation

শুধু পছন্দের ফল পাওয়ার জন্য কোনো Formula তৈরি করা যাবে না।

## ৭. Contributor ব্যবস্থা

নতুন গবেষক Database না জানলেও প্রশ্ন দিয়ে কাজ শুরু করতে পারবেন।

AI গবেষণায় সহায়তা করবে, কিন্তু মানব যাচাই ছাড়া AI-এর তথ্য Verified হবে না।

Correction Proposal পুরোনো record নষ্ট করবে না।

## ৮. Version ও Audit

Database schema, data, formula, metric, methodology এবং সিদ্ধান্ত version-controlled হবে।

পরিবর্তনের ইতিহাস audit log-এ থাকবে।

## ৯. প্রযুক্তি

মূল Structured Database: SQLite

Portable Data Exchange: JSON

Documentation: Markdown

Website: Database-এর উপর ব্যবহারকারীর Interface

ভবিষ্যতে API, Mobile App বা অন্য Website যুক্ত করা যাবে।

## ১০. বর্তমান Pilot

Schema Version: 0.1

Pilot Scope: সূরা আল-ফাতিহা

First Test Ayah: Q001001

যাচাইকৃত Arabic Source নির্বাচন না হওয়া পর্যন্ত Q001001-এর Arabic Text অনুমান করে বসানো হবে না।

## ১১. ভাষা

প্রাথমিক Interface বাংলা হবে।

Data Model ভবিষ্যতে English এবং অন্যান্য ভাষার Interface, Translation ও Pronunciation সমর্থন করবে।

## ১২. Master Project-এর ব্যবহার

নতুন ChatGPT conversation-এ এই MASTER_PROJECT.md file এবং PROJECT_STATE.md file দিলে প্রকল্পের মূল কাঠামো ও বর্তমান অবস্থান দ্রুত পুনরুদ্ধার করা যাবে।

প্রকল্পে বড় পরিবর্তন হলে এই নথিও আপডেট করতে হবে।

---

## বর্তমান সংরক্ষণ নীতি

এই প্রকল্পের গুরুত্বপূর্ণ পরিবর্তনের পরে:

1. GitHub Repository-তে পরিবর্তন সংরক্ষণ করতে হবে।
2. PROJECT_STATE.md আপডেট করতে হবে।
3. বড় কাঠামোগত পরিবর্তন হলে MASTER_PROJECT.md আপডেট করতে হবে।
4. গুরুত্বপূর্ণ Database পরিবর্তনের আগে Backup রাখতে হবে।
5. গবেষণার মূল তথ্য Website-এর বাইরে Structured Data হিসেবে সংরক্ষণ করতে হবে।

Master Project Version: 0.1

শেষ আপডেট: 2026-08-29
