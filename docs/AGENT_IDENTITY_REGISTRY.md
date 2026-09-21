# Project Agent Identity Registry — v1.0

## উদ্দেশ্য
প্রতিটি নতুন AI work/session-কে মানুষের মতো বাংলা Agent Name, স্থায়ী Agent ID, Task ID এবং branch identity দেওয়া হবে। নামটি কাজের ধরন বোঝাবে; একই সক্রিয় কাজের পরিচয় পুনর্ব্যবহার করা যাবে না।

## বর্তমান কাজ
- Agent Name: শামীম
- Agent ID: SHAMIM-001
- Task ID: AI-STRENGTHENING-001
- Branch: agent/shamim-ai-strengthening-002
- Role: Project Agent Engine strengthening

## Naming rule
কাজের ধরন অনুযায়ী বাংলা মানব-নাম নির্বাচন হবে। উদাহরণ: Chat/UI = শামীম, Icon = শাহীন, Reader/Data = সুমন, Verification = নাঈম। একই নামের নতুন কাজ হলে numeric identity বাড়বে।

## Identity chain
Task ID → Agent Name → Agent ID → Session ID → Branch → Commit → Review → Validation → Promotion → Live verification.

## উত্তরাধিকার
কাজ অসম্পূর্ণ হলে successor নতুন Agent ID পাবে এবং Parent Task ID উল্লেখ করবে। পূর্বের Agent-এর কাজ মুছে ফেলা যাবে না।
