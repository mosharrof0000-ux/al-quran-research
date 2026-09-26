# মোশাররফ Capability–Token Bridge v0.1

## উদ্দেশ্য
মোশাররফের Intelligence Runtime যেন অনুমোদিত Token Permission-কে বাস্তব কাজের capability হিসেবে ব্যবহার করতে পারে—কিন্তু Token নিজে যেন Intelligence-কে সীমাহীন ক্ষমতা না দেয়।

## মূল নীতি
**Token = credential; Capability = অনুমোদিত কাজের ক্ষমতা; Intelligence = সেই ক্ষমতা ব্যবহার করার সিদ্ধান্ত/পরিকল্পনা।**

তিনটি আলাদা থাকবে এবং Policy Gate দ্বারা যুক্ত হবে।

## Runtime flow
INTENT
→ REQUIRED CAPABILITY
→ PERMISSION RESOLUTION
→ TOKEN SELECTION
→ SCOPE CHECK
→ ENVIRONMENT CHECK
→ POLICY CHECK
→ TOOL EXECUTION
→ RESULT
→ VERIFICATION
→ LEARNING EVENT

## Capability request
প্রতিটি কাজের আগে runtime নির্ধারণ করবে:
- entity
- capability
- operation
- resource/scope
- environment
- token/auth reference
- rate limit
- expiry/review
- policy gate
- audit reference

## Least privilege
একটি কাজের জন্য প্রয়োজনীয় সর্বনিম্ন permission-ই ব্যবহার হবে। একটি broad/super token-কে intelligence-এর default credential করা যাবে না।

## Permission-to-intelligence mapping
Permission সরাসরি “বুদ্ধি” নয়। Intelligence runtime permission-কে action capability হিসেবে ব্যবহার করতে পারবে:
- READ → inspect/retrieve
- CREATE/PROPOSE → candidate তৈরি
- EDIT/WRITE → অনুমোদিত resource পরিবর্তন
- EXECUTE → অনুমোদিত operation চালানো
- DEPLOY → protected deployment pipeline-এর মাধ্যমে deploy request
- SECURITY/ADMIN → আলাদা policy gate
- DESTRUCTIVE → default deny / explicit human approval

## Token orchestration
Token Registry raw token সংরক্ষণ/লগ করবে না। Runtime কেবল একটি auth reference পাবে এবং Token Orchestrator প্রয়োজনীয় credential নির্বাচন করবে।

## Learning integration
কোন capability দিয়ে কোন কাজ সফল/ব্যর্থ হয়েছে তা learning event-এ record করা যাবে; raw secret কখনো learning data হবে না।

## Security boundaries
Intelligence runtime:
- নিজের permission বাড়াতে পারবে না;
- token scope পরিবর্তন করতে পারবে না;
- security policy নিষ্ক্রিয় করতে পারবে না;
- raw token দেখতে/সংরক্ষণ করতে পারবে না;
- direct live bypass করতে পারবে না;
- audit history মুছতে পারবে না।

## Failure handling
Permission failure হলে:
1. scope/operation mismatch শনাক্ত;
2. available approved capability পুনরায় resolve;
3. প্রয়োজন হলে নতুন capability request তৈরি;
4. অনুমোদন ছাড়া privilege escalation নয়।

## Promotion
Tool action-এর ফল:
REQUEST → AUTHORIZE → SANDBOX/SAFE EXECUTION → VERIFY → AUDIT → RESULT

Live-sensitive operation-এর ক্ষেত্রে protected deployment gate বাধ্যতামূলক।

## Principle
মোশাররফের intelligence যত শক্তিশালী হবে, সে তত দক্ষভাবে **অনুমোদিত ক্ষমতা** ব্যবহার করবে; তার intelligence নিজে permission-এর উৎস হবে না।
