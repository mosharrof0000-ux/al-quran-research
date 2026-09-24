# Agent Handoff Protocol

কাজ থামলে, ব্যর্থ হলে, timeout হলে বা session শেষ হলে handoff record বাধ্যতামূলক।

Required: Original Agent Name/ID, Task ID, Parent Task, status, completed work, incomplete work, changed files, branch, last commit, tests passed, failures/blockers, exact next steps, successor Agent Name/ID/Task ID.

Successor পুরনো worker-এর history মুছবে না; নতুন task/identity নিয়ে continuation করবে।
