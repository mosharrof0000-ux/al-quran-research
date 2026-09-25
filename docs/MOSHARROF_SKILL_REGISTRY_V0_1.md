# মোশাররফ Skill Registry v0.1

## উদ্দেশ্য
মোশাররফের পরীক্ষিত ও পুনঃব্যবহারযোগ্য দক্ষতা versionedভাবে সংরক্ষণ করা।

## Skill lifecycle
CANDIDATE → SANDBOX → TESTED → VALIDATED → ACTIVE → REVIEW/DEPRECATED

## Skill record
প্রতিটি skill-এ থাকবে:
- skill_id
- name
- problem_class
- description
- learned_concept
- implementation_pattern
- prerequisites
- examples
- test_cases
- validation_status
- evidence_refs
- source_refs
- security_notes
- performance_notes
- first_learned_at
- last_validated_at
- usage_count
- success_count
- failure_count
- version
- supersedes/superseded_by
- related_skills

## Registration rules
1. External AI-এর উত্তর সরাসরি Active Skill নয়।
2. Sandbox ও test ছাড়া skill Active হবে না।
3. পুরোনো version মুছে ফেলা যাবে না।
4. Secret, raw token বা credential skill record-এ রাখা যাবে না।
5. Permission/security boundary পরিবর্তনের skill আলাদা policy review ছাড়া Active নয়।

## Reuse
নতুন সমস্যায় problem_class, required capability, constraints ও evidence অনুযায়ী matching skill খোঁজা হবে। Match পেলেও current context-এ পুনরায় test করতে হবে।

## Metrics
প্রতিটি reuse-এর outcome record হবে; success/failure rate দিয়ে skill-এর reliability বোঝা হবে, কিন্তু metrics একাই approval নয়.

## Core rule
শেখা জ্ঞান → পরীক্ষিত দক্ষতা → versioned reusable capability।
