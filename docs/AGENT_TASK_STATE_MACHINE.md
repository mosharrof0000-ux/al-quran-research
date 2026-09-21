# Project Agent Task State Machine

## উদ্দেশ্য
প্রতিটি Agent request-কে একটি দৃশ্যমান lifecycle-এ রাখা হবে যাতে নতুন Agent বা successor বুঝতে পারে কাজটি কোথায় আছে এবং কোন প্রমাণ এখনও বাকি।

## States
RECEIVED → INSPECTING → PLANNED → WORKING → TESTING → REPAIRING → VALIDATED → READY_FOR_REVIEW → APPROVED → DEPLOYING → LIVE_VERIFIED → NOTIFIED → HANDOFF_COMPLETE.

ব্যর্থ/বন্ধ অবস্থায়: BLOCKED অথবা ROLLED_BACK.

## Identity
প্রতিটি request-এ Task ID, Agent Name, Agent ID, Session ID, Work Type এবং Parent Task ID থাকবে। না পাঠালে Engine একটি unique runtime identity তৈরি করবে। Work Type থেকে human-like Bengali Agent Name নির্বাচন করা হয়; এটি project-assigned identity, কোনো বাস্তব ব্যক্তির পরিচয় নয়।

## Safety
- Agent branch ছাড়া write নয়।
- main merge নয়।
- production deploy নয়।
- protected workflow/database/migration/validation paths পরিবর্তন নয়।
- deployment success-কে live success হিসেবে ধরা যাবে না; live verification আলাদা ধাপ।

## Current limitation
এই v1 hardening ধাপে task metadata request/response-এ বহন করা হচ্ছে। স্থায়ী cross-session ledger এখনো আলাদা persistent store-এ সংযুক্ত হয়নি; তাই production promotion-এর আগে persistent registry ও browser/runtime verification যোগ করা আবশ্যক।
