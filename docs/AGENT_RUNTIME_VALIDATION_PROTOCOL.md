# Project Agent Runtime Validation Protocol — v1.0

## উদ্দেশ্য
Project Agent-কে শুধু source-level feature হিসেবে নয়, বাস্তব runtime service হিসেবে যাচাই করা।

## Identity
- Agent Name: সজীব
- Agent ID: SAJIB-AGENT-RUNTIME-001
- Task ID: AGENT-RUNTIME-HARDENING-001
- Branch: agent/sajib-runtime-hardening-001

## বাধ্যতামূলক validation gates
1. Worker deployment target পৃথক কিনা যাচাই।
2. GET health endpoint থেকে isolated=true, merge=false, deploy=false যাচাই।
3. Authentication failure test।
4. Valid authenticated request test।
5. Task ID + Agent Name + Agent ID + Session ID + branch response-এ আছে কিনা যাচাই।
6. New task-এর জন্য আলাদা agent/* branch তৈরি হয় কিনা যাচাই।
7. Main-এ write নিষিদ্ধ কিনা যাচাই।
8. Protected path write প্রত্যাখ্যাত হয় কিনা যাচাই।
9. Work history/handoff record তৈরি হয় কিনা যাচাই।
10. Gemini/tool-loop failure হলে BLOCKED/handoff state স্পষ্ট হয় কিনা যাচাই।
11. Production chat Worker untouched থাকে কিনা যাচাই।
12. Browser integration-এর আগে runtime evidence সংরক্ষণ।

## Pass rule
সব mandatory gate pass না হলে Agent Engine-কে production-integrated বা LIVE VERIFIED বলা যাবে না।

## Safety
এই protocol নিজে কোনো production deployment অনুমোদন করে না। Promotion আলাদা approval gate।
