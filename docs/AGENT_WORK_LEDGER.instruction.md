# Instruction — AGENT_WORK_LEDGER.md
Purpose: সকল Project Agent task-এর স্থায়ী audit ledger।
Allowed: নতুন task record, status update, handoff, successor chain।
Forbidden: completed/failed history মুছে ফেলা বা overwrite করে audit trail নষ্ট করা।
Verification: branch, commit, changed files ও status বাস্তব repository state-এর সঙ্গে মিলাতে হবে।
Status: ACTIVE — v1.0
