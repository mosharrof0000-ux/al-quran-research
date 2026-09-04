# গবেষণাগার — দীর্ঘমেয়াদি Vision v1.0

## 1. মূল ধারণা

আল-কুরআন গবেষণা এই প্রকল্পের প্রথম গবেষণা-ক্ষেত্র; এটি শেষ লক্ষ্য নয়। শেষ লক্ষ্য হলো একটি বিস্তৃত Research Laboratory Engine, যার কেন্দ্রীয় নিয়ন্ত্রণ ইন্টারফেস হবে Chat Box।

কেন্দ্রীয় নীতি:
- Chat শুধু প্রশ্নের উত্তর দেবে না; প্রয়োজন বুঝে Tool নির্বাচন, ব্যবহার এবং ভবিষ্যতে নতুন Tool তৈরির workflow পরিচালনা করবে।
- একই Core Engine-এর উপর বিভিন্ন মানুষ নিজের Workspace, সংগ্রহশালা, গবেষণা ও Interface নিজের মতো করে সাজাতে পারবে।
- একজনের ব্যক্তিগত data অন্য ব্যবহারকারীর কাছে স্বয়ংক্রিয়ভাবে প্রকাশ পাবে না।
- কোনো ব্যবহারকারী অন্যের প্রকাশিত Tool/Template/Workspace পছন্দ করলে নিজের Workspace-এ copy/clone করে নিজের মতো পরিবর্তন করতে পারবে।
- মূল নির্মাতার Tool ও অন্য ব্যবহারকারীর কপি/কাস্টমাইজেশন আলাদা থাকবে।

## 2. Tool ধারণা

Tool তিনটি স্তরে ভাবা হবে:
1. Capability — Tool কী কাজ করতে পারে।
2. Interface/Workspace — ব্যবহারকারী Tool-টিকে কীভাবে দেখতে ও ব্যবহার করতে চায়।
3. Publication/Promotion — Tool বা Template কীভাবে অন্যদের জন্য প্রদর্শিত/প্রচারিত হবে।

উদাহরণ: YouTube Tool-এর capability একই থাকতে পারে, কিন্তু বিভিন্ন ব্যবহারকারী সেটিকে সম্পূর্ণ ভিন্ন UI/Workspace-এ ব্যবহার করতে পারে।

## 3. নতুন ব্যবহারকারীর অভিজ্ঞতা

নতুন ব্যবহারকারী বললে: “আমি YouTube দেখতে চাই” — সিস্টেম:
- প্রয়োজন বুঝবে;
- উপলব্ধ YouTube Tool শনাক্ত করবে;
- প্রয়োজনে কয়েকটি Demo/Template দেখাবে;
- অন্য ব্যবহারকারীদের প্রকাশিত কাস্টমাইজেশন দেখার সুযোগ দেবে;
- পছন্দ হলে Clone/Use করবে;
- তারপর ব্যবহারকারী নিজের Workspace নিজের মতো পরিবর্তন করতে পারবে।

একই pattern MP3, Quran Research, File, Music, Soil Research, Camera, Dictionary এবং ভবিষ্যতের নতুন Tool-এর জন্য প্রযোজ্য হবে।

## 4. Tool তৈরির ভবিষ্যৎ workflow

ব্যবহারকারী প্রয়োজন বলবে → প্রয়োজনীয় capability শনাক্ত হবে → Tool/Module পরিকল্পনা → তৈরি → পরীক্ষা → অনুমোদন/নিরাপত্তা যাচাই → Tool Registry-তে নিবন্ধন → Chat থেকে ব্যবহারযোগ্য → Version/Change History সংরক্ষণ।

Auto এবং Manual — উভয় workflow থাকবে। সংবেদনশীল কাজের ক্ষেত্রে permission/confirmation বাধ্যতামূলক হতে পারে।

## 5. Workspace ও ব্যক্তিগত সংগ্রহশালা

- Core Engine সবার জন্য একই হতে পারে।
- Workspace আলাদা হবে।
- ব্যক্তিগত গবেষণা/সংগ্রহ আলাদা থাকবে।
- Public Tool/Template আলাদা করে প্রকাশ করা যাবে।
- অন্যের Tool নেওয়া মানে তার ব্যক্তিগত গবেষণা নেওয়া নয়।
- Clone করার পর নতুন Version/পরিবর্তন ব্যবহারকারীর নিজের Workspace-এ থাকবে।

## 6. গবেষণা-নিরপেক্ষতা

কোরআন গবেষণা প্রথম Domain হলেও ভবিষ্যৎ Lab বহু Domain ধারণ করবে। Research Constitution-এর versioning, evidence, uncertainty এবং correction rules সব Domain-এ যতটা প্রযোজ্য ততটা ব্যবহার করা হবে।

কোরআন গবেষণার ক্ষেত্রে:
- aqidah-neutral;
- raw data সংরক্ষিত;
- AI output স্বয়ংক্রিয়ভাবে verified নয়;
- correction পুরোনো তথ্য মুছে নয়, নতুন version/proposal হিসেবে;
- মতভেদ থাকলে analysis variant হিসেবে সহাবস্থান করবে।

## 7. Chat Box = Universal Controller

ভবিষ্যতে Chat Box হবে Lab-এর প্রধান command interface। উদাহরণ:
- “YouTube চালাও” → YouTube Tool
- “পরের গান” → MP3 Tool
- “সূরা ফাতিহা গবেষণা খোলো” → Quran Research Tool
- “এই Tool-টা আমার মতো করে বানাও” → Workspace customization
- “এমন Tool নেই, প্রয়োজনীয় Tool তৈরির ব্যবস্থা করো” → Tool Builder workflow

Chat-এর ভেতরে Tool Engine/Registry থাকবে, কিন্তু বর্তমান website design নষ্ট করে একবারে বড় UI পরিবর্তন করা হবে না। ধাপে ধাপে surgical পরিবর্তন হবে।

## 8. রং ও গাণিতিক ভাষা

ভবিষ্যৎ Lab-এ রং শুধু decoration নয়; গুণ, মাত্রা, সম্পর্ক ও পরিবর্তনের semantic language হিসেবে গবেষণা করা হবে। চারটি base color (লাল, নীল, সবুজ, হলুদ) seed হিসেবে ব্যবহারযোগ্য; ratio/quality অনুযায়ী light/deep এবং blended colors তৈরি হতে পারে। Golden-ratio-ধাঁচের ও অন্যান্য mathematical pattern ভবিষ্যৎ semantic visualization-এর গবেষণার অংশ হবে।

এটি এখনো গবেষণা-ধারণা; কোনো অর্থ/রঙের mapping যাচাই ছাড়া fact হিসেবে প্রকাশ করা যাবে না।

## 9. বর্তমান কাজের সঙ্গে সম্পর্ক

বর্তমান আল-কুরআন গবেষণা website, Research API, database schema, data version এবং Chat System এই বড় Lab-এর প্রথম ভিত্তি। এগুলো নষ্ট বা replace না করে extension হিসেবে উন্নত করতে হবে।

## 10. যখন বলা হবে “আমার ওয়েবসাইট ঘুরে দেখে আসুন”

সিস্টেম/সহকারীকে সংক্ষেপে জানাতে হবে:
- বর্তমানে কী কী আছে;
- কোনগুলো সম্পন্ন;
- কোনগুলো অসম্পূর্ণ;
- এই Research Laboratory Vision-এর কোন কোন অংশ ইতিমধ্যে বাস্তবায়িত;
- পরবর্তী ধাপে কী বাস্তবায়ন করতে হবে;
- কোন কাজগুলো এখনো শুধু পরিকল্পনা।

তারপর প্রয়োজন হলে বিস্তারিত ব্যাখ্যা আলাদা করে দিতে হবে।

এই ফাইলটি Vision/Memory Record হিসেবে রাখা হলো; এটি UI design-এর বিকল্প নয় এবং বর্তমান website design পরিবর্তনের অনুমতি নয়।
