# Research Memory v1

## Purpose
পূর্ববর্তী গবেষণা যেন পরবর্তী গবেষণায় পুনরায় ব্যবহার করা যায়, কিন্তু পুরোনো ফল ও নতুন ফল মিশে না যায়।

## Runtime আচরণ
- AI গবেষণা-সম্পর্কিত প্রশ্নে versioned research records read-only ভাবে retrieve করতে পারে।
- data/research-records/index.json হলো versioned record manifest; এতে প্রতিটি record-এর file, record_id, version, status, ayah_id ও updated_at থাকে।
- Worker manifest থেকে scope অনুযায়ী সর্বোচ্চ ৮টি record আবিষ্কার করে; file path allow-list এবং record identity/version/scope মিলিয়ে নেয়।
- সাধারণ কথোপকথনে Research Memory fetch করা হয় না।
- Record-এর record_id, version, status, scope এবং source reference উত্তর তৈরিতে ধরে রাখতে হবে।
- PENDING_REVIEW, DISPUTED ও SUPERSEDED status অপরিবর্তিতভাবে রাখতে হবে; AI নিজে status বদলাতে পারবে না।

## Save আচরণ
AI প্রথমে একটি saveable record proposal তৈরি করবে। Proposal human approval ছাড়া persistent write করবে না। অনুমোদনের পরে নতুন immutable versioned record তৈরি হবে। পুরোনো record untouched থাকবে। Approval workflow নতুন record এবং index entry একই commit-এ সংরক্ষণ করে।

## Status
- DRAFT — অসম্পূর্ণ
- PENDING_REVIEW — মানব পর্যালোচনা প্রয়োজন
- VERIFIED — মানব/অনুমোদিত যাচাইয়ের পরে
- DISPUTED — মতভেদ/বিতর্ক নথিভুক্ত
- SUPERSEDED — নতুন version দ্বারা প্রতিস্থাপিত, কিন্তু ইতিহাসে অক্ষত

## মূল গবেষণা-শৃঙ্খল
Question → Scope → Source → Evidence → Analysis → Uncertainty → Finding → Review → Versioned Record → Index → Read-only Retrieval
