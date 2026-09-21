# Agent Handoff Protocol — v1.0

## Purpose
এক Agent-এর অসম্পূর্ণ বা চলমান কাজ অন্য Agent যেন context হারানো ছাড়াই গ্রহণ করতে পারে।

## Handoff required
Session শেষ, blocked state, failed verification, ownership change, বা user-এর successor request হলে handoff বাধ্যতামূলক।

## Required handoff
Original Agent Name/ID, Task ID, status, user request, inspected sources, completed work, remaining work, changed files, branch, latest commit, tests, known failures, next action, Successor Agent Name/ID, timestamp.

## Successor rule
Successor নতুন Agent ID নেবে। Original history overwrite করবে না। Handoff পড়ার পর source এবং instruction পুনরায় যাচাই করবে।

## Completion
Successor নিজের changes আলাদা history/commit-এ রাখবে এবং final verification লিখবে।

## Status
ACTIVE — v1.0