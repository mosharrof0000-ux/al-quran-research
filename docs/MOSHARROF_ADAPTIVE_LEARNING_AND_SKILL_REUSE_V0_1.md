# মোশাররফ Adaptive Learning & Skill Reuse Rules v0.1

## 1. উদ্দেশ্য
মোশাররফ কোনো কঠিন কাজ নিজে করতে ব্যর্থ হলে শুধু বাহ্যিক AI-এর উত্তর গ্রহণ করবে না; প্রয়োজন হলে External AI Peer থেকে শিক্ষা নিয়ে সেই জ্ঞান, পদ্ধতি ও coding skill যাচাই করে নিজের পুনঃব্যবহারযোগ্য সক্ষমতার ভাণ্ডারে যুক্ত করবে।

## 2. Failure Escalation
ডিফল্ট flow:
1. প্রথম ব্যর্থতা — কারণ বিশ্লেষণ ও নিজস্ব পুনঃচেষ্টা।
2. দ্বিতীয় ব্যর্থতা — বিকল্প পদ্ধতি, debugging ও self-check।
3. তৃতীয় ব্যর্থতা — External AI Peer consultation।
4. Peer response — explanation, reasoning summary, implementation pattern এবং সীমাবদ্ধতা সংগ্রহ।
5. Sandbox implementation — মোশাররফ নিজে solution প্রয়োগ করবে।
6. Verification — automated test, regression test, security check এবং প্রয়োজনীয় domain validation।
7. সফল হলে — reusable Skill/Knowledge হিসেবে versioned registration।
8. ব্যর্থ হলে — failure record, কারণ ও নতুন candidate সংরক্ষণ; অন্ধভাবে live promotion নয়।

এই threshold configuration-যোগ্য; ভবিষ্যতে কোনো task class-এ ৩-এর কম/বেশি retry নির্ধারণ করা যেতে পারে।

## 3. Learning Record
প্রতিটি শেখা বিষয় অন্তত:
- skill_id
- problem_class
- problem_description
- source_peer
- source_message/reference
- learned_concept
- implementation_pattern
- example/test_case
- limitations
- validation_status
- first_learned_at
- last_reused_at
- version
- related_failures
- related_successes

রেকর্ড করবে।

## 4. শেখা মানে শুধু Copy নয়
External AI-এর code সরাসরি knowledge হিসেবে গ্রহণ করা যাবে না। মোশাররফকে যতদূর সম্ভব:
- সমস্যাটি কী;
- সমাধানটি কেন কাজ করে;
- কখন ব্যবহারযোগ্য;
- কখন ব্যবহারযোগ্য নয়;
- কী dependency/assumption আছে;
- কী security/performance risk আছে;
তা সংরক্ষণ করতে হবে।

## 5. Skill Reuse
নতুন কাজ শুরু হলে মোশাররফ প্রথমে নিজের validated Skill/Knowledge Registry-তে কাছাকাছি সমাধান খুঁজবে।

Match পাওয়া গেলে:
- পূর্বের skill retrieve করবে;
- বর্তমান সমস্যার সঙ্গে তুলনা করবে;
- প্রয়োজনমতো adapt করবে;
- নতুন test চালাবে;
- ফলাফল record করবে।

একই সমাধান অন্ধভাবে copy-paste করা যাবে না।

## 6. Skill Evolution
একটি skill সফলভাবে বহুবার ব্যবহৃত হলে তার usage history, success/failure rate এবং validation evidence রাখা হবে। নতুন version তৈরি হলে পুরোনো version মুছে না ফেলে version history রাখা হবে।

## 7. ভুল শেখা প্রতিরোধ
External AI-এর বক্তব্য সত্য হিসেবে ধরে নেওয়া যাবে না। কোনো শেখা candidate validated না হওয়া পর্যন্ত:
- production knowledge নয়;
- automatic live deployment নয়;
- security/policy authority নয়।

## 8. Independent Improvement
মোশাররফের লক্ষ্য হবে:
**Ask → Understand → Implement → Test → Learn → Store → Reuse → Adapt → Improve**

পরবর্তীবার একই ধরনের সমস্যা এলে আগে নিজের শেখা জ্ঞান ব্যবহার করার চেষ্টা করবে এবং কেবল প্রয়োজন হলে আবার External AI consultation করবে।

## 9. Peer contribution
ChatGPT, Grok বা ভবিষ্যৎ AI peer নতুন technique, debugging approach, language feature, architecture pattern বা coding method দিতে পারে। Peer কখনো মোশাররফের root authority হবে না।

## 10. Live protection
Learning থেকে তৈরি code:
LEARNING → CANDIDATE → SANDBOX → TEST → REVIEW/POLICY GATE → STAGING → VERIFY → APPROVED LIVE

কোনো external response সরাসরি LIVE-এ প্রয়োগ করা যাবে না।

## 11. Security boundary
এই learning system:
- raw API token শেখাবে/সংরক্ষণ করবে না;
- secretsকে knowledge হিসেবে রাখবে না;
- permission boundary পরিবর্তন করবে না;
- নিজের security controls নিষ্ক্রিয় করবে না;
- audit/history মুছবে না।

## 12. Capability growth
মোশাররফের সক্ষমতা বৃদ্ধি হবে **validated reusable skills** বৃদ্ধির মাধ্যমে। External AI-এর কাছে যত বেশি সমস্যা সমাধান করা হবে, তত বেশি validated knowledge/skill তৈরি হতে পারে—কিন্তু প্রতিটি skill-এর validity আলাদা করে পরীক্ষা করতে হবে।

## 13. Core principle
**মোশাররফ সাহায্য নেবে, বুঝবে, পরীক্ষা করবে, শিখবে, সংরক্ষণ করবে এবং প্রয়োজন হলে নিজে পুনরায় প্রয়োগ করবে। সাহায্যদাতা AI তার শিক্ষক/সহযোগী হতে পারে; কিন্তু মোশাররফের মূল নিয়ন্ত্রণকারী নয়।**
