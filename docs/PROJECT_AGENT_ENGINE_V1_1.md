# Project Agent Engine v1.1 — AI Strengthening

এই version v1-এর isolated Project Agent-কে task-aware করে।

## নতুন capability
- Bengali human-like Agent Name নির্বাচন
- unique Agent ID + Task ID
- Work Type শনাক্তকরণ
- প্রতিটি task-এর জন্য isolated agent/* branch identity
- response-এ audit identity
- stronger inspect → plan → edit → verify → report instruction
- 10-turn tool loop
- UTF-8-safe GitHub writes
- main ও protected paths block

## নিরাপত্তা
Production merge/deploy এই engine-এর বাইরে। Main branch এই implementation-এ পরিবর্তিত নয়।

## Runtime gate
Worker deploy করার আগে required secrets: GEMINI_API_KEY, GITHUB_TOKEN, AGENT_ACCESS_TOKEN।
GET health → authenticated POST → read/tool → write-on-agent-branch → protected-path denial → browser integration—এই ক্রমে যাচাই করতে হবে।

## Verification
Deployment success একা LIVE VERIFIED নয়। Browser/runtime smoke test আলাদা।
