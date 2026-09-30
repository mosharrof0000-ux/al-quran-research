# Agent Network Resume Protocol v1

## Purpose
A temporary browser/model/network disconnect must not discard Project Agent work.

## Required behavior
1. Every task has a persistent Task ID, Agent ID, session ID and isolated agent/* branch.
2. Task state is persisted under docs/agent-work/runtime/<TASK_ID>.json on the isolated branch.
3. A retry with the same Task ID must load the previous state and continue rather than start over.
4. Completed writes remain committed on the isolated branch even if the requester loses connection.
5. The client must retry the request after connectivity returns, using the same Task ID/session identity.
6. Retry requests must be idempotent: already-completed work must be detected before repeating destructive operations.
7. Network errors are not treated as task failure; the task remains resumable until terminal state is recorded.
8. Final notification is sent only after VALIDATED/HANDOFF_COMPLETE and independent verification.
9. Production/main/live promotion remains blocked until the normal approval gates pass.

## Current implementation
- Persistent task journal: Project Agent Worker.
- Resume-aware POST accepts task_id/agent identity and reloads prior task state.
- Deterministic agent branch is used for resumable work.
- Deployment smoke test uses curl retry/backoff for transient network failures.

## Remaining activation gate
The deployed Worker must pass an authenticated POST -> Gemini -> tool call -> isolated branch write -> persisted handoff test, followed by independent verification. Only then can Agent Mode be connected to the live website.
