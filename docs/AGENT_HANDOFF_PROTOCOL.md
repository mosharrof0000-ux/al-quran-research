# Agent Handoff Protocol — v1.0

## Purpose
যে কাজ শেষ হয়নি, সেটি যেন নতুন AI/session-এর কাছে context হারিয়ে না ফেলে।

## Handoff Required When
- session ends
- task is paused
- blocker occurs
- verification fails
- work is transferred
- user changes priority
- agent cannot safely continue

## Handoff Record
A handoff must state:
1. Agent Name / Agent ID
2. Task ID / Parent Task ID
3. Session ID
4. Original request
5. Current status
6. What was inspected
7. What was completed
8. What remains
9. Exact changed files
10. Branch and latest commit
11. Tests performed and evidence
12. Known defects/blockers
13. Protected areas not touched
14. Exact next action
15. Successor Agent Name/ID when assigned
16. Timestamp

## Continuation Rule
A successor must read the handoff before changing files, verify the current branch state, then continue from the recorded state. It must never erase the original worker's history.

## Completion
After successor completion, the ledger must preserve both identities and clearly separate original work from inherited work.
