# Instruction — Agent Handoff Protocol

Path: docs/AGENT_HANDOFF_PROTOCOL.md
Purpose: Agent takeover ও অসম্পূর্ণ কাজের continuity rule।

Rules:
- incomplete work silently abandoned নয়;
- successor নতুন identity নেবে;
- original history অক্ষুণ্ণ থাকবে;
- live deployment approval ছাড়া ধরে নেওয়া যাবে না।

Verification: handoff record-এ completed/remaining/next action/successor থাকতে হবে।
Status: ACTIVE — v1
