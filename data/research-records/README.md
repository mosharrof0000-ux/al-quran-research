# Research Memory / Versioned Research Records

এই ফোল্ডারটি পূর্ববর্তী গবেষণার সংরক্ষণযোগ্য রেকর্ডের জন্য।

## মূল নিয়ম
- কোনো পুরোনো গবেষণা-রেকর্ড overwrite করা যাবে না।
- সংশোধন হলে নতুন version/record তৈরি হবে।
- AI-generated output নিজে থেকে VERIFIED নয়।
- `source_file`, `dataset_version`, `record_id`, `version` এবং প্রাসঙ্গিক `ayah_id`/`token_id` ছাড়া গবেষণা-দাবিকে project evidence হিসেবে উপস্থাপন করা যাবে না।
- `status` দিয়ে `DRAFT`, `PENDING_REVIEW`, `VERIFIED`, `DISPUTED`, `SUPERSEDED` আলাদা করতে হবে।
- বাহ্যিক evidence এবং প্রকল্পের নিজস্ব verified data আলাদা থাকবে।
- অনুপস্থিত তথ্য পূরণ করতে অনুমান করা যাবে না; `প্রকল্পের ডেটায় নেই` বলা হবে।

## রেকর্ড কাঠামো
প্রস্তাবিত ক্ষেত্র: `record_id`, `version`, `status`, `question`, `objective`, `scope`, `source_refs`, `evidence_refs`, `findings`, `uncertainties`, `created_at`, `supersedes`, `notes`।

বর্তমান ধাপে এটি read-only research memory হিসেবে ব্যবহৃত হবে। AI নিজে থেকে GitHub-এ research record লিখবে না; সংরক্ষণে অনুমোদন/নিরাপদ write workflow প্রয়োজন।
