# Agent Handoff Protocol — v1

কাজ শেষ, অসম্পূর্ণ, blocked, paused বা অন্য Agent-এর কাছে গেলে Handoff Record বাধ্যতামূলক।

## Record
Task ID; Agent Name; Agent ID; Session ID; Request; Status; Parent Task ID; Branch; Changed Files; Commits; Completed Work; Remaining Work; Known Problems; Tests; Last Verification; Next Agent Instructions; Timestamp।

## উত্তরসূরি
অন্য Agent অসম্পূর্ণ কাজ নিলে Parent Task ID থাকবে। Original ও Successor আলাদা পরিচয়ে ইতিহাসে থাকবে। পূর্বের কাজ overwrite করা যাবে না।

## সত্যতা
Test/deploy/live verification না হলে completed/live বলা যাবে না। অনুমানকে verified result বলা নিষিদ্ধ।