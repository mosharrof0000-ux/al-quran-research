# আল-কুরআন রিসার্চ — Project Agent AI Strength v3

## Agent Identity
- Agent Name: শাহীন
- Agent ID: SHAHIN-AI-V3-001
- Task ID: AI-STRENGTH-V3-001
- Branch: agent/shahin-ai-strength-v3-001
- Base: main

## উদ্দেশ্য
Project Agent-কে শুধু Gemini chat নয়, একটি governed autonomous engineering agent হিসেবে শক্তিশালী করা।

## V3 capability
1. প্রতিটি request-এ নতুন Task ID, Session ID, Agent ID ও Work Type।
2. কাজের ধরন অনুযায়ী Bengali human-like Agent Name।
3. prior work/history আগে খোঁজা।
4. main থেকে নতুন isolated agent branch।
5. repository tree, file, code search, branch status, recent commits এবং ref comparison inspection।
6. protected path enforcement।
7. bounded Gemini tool loop ও bounded context।
8. কাজ শেষে permanent Work Record।
9. failure হলে BLOCKED + handoff_required।
10. merge/deploy নয়; promotion আলাদা approval gate।
11. completed/remaining/changed files/verification/next action বাধ্যতামূলক report।

## নিরাপত্তা
- main-এ write নিষিদ্ধ।
- .github/workflows, database, migrations, validation এবং critical DB/schema files agent-write protected।
- agent branch ছাড়া কোনো mutation নয়।
- deployment success কখনো live verification হিসেবে গণ্য হবে না।

## পরবর্তী gate
Isolated Worker deployment → health → authenticated tool call → branch/write safety → task ledger → independent runtime verification → browser/console/network layer → explicit approval → promotion → live smoke test।
