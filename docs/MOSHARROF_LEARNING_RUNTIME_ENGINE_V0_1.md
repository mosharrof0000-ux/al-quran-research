# মোশাররফ Learning Runtime Engine v0.1

## উদ্দেশ্য
Learning Data Schema, Skill Registry এবং Knowledge Registry-কে একটি বাস্তব runtime workflow-এ যুক্ত করা।

## Runtime loop
PROBLEM → CLASSIFY → RETRIEVE → STRATEGIES → EXECUTE → VERIFY → SCORE → EXPLAIN → STORE → REUSE → ADAPT → RE-EVALUATE

## Failure escalation
1. প্রথম failure: cause analysis + retry।
2. দ্বিতীয় failure: alternate strategy + regression check।
3. তৃতীয় failure: peer consultation candidate।
4. repeated failure: decomposition + targeted experiment + benchmark।
5. validated success: Skill/Knowledge candidate registration।

## Multi-strategy
প্রয়োজনে runtime একাধিক candidate strategy তৈরি করবে। প্রতিটি candidate-এর:
- assumptions
- test cases
- baseline
- result
- evaluation
- security status
আলাদাভাবে record হবে।

## Verification
সম্ভব হলে:
- automated tests
- edge cases
- regression tests
- reproducibility
- security/policy checks
ব্যবহার করা হবে।

## Backtracking
কোনো strategy ব্যর্থ হলে তার event history রেখে last valid state থেকে নতুন strategy চেষ্টা করা হবে। ব্যর্থ strategy মুছে ফেলা হবে না।

## Evaluation
Correctness, test result, regression, security, reproducibility, evidence quality এবং applicability-এর সমন্বয়ে evaluation তৈরি হবে। Score approval-এর একমাত্র ভিত্তি নয়।

## Learning
Validated candidate থেকে:
- Knowledge Registry-তে কী শেখা হয়েছে;
- Skill Registry-তে কীভাবে কাজটি করা যায়;
দুটি আলাদা record তৈরি হবে।

## Reuse
পরবর্তী একই/কাছাকাছি problem class-এ registry search হবে। পাওয়া skill বর্তমান context-এ adapt করে পুনরায় test করতে হবে।

## External AI
Peer output candidate হিসেবে প্রবেশ করবে। সরাসরি runtime/live modification করতে পারবে না।

## Safety
Raw secrets, permission escalation, security bypass, destructive operation এবং silent overwrite learning path-এর বাইরে থাকবে।

## Promotion
CANDIDATE → SANDBOX → EVALUATE → VALIDATE → REVIEW/POLICY → STAGING → VERIFY → ACTIVE
