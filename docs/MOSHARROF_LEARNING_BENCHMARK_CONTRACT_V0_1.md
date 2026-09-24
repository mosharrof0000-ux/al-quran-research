# মোশাররফ Learning Benchmark Contract v0.1

## উদ্দেশ্য
শেখার ফলে বাস্তব উন্নতি হয়েছে কি না তা একই ধরনের পরীক্ষায় মাপা।

## Benchmark
প্রতিটি problem class-এর জন্য সম্ভব হলে:
- baseline strategy
- candidate strategy
- fixed test set
- edge cases
- regression set
- reproducibility conditions

রাখতে হবে।

## Improvement signal
উন্নতি নির্ধারণে correctness, coverage, test pass rate, regression outcome, reproducibility এবং efficiency দেখা যেতে পারে।

## Anti-gaming
Test set বদলে, failed cases বাদ দিয়ে, বা evaluation rule দুর্বল করে improvement দেখানো যাবে না।

## Reuse benchmark
একটি skill অন্য problem-এ reuse করলে transfer outcome আলাদাভাবে record হবে।

## Long-term
Benchmark versioned থাকবে; নতুন benchmark পুরোনো benchmark মুছে ফেলবে না।
