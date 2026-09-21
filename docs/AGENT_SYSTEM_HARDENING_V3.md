# Project Agent System Hardening v3

## Agent
- Name: রায়হান
- Agent ID: RAYHAN-AI-STRENGTH-001
- Task ID: AI-STRENGTH-V3-20260921
- Branch: agent/rayhan-ai-strengthening-001

## লক্ষ্য
Project Agent-কে নিরাপদভাবে আরও শক্তিশালী করা: নতুন কাজের পরিচয়, inspect-first intelligence, bounded tool loop, safe branch isolation, write read-back এবং branch comparison।

## নিরাপত্তা
- main untouched
- production chat/reader/data untouched
- merge=false
- deploy=false
- protected paths blocked
- secrets are runtime-only

## Runtime contract
1. প্রতিটি request-এ Task ID + Session ID + Agent ID + Bengali Agent Name।
2. কাজের ধরন দেখে human-like Bengali name নির্বাচন।
3. প্রথমে project inspection।
4. পরিবর্তনের পর read-back verification।
5. main-এর সঙ্গে branch compare।
6. ব্যর্থ/অসম্পূর্ণ হলে HANDOFF_REQUIRED।
7. live/deployment verification প্রমাণ ছাড়া claim করা যাবে না।

## পরবর্তী gate
Isolated Worker deploy → health → authenticated Gemini call → safe write/read-back → protected-path rejection → independent review → browser/console/network verification → explicit approval → promotion.
