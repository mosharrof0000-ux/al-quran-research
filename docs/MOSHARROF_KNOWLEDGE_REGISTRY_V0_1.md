# মোশাররফ Knowledge Registry v0.1

## উদ্দেশ্য
মোশাররফ যে তথ্য, ধারণা, পদ্ধতি ও সিদ্ধান্ত শেখে তার provenance, validation এবং version history সংরক্ষণ করা।

## Knowledge lifecycle
CANDIDATE → EVIDENCE_REVIEW → VALIDATED → ACTIVE → REVIEW/REVISED/RETIRED

## Knowledge record
- knowledge_id
- topic
- statement
- knowledge_type
- source_refs
- source_peer
- source_message
- context
- evidence
- assumptions
- limitations
- validation_method
- validation_status
- confidence
- first_learned_at
- last_validated_at
- version
- supersedes/superseded_by
- related_skills
- related_failures
- related_successes

## Rules
1. Source ছাড়া গুরুত্বপূর্ণ knowledge Active হবে না।
2. External AI output = candidate input; truth নয়।
3. Contradictory evidence হলে conflict record করতে হবে; silent overwrite নয়।
4. নতুন version তৈরি হলে পুরোনো version সংরক্ষিত থাকবে।
5. Raw secret, token, password বা private credential knowledge হিসেবে সংরক্ষণ করা যাবে না।
6. Security, permission, policy বা live-production পরিবর্তনের সিদ্ধান্ত Knowledge Registry একা নিতে পারবে না।

## Retrieval
Problem classification-এর পর relevant knowledge retrieve করা হবে। Source quality, validation status, context এবং applicability দেখে candidate নির্বাচন হবে।

## Relationship
Knowledge ধারণা/তথ্য রাখে; Skill সেই knowledge ব্যবহার করে একটি কাজ সম্পন্ন করার validated reusable পদ্ধতি।

## Core rule
কী জানা আছে তার ইতিহাস সংরক্ষণ এবং কেন জানা/বিশ্বাস করা হচ্ছে তার প্রমাণ সংরক্ষণ—দুটিই বাধ্যতামূলক।
