# মোশাররফ Learning Evaluation Contract v0.1

## উদ্দেশ্য
কোন শেখা candidate সত্যিই উন্নতি করেছে কি না তা মাপার একটি নির্দিষ্ট contract।

## Required evaluation
প্রতিটি candidate-এর ক্ষেত্রে সম্ভব হলে:
1. baseline result
2. candidate result
3. test cases
4. edge cases
5. regression comparison
6. reproducibility check
7. security/policy check
8. evidence/source references
9. applicability scope
10. final validation status

## Evaluation outcomes
- REJECTED — পরীক্ষায় ব্যর্থ
- NEEDS_WORK — আংশিক সফল
- VALIDATED — নির্ধারিত পরীক্ষায় সফল
- ACTIVE — policy/review gate পেরিয়ে reusable
- DEPRECATED — নতুন validated version দ্বারা প্রতিস্থাপিত

## Reward signal
একটি reward/evaluation signal শুধুমাত্র validation evidence-এর summary। এটি নিজে authority নয়।

## Benchmark principle
একই problem class-এর baseline ও নতুন strategy যতটা সম্ভব একই test set-এ তুলনা করা হবে। Test পরিবর্তন করে success দেখানো যাবে না।

## Regression protection
নতুন skill কোনো পুরোনো validated capability নষ্ট করলে তা automatic Active হবে না।

## Reproducibility
সম্ভব হলে একই input, dependency ও environment-এ পুনরায় চালিয়ে ফল মিলিয়ে দেখা হবে।

## Audit
প্রতিটি promotion/rejection-এর সঙ্গে evidence_refs ও audit event রাখা হবে।
