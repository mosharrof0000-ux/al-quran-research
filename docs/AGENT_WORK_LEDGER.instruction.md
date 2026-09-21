# Instruction — Agent Work Ledger

Path: docs/AGENT_WORK_LEDGER.md
Purpose: Project Agent-এর observable কাজের audit trail।

Rules:
- entry overwrite নয়;
- incomplete কাজ অবশ্যই handoff করবে;
- successor chain সংরক্ষণ করবে;
- branch/commit/test/live evidence ছাড়া কাজকে completed বলা যাবে না;
- hidden chain-of-thought রাখা যাবে না।

Verification: প্রতিটি task entry-তে identity, branch, status এবং verification fields থাকতে হবে।
Status: ACTIVE — v1
