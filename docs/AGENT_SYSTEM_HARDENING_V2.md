# Autonomous Project Agent — Hardening v2

## Task identity
- Agent Name: ইমরান
- Role: agent-core
- Task ID: AGENT-CORE-HARDENING-20260921
- Branch: agent/imran-agent-core-20260921
- Base: main
- Status: WORKING / ISOLATED

## লক্ষ্য
Project Agent-কে এমন নিরাপদ autonomous engineering layer করা যাতে ব্যবহারকারী স্বাভাবিক বাংলায় কাজের নির্দেশ দিলে Agent আগে context যাচাই করে, আলাদা workspace/branch-এ কাজ করে, test/verification evidence রেখে, অসম্পূর্ণ হলে handoff করে এবং production-এ নিজে থেকে না ঢোকে।

## শক্তিশালীকরণের ধাপ
1. Identity: প্রতিটি task-এর জন্য বাংলা human-like Agent Name + unique Task ID + Session/Branch identity।
2. Work Ledger: received → inspecting → planning → working → testing → repairing → validated → review → approved → deploy → live-verified → notified।
3. Handoff: incomplete/blocked/session-ended কাজের completed, remaining, changed files, commits, tests, blockers ও next-agent instructions বাধ্যতামূলক।
4. Isolation: main/production write নিষিদ্ধ; agent/* workspace only।
5. Protected paths: workflow, database, migrations, validation ও critical data direct agent write থেকে protected থাকবে যতক্ষণ না আলাদা approval gate থাকে।
6. Verification: source + runtime + independent final verification ছাড়া কাজকে complete বলা যাবে না।
7. Repair loop: test ব্যর্থ হলে কারণ শনাক্ত → minimal repair → পুনরায় test; বারবার ব্যর্থ হলে BLOCKED + handoff।
8. Live safety: deployment success একা live success নয়; live smoke test ছাড়া নতুন version verified নয়।
9. User continuity: বর্তমান live session অকারণে বন্ধ/refresh নয়; নতুন version প্রস্তুত হলে notification/soft update।
10. History: কে শুরু করেছে, কে পরিবর্তন করেছে, কে review করেছে, কে verify করেছে এবং কে deploy করেছে—আলাদা record।

## বর্তমান নিরাপত্তা সিদ্ধান্ত
- এই hardening কাজটি main-এ সরাসরি পরিবর্তন করছে না।
- আগে isolated implementation যাচাই হবে।
- stale/পুরোনো agent branch সরাসরি main-এ promote করা যাবে না; current main থেকে fresh integration branch ব্যবহার করতে হবে।
- production chat Worker ও বর্তমান live reader/data pipeline অপরিবর্তিত থাকবে যতক্ষণ না নতুন Agent Engine স্বাধীনভাবে validated হয়।

## পরবর্তী implementation gate
Fresh isolated Agent Engine → syntax/build test → health test → authenticated tool-call test → branch/write safety test → handoff/ledger test → browser integration test → review → explicit approval → promotion → live smoke test.
