# Agent Identity Registry — v1.0

## উদ্দেশ্য
প্রতিটি নতুন Project Agent কাজকে একটি মানবসদৃশ বাংলা Agent Name, unique Task ID এবং আলাদা agent/* branch-এর সঙ্গে যুক্ত রাখা।

## পরিচয়
- Agent Name: কাজের ধরন অনুযায়ী বাংলা নাম
- Agent Role: reader / icon / ui / test / data / agent / general
- Task ID: প্রতিটি কাজের জন্য নতুন
- Branch: কাজের আলাদা agent/* branch
- Session: যে chat/session কাজটি শুরু করেছে

## বর্তমান নাম-ধারা
- সুমন — Qur'an reader/source work
- শাহীন — icon/font/general engineering
- শামীম — UI/chat/interface
- নাঈম — browser/visual/technical verification
- রাকিব — data/database/dataset
- আরিফ — AI/automation/agent

একই নামকে একই সময়ে দুইটি active identity হিসেবে ব্যবহার করা যাবে না; continuation হলে নতুন Task ID এবং successor record থাকবে।

## বাধ্যতামূলক
কাজের শুরুতে identity + Task ID নির্ধারণ; কাজের শেষে completion বা handoff record রাখা; changed files, branch, commit এবং test status উল্লেখ করা।
