# Agent Self-Repair Protocol v1

## Purpose
A recoverable tool failure must not unnecessarily stop a Project Agent task.

## Behavior
1. Every tool call is observed for success/failure.
2. A failed call returns a structured error to Gemini instead of silently disappearing.
3. The agent may correct arguments/path/branch and retry a failed operation.
4. The same exact tool call has a maximum of two repair attempts.
5. After the bounded repair budget is exhausted, the operation is reported as BLOCKED rather than retried forever.
6. Successful retry clears the repair counter for that operation.
7. Existing task state and isolated branch remain the recovery source.
8. Main, protected paths, merge and production deployment remain prohibited.
9. A final success notification is only appropriate after validation; a blocked task is not reported as completed.

## Safety
Self-repair means correcting a diagnosable tool failure. It does not mean guessing destructive changes.
