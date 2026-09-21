# Agent Handoff Protocol — v1.1

## Purpose
এক Agent-এর অসম্পূর্ণ বা চলমান কাজ অন্য Agent যেন context হারানো ছাড়াই গ্রহণ করতে পারে।

## Handoff required
Session শেষ, blocked state, failed verification, ownership change, বা successor request হলে handoff বাধ্যতামূলক।

## Required handoff
Original Agent Name/ID, Task ID, status, user request, inspected sources, completed work, remaining work, changed files, branch, latest commit, tests, known failures, next action, Successor Agent Name/ID, timestamp.

## Successor rule
Successor নতুন Agent ID নেবে। Original history overwrite করবে না। Handoff পড়ার পর source ও applicable instructions পুনরায় যাচাই করবে। Successor predecessor-এর gap থেকে শুরু করবে।

## Completion
Successor নিজের changes আলাদা history/commit-এ রাখবে এবং final verification লিখবে। Remaining work থাকলে task HANDOFF_REQUIRED হবে।

## No false completion
Deployment success, file write বা AI response একা completion প্রমাণ নয়।

## Status
ACTIVE — v1.1
