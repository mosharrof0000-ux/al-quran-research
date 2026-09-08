# Research Memory v1

## উদ্দেশ্য
পূর্ববর্তী গবেষণা যেন পরবর্তী গবেষণায় পুনরায় ব্যবহার করা যায়, কিন্তু পুরোনো ফল ও নতুন ফল মিশে না যায়।

## Runtime আচরণ
AI গবেষণা-সম্পর্কিত প্রশ্নে versioned research records read-only ভাবে retrieve করতে পারে। Record-এর `record_id`, `version`, `status`, scope এবং source reference উত্তর তৈরিতে ধরে রাখতে হবে।

## Save আচরণ
AI প্রথমে একটি saveable record proposal তৈরি করবে। Proposal human approval ছাড়া persistent write করবে না। অনুমোদনের পরে নতুন immutable versioned record তৈরি হবে। পুরোনো record untouched থাকবে।

## Status
- DRAFT — অসম্পূর্ণ
- PENDING_REVIEW — মানব পর্যালোচনা প্রয়োজন
- VERIFIED — মানব/অনুমোদিত যাচাইয়ের পরে
- DISPUTED — মতভেদ/বিতর্ক নথিভুক্ত
- SUPERSEDED — নতুন version দ্বারা প্রতিস্থাপিত, কিন্তু ইতিহাসে অক্ষত

## মূল গবেষণা-শৃঙ্খল
`Question → Scope → Source → Evidence → Analysis → Uncertainty → Finding → Review → Versioned Record`
