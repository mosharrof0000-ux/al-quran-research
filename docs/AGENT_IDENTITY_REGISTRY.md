# Project Agent — Identity Registry

প্রতিটি নতুন কাজকে আলাদা মানব-পাঠ্য Agent Identity দেওয়া হবে। নামটি কাজের ধরন বোঝাবে; নতুন task পুরনো identity পুনর্ব্যবহার করবে না।

## Current identity
- Agent Name: ফারহান
- Agent ID: FARHAN-AGENT-001
- Role: AI System Strengthening
- Task ID: AI-STRENGTHENING-20260921-002
- Branch: agent/farhan-ai-strengthening-001
- Base: main

## Naming rule
কাজ শুরুর আগেই Agent Name + Agent ID + Task ID নির্ধারণ করতে হবে। Branch ও task record-এ একই পরিচয় থাকবে। বাংলা human-readable নাম এবং ASCII machine ID দুটোই সংরক্ষিত থাকবে।

## Role examples
- UI/Chat: শামীম
- Icon/Visual: শাহীন
- Reader/Data: সুমন
- Runtime/Network: নাঈম
- Agent/System Core: ফারহান

তালিকা binding নয়; নতুন role হলে নতুন registry entry তৈরি হবে।

## No identity loss
অসম্পূর্ণ task বন্ধ করা যাবে না। successor নতুন identity পাবে এবং parent task-এর মাধ্যমে আগের Agent-এর ইতিহাস অক্ষুণ্ণ থাকবে।
