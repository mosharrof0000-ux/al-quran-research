# Agent Handoff Protocol

## উদ্দেশ্য
এক Agent-এর অসম্পূর্ণ বা চলমান কাজ অন্য Agent যেন context হারানো ছাড়াই গ্রহণ করতে পারে।

## Handoff কখন বাধ্যতামূলক
- কাজ অসম্পূর্ণ রেখে session শেষ হলে
- verification ব্যর্থ হলে
- external dependency/secret/permission-এর কারণে BLOCKED হলে
- user approval অপেক্ষায় থাকলে
- Agent role পরিবর্তন হলে

## Handoff Record
- Original Agent Name:
- Original Agent ID:
- Original Task ID:
- Successor Agent Name:
- Successor Task ID:
- Current status:
- User request:
- What was inspected:
- What was completed:
- What remains:
- Changed files:
- Branch:
- Latest commit:
- Tests run:
- Test failures:
- Repair attempts:
- Known risks:
- Exact next action:
- Do-not-repeat notes:
- Timestamp:

## Successor rule
Successor Agent নতুন identity নিয়ে কাজ করবে। Original Agent-এর কাজ নিজের নামে পুনর্লিখবে না; বরং parent task reference রাখবে।

## Verification rule
Successor প্রথমে Handoff Record এবং referenced files/commit যাচাই করবে। অনুমান করে অসম্পূর্ণ কাজকে completed হিসেবে ঘোষণা করা যাবে না।

## Completion rule
কাজ সম্পূর্ণ হলে successor তার নিজের Task Record-এ কী পরিবর্তন করেছে এবং original work-এর কোন অংশ ব্যবহার করেছে তা লিখবে।
