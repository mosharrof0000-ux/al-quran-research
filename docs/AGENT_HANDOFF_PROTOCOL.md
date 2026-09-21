# Agent Handoff Protocol

## 1. Start
Create a unique Task ID, Bengali agent name, isolated branch, and task record before implementation.

## 2. Inspect
Read project rules and the relevant current implementation before editing. Record what was inspected and what remains unknown.

## 3. Work
Make the smallest safe change. Keep production code isolated until validation.

## 4. Test
Run functional, technical, compatibility, and visual/runtime checks that are available. If a test fails, record the failure and repair attempt.

## 5. Handoff
If incomplete, record:
- original agent
- successor agent
- completed work
- incomplete work
- changed files
- current branch/commit
- known failures
- exact next action

## 6. Promotion
Agent branch → review → validation → explicit approval → main promotion → deployment → live smoke test.

## 7. History
The original agent remains credited for its work. A successor adds a new record and never rewrites history to make inherited work appear newly created.

## 8. User report
Final report must clearly say: completed, not completed, blocked, branch, commit, test result, and whether production/live was changed.
