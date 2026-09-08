# Research Record Approval v2

## উদ্দেশ্য
`PENDING_REVIEW` গবেষণা-প্রস্তাবকে মানুষের স্পষ্ট অনুমোদনের পরে নতুন versioned research record হিসেবে সংরক্ষণ করা।

## কঠোর নিয়ম
- AI proposal তৈরি করতে পারে; AI নিজে approval দিতে পারে না।
- `APPROVE` নিশ্চিতকরণ ছাড়া কোনো record save হবে না।
- পুরোনো record কখনো overwrite/delete হবে না।
- নতুন record-এ নতুন version এবং `supersedes` থাকবে।
- অনুমোদিত ফলের status মানব অনুমোদনের পরে `VERIFIED` হতে পারে; AI একা এই status দিতে পারবে না।
- master dataset পরিবর্তন করা যাবে না।
- source/evidence/provenance proposal থেকে বহন করতে হবে।
- invalid proposal বা duplicate save হলে পুরো operation বাতিল হবে; partial save গ্রহণযোগ্য নয়।

## Version rule
একই scope-এর আগের সর্বোচ্চ version `N` হলে নতুন record হবে `N+1`। প্রথম record হলে version `1`। পুরোনো record অক্ষত থাকবে।

## বর্তমান বাস্তবায়ন
- AI response-এ `PENDING_REVIEW` proposal তৈরি হচ্ছে।
- approval/write অংশ আলাদা GitHub Actions workflow-এ রাখা হবে।
- workflow কেবল manual approval এবং repository write permission-এর মাধ্যমে record commit করবে।
- Worker সরাসরি GitHub-এ write করবে না।

## Test acceptance
1. proposal status = `PENDING_REVIEW`
2. source refs উপস্থিত
3. previous version অক্ষত
4. approved save-এ version বৃদ্ধি
5. `supersedes` previous record নির্দেশ করে
6. master dataset অপরিবর্তিত
7. approval ছাড়া save ব্যর্থ
8. AI-generated output নিজে `VERIFIED` নয়
