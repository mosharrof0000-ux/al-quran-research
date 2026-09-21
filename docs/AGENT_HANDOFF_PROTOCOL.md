# Project Agent Handoff Protocol — v1.1

Handoff is mandatory when a task pauses, fails, is blocked, or changes owner.

Required: original Agent Name/ID, Task ID, Parent Task ID, status, completed work, incomplete work, changed files, branch, commits, tests, known issues, exact next action, successor Agent Name/ID, timestamp.

Successor must use a new identity, read the predecessor record, independently inspect the current branch, and continue without erasing attribution.

Completion requires verification evidence. Deployment success alone is not live verification.
