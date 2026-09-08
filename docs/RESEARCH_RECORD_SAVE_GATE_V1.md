# Research Record Save Gate v1

উদ্দেশ্য: AI-এর গবেষণা-ফলকে সরাসরি master dataset-এ না লিখে, অনুমোদিত হলে নতুন immutable versioned research record হিসেবে সংরক্ষণ করা।

## নিরাপত্তা ও অখণ্ডতা
- AI নিজে থেকে GitHub research data লিখবে না।
- পুরোনো record overwrite/delete করা যাবে না।
- প্রতিটি নতুন সংরক্ষণ একটি নতুন `record_id`/`version` হবে এবং প্রয়োজনে `supersedes`-এ আগের record উল্লেখ করবে।
- `VERIFIED` status AI একা দিতে পারবে না; human review প্রয়োজন।
- save request-এ source refs, dataset version, scope, status ও provenance থাকতে হবে।
- approval token/secret ছাড়া write operation হবে না।
- write gate master dataset (`data/fatiha-master-v1.json`) পরিবর্তন করবে না; research record আলাদা থাকবে।
- ব্যর্থ/অসম্পূর্ণ save-এ কোনো partial write গ্রহণযোগ্য নয়।

## ধাপ
`AI গবেষণা → সংরক্ষণযোগ্য record প্রস্তাব → মানব অনুমোদন → নতুন versioned record → backup/test → পরবর্তী গবেষণায় read-only retrieval`

## বর্তমান অবস্থা
V1-এ read-only memory ও record schema চালু। Save gate-এর write অংশ আলাদা approval credential নির্ভর; credential না থাকলে system নিরাপদভাবে read-only থাকবে।
