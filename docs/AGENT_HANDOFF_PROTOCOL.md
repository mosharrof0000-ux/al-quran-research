# Agent Handoff Protocol — v1

## কখন handoff বাধ্যতামূলক
- কাজ অসম্পূর্ণ অবস্থায় থামলে;
- tool/runtime failure হলে;
- approval অপেক্ষমাণ থাকলে;
- অন্য Agent continuation নিলে;
- deployment বা live verification বাকি থাকলে।

## Handoff minimum
Original Agent Name/ID, Task ID, current branch, last commit, completed work, incomplete work, exact files, observed errors, tests already run, next safe action, protected constraints, successor Agent Name/ID.

## Takeover rule
Successor নতুন Agent ID ও Session ID পাবে। parent_task_id এবং successor_of দিয়ে chain থাকবে। Successor পুরোনো কাজকে নিজের কাজ হিসেবে rewrite করবে না।

## Completion rule
Code লেখা শেষ হলেই completed নয়। Validation, approval/deployment state এবং live verification আলাদা fields হিসেবে record হবে।

Status: ACTIVE — v1
