# Research Record Approval Handoff V1

তারিখ: 2026-09-08

## উদ্দেশ্য
AI chat-এর গবেষণা উত্তরে তৈরি `research_record_proposal` যেন manual copy-paste ছাড়াই Approval Interface-এ পাঠানো যায়।

## Flow

`AI chat → research_record_proposal → “Approval-এ পাঠান” → research-approval.html → মানব যাচাই → GitHub Actions Approval Workflow`

## নিরাপত্তা

- AI chat শুধু proposal বহন করে; নিজে `VERIFIED` করে না।
- Approval Interface proposal যাচাই করে, কিন্তু GitHub-এ লেখে না।
- মানব অনুমোদন ছাড়া কোনো versioned research record save হয় না।
- Master Dataset পরিবর্তন করা হয় না।
- Approval Workflow নতুন immutable version তৈরি করে এবং পুরোনো record-এর `supersedes` সম্পর্ক রাখে।
- `chat.html` পরিবর্তন করা হয়নি; নির্দিষ্ট current design chat page-এ handoff যোগ করা হয়েছে।

## বর্তমান handoff পদ্ধতি

Proposal JSON URL fragment-এ বহন করা হয়। Fragment browser-এর HTTP request-এ server-এর কাছে পাঠানো হয় না। Approval page সেটি decode করে local textarea-তে দেখায়।

## সীমাবদ্ধতা

URL fragment-এর দৈর্ঘ্য browser সীমার মধ্যে থাকা প্রয়োজন। ভবিষ্যতে proposal বড় হলে একই নিরাপত্তা নীতি রেখে POST/session-based handoff করা যেতে পারে।
