# Agent Identity Registry — v1.0

## Purpose
প্রতিটি নতুন Project Agent কাজের জন্য একটি স্বতন্ত্র বাংলা মানব-সদৃশ Agent Identity থাকবে। নামটি কাজের ধরন বোঝাবে এবং ইতিহাসে একই কাজের পরিচয় আলাদা রাখা হবে।

## Identity fields
- Agent Name (বাংলা)
- Agent ID
- Task ID
- Work Type
- Session ID
- Requester
- Parent Task ID
- Branch
- Status
- Created/Updated time

## Naming rule
নাম কাজের ধরন অনুযায়ী নির্ধারিত হবে; একই active Task-এ একই identity পুনঃব্যবহার করা যাবে না। একই ব্যক্তিনাম ভবিষ্যৎ আলাদা কাজের ক্ষেত্রে suffix/unique Agent ID সহ আলাদা identity হবে।

## Example
- শাহীন — Icon System
- শামীম — Chat UI
- সুমন — Reader
- রাকিব — Notification
- নাঈম — Browser Verification

## Safety
Agent identity কোনো মানুষের বাস্তব পরিচয় দাবি করে না। এটি project audit identity মাত্র.
