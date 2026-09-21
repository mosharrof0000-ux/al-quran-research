# Project Agent — Handoff Protocol

অসম্পূর্ণ বা blocked কাজের Agent-কে লিখতে হবে: request, inspected files, changes, branch/commit, remaining work, blockers, next-agent instructions এবং শেষ verification।

Successor নতুন Task ID + নতুন Agent ID পাবে এবং Parent Task ID-তে আগের task যুক্ত করবে। Original Agent-এর নাম overwrite করা যাবে না।

VALIDATED বা LIVE_VERIFIED না হলে “সম্পূর্ণ হয়েছে” বলা যাবে না।
