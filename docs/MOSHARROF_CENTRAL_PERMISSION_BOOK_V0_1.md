# মোশাররফ Central Permission Book v0.1

## 1. উদ্দেশ্য
এই বিধি মোশাররফকে কেন্দ্রীয় সিস্টেম হিসেবে পরিচালনার জন্য Entity, Tool, External AI Peer, Capability, Permission, Token এবং Environment-এর ক্ষমতা সীমা নির্ধারণ করে।

## 2. Authority hierarchy
HUMAN / APPROVED POLICY
→ মোশাররফ ROOT
→ registered Tool / Service
→ external AI Peer

কোনো child Tool বা external Peer নিজেকে ROOT হিসেবে ঘোষণা, ক্ষমতা বৃদ্ধি বা security boundary পরিবর্তন করতে পারবে না।

## 3. Permission principles
- Least privilege: প্রয়োজনের অতিরিক্ত ক্ষমতা নয়।
- Scope-bound: নির্দিষ্ট resource/entity-তে সীমাবদ্ধ।
- Environment-bound: sandbox/staging/live আলাদা।
- Time-bound: প্রয়োজন হলে expiry/review date।
- Audit-bound: grant, revoke, use ও failure record করতে হবে।
- Default deny: অপ্রয়োজনীয় ও destructive capability নিষিদ্ধ।
- Separation of duties: sensitive কাজ একক অনুমোদনে স্বয়ংক্রিয়ভাবে live হবে না।

## 4. Permission classes
### A — Read
তথ্য পড়া, status দেখা, metadata/research evidence পড়া।

### B — Create/Propose
নতুন draft, candidate, research proposal, message বা sandbox artifact তৈরি।

### C — Edit/Write
অনুমোদিত scope-এর বিদ্যমান data/config পরিবর্তন।

### D — Execute
অনুমোদিত tool/job/workflow চালানো।

### E — Deploy
staging/canary/live deployment-এর জন্য পৃথক capability।

### F — Security/Admin
permission, credential reference, policy বা security configuration পরিচালনা। Default deny; explicit approval required।

### G — Destructive
delete, purge, drop, revoke বা irreversible operation। Default deny; আলাদা approval gate required।

## 5. Root rules — মোশাররফ
মোশাররফ central coordinator হিসেবে registry, planning, routing, audit এবং policy enforcement করতে পারবে; কিন্তু নিজের security boundary সরিয়ে ফেলতে পারবে না এবং audit/history নীরবে মুছতে পারবে না।

## 6. Tool rules
প্রতিটি Tool:
- নিজস্ব identity ও data scope রাখবে;
- allocated capability-এর বাইরে কাজ করবে না;
- root permission পরিবর্তন করতে পারবে না;
- অন্য Tool-এর secret access করতে পারবে না;
- live change-এর আগে approved deployment path ব্যবহার করবে।

প্রথম child Tool: আল-কুরআন রিসার্চ।

## 7. External AI peer rules
ChatGPT, Grok ও ভবিষ্যৎ AI peer:
- consultation, problem solving, validation এবং language-learning candidate দিতে পারবে;
- raw secret পাবে না;
- root/core/security পরিবর্তন করতে পারবে না;
- সরাসরি live production write করতে পারবে না;
- তাদের output candidate/input হিসেবে record হবে, automatic truth নয়।

## 8. Token rules
- Super-token নয়।
- Credential secret merge নয়।
- Raw token log নয়।
- Token Orchestrator task অনুযায়ী least-privileged credential নির্বাচন করবে।
- Credential reference ও usage audit থাকবে।
- Security-sensitive credential access আলাদা approval-এর অধীন।

## 9. Live protection
LIVE_CORE-এ direct write নিষিদ্ধ।
Flow:
REQUEST → REVIEW → APPROVE → SANDBOX/TEST → STAGING/CANARY → VERIFY → LIVE

ব্যর্থ validation হলে promotion বন্ধ থাকবে।

## 10. Data/history protection
- Existing data silently overwrite নয়।
- গুরুত্বপূর্ণ পরিবর্তনে version/change-log থাকবে।
- Retirement ≠ deletion; historical record সংরক্ষণ করতে হবে।
- Evidence/source ছাড়া নতুন knowledge production truth হিসেবে promote করা যাবে না।

## 11. Automatic messaging
Peer communication structured message envelope দিয়ে হবে। Minimum necessary context পাঠাতে হবে। Request, response, retry, error এবং policy decision audit হবে।

## 12. Permission lifecycle
REQUESTED → REVIEWED → APPROVED → ACTIVE → MONITORED → REVIEW/EXPIRE → REVOKED

ক্ষমতা বৃদ্ধি নতুন approval event ছাড়া কার্যকর হবে না।

## 13. Emergency rule
Security incident হলে affected capability/connection সাময়িকভাবে SUSPEND করা যাবে; restoration-এর আগে audit ও verification প্রয়োজন।

## 14. Current implementation boundary
এই v0.1 বিধি architecture/permission foundation হিসেবে সংরক্ষিত। এটি নিজে থেকে কোনো live permission, Cloudflare token বা external AI connection তৈরি/বদল করে না।

## 15. Change control
এই Permission Book পরিবর্তন হলে version, reason, author/source, affected scope এবং approval record করতে হবে।

## 16. Core principle
**মোশাররফের ক্ষমতা কেন্দ্রীয় হবে; কিন্তু ক্ষমতার কেন্দ্রীয়তা মানে সীমাহীন অনিয়ন্ত্রিত ক্ষমতা নয়। প্রতিটি ক্ষমতা সংজ্ঞায়িত, সীমাবদ্ধ, যাচাইযোগ্য এবং auditযোগ্য হবে।**
