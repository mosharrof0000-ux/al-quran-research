# Agent Work Ledger — v2

| Field | Requirement |
|---|---|
| Task ID | unique |
| Agent | Bengali name + Agent ID |
| Role | work category |
| Request | exact user command |
| Parent | inherited task if any |
| Session | unique session |
| Branch | isolated agent/* |
| Inspected | files/branches/runtime evidence |
| Changed | exact files |
| Commits | commit SHA list |
| Tests | functional/technical/visual/runtime |
| Repairs | failure → repair history |
| Status | RECEIVED/WORKING/TESTING/VALIDATED/BLOCKED/HANDOFF |
| Promotion | approval state |
| Live | only after verified deployment |
| Successor | next agent if incomplete |

## Non-negotiable
Incomplete work must leave a handoff. A successor creates a new identity and preserves the original worker's history.
