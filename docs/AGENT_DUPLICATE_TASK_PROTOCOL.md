# Agent Duplicate Task Protocol v1

## Purpose
The requester may accidentally send the same instruction two or more times. The Project Agent must prevent repeated destructive work.

## Rules
1. Normalize the command and create a SHA-256 task fingerprint.
2. When no explicit Task ID is supplied, the fingerprint deterministically identifies the task.
3. The fingerprint determines the default isolated agent branch, so an identical retry returns to the same workspace.
4. A persisted task in HANDOFF_COMPLETE state is treated as DUPLICATE and is not executed again.
5. A persisted task in an incomplete state is RESUMING and continues from its last recorded state.
6. An explicit Task ID/session/branch supplied by the client takes precedence and is used for network-resume retries.
7. A changed scope or changed instruction produces a different fingerprint and therefore a new task.
8. Duplicate detection is based on task identity and project state, not only text equality.
9. No duplicate request may merge or deploy production.
10. Every task keeps a persistent runtime journal under docs/agent-work/runtime/<TASK_ID>.json.

## States
RECEIVED -> RESUMING -> WORKING -> TESTING -> VALIDATED -> HANDOFF_COMPLETE

Duplicate terminal state:
DUPLICATE

Failure/recovery state:
BLOCKED -> RESUMING

## Safety principle
Repeated user input must never cause repeated destructive edits merely because the same command was submitted again.
