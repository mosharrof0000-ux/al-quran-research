# Project Agent — Time-Bounded Task & Recovery Protocol

## উদ্দেশ্য
একই কাজ অনির্দিষ্ট সময় ধরে একই পদ্ধতিতে চলবে না। Agent একটি নির্ধারিত active execution window-এর মধ্যে কাজ করবে; সময় শেষ হলে কাজ বাতিল না করে checkpoint রেখে recovery state-এ যাবে।

## Default policy
- Maximum continuous active execution: 2 hours.
- Maximum same-failure retries: 3.
- Major progress হলে task journal আপডেট হবে।
- Timeout মানে cancellation নয়।
- Timeout flow: `TIME_LIMIT_REACHED → CHECKPOINTED/WAITING_FOR_RECOVERY → RESUMING → VERIFYING → COMPLETED`.
- External dependency/network/runtime সমস্যা হলে checkpoint সংরক্ষিত থাকবে এবং একই Task ID/branch থেকে resume করা যাবে।
- একই failure threshold অতিক্রম করলে একই পদ্ধতি অনন্তবার retry করা যাবে না; Agent-কে strategy change বা review state-এ যেতে হবে।
- নতুন active window-এ resume হলে নতুন deadline শুরু হবে; পূর্বের checkpoint ও history হারাবে না।

## Good-state preservation
`RECEIVED`, `RESUMING`, `READY_FOR_REVIEW`, `HANDOFF_COMPLETE` এবং recovery-related state task journal-এ সংরক্ষিত থাকবে। কোনো নতুন attempt পুরোনো verified state নষ্ট করবে না।

## User notification contract
Timeout বা blocker হলে response-এ `resumable: true`, Task ID এবং recovery state থাকবে। Final user notification কেবল verification-এর পরে success হিসেবে দেখানো যাবে। এই protocol নিজে push notification service দাবি করে না।

## Safety
- শুধু `agent/*` branch।
- main-এ write নয়।
- merge/deploy নয়।
- protected paths অপরিবর্তিত।
- timeout-কে success হিসেবে report করা যাবে না।

## Configuration
Worker environment variables:
- `AGENT_MAX_ACTIVE_MS` — active window milliseconds; default 7200000.
- `AGENT_MAX_SAME_FAILURES` — same-failure retry ceiling; default 3.

## Example
কাজ 70 মিনিটে checkpoint পেলে এবং network বন্ধ হলে task `WAITING_FOR_RECOVERY` হবে। পরে একই Task ID দিয়ে resume করলে checkpoint থেকে নতুন active window শুরু হবে। কাজ 2 ঘণ্টা continuous execution ছাড়িয়ে গেলে `TIME_LIMIT_REACHED` হবে এবং verified completion না হওয়া পর্যন্ত success report হবে না.
