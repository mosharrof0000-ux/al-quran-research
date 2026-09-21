# Project Agent Handoff Protocol

## 1. Ownership
একটি Task-এর একজন বর্তমান owner থাকবে। অন্য agent কাজ নিলে successor হিসেবে নতুন identity পাবে।

## 2. No history loss
Successor কখনো original agent-এর কাজ নিজের নামে overwrite করবে না। Handoff chain সংরক্ষিত থাকবে।

## 3. Evidence
প্রতিটি গুরুত্বপূর্ণ দাবির সঙ্গে branch, commit, changed files এবং test evidence সংরক্ষণ করতে হবে।

## 4. Takeover
Successor প্রথমে:
- parent Task record পড়বে
- last commit পরীক্ষা করবে
- changed files পরীক্ষা করবে
- known issues পড়বে
- তারপর নতুন plan করবে

## 5. Completion
কাজ সম্পূর্ণ হওয়ার আগে:
- source verification
- runtime verification
- independent final verification
করতে হবে।

## 6. Rollback
Validation ব্যর্থ হলে live/main-এ promotion নয়। নিরাপদ পুরোনো version অক্ষত থাকবে।

## 7. Communication
Agent report-এ সবসময় থাকবে:
- কে কাজ করেছে
- কী করেছে
- কোথায় করেছে
- কী পরীক্ষা করেছে
- কী বাকি
- পরবর্তী agent কী করবে
