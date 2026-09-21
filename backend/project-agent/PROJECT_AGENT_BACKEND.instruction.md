# Project Agent Backend Instruction

এই directory-র Project Agent Engine হলো isolated engineering system। নতুন পরিবর্তন করার আগে Agent Governance এবং AI Entry Protocol অনুসরণ করতে হবে।

## Rules
- production chat Worker সরাসরি পরিবর্তন নয়।
- main branch-এ write নয়; শুধু agent/* task branch।
- merge/deploy Agent Engine-এর দায়িত্ব নয়।
- protected paths: .github/workflows/, database/, migrations/, validation/, quran_research.db, schema.sql।
- প্রতিটি task-এর Task ID, Agent Name, Agent ID, Session ID, branch, parent task, changed files, verification এবং handoff record থাকতে হবে।
- নতুন non-instruction file-এর জন্য এই category instruction প্রযোজ্য।
- কোনো live/deployed claim কেবল বাস্তব verification-এর পরে করা যাবে।
