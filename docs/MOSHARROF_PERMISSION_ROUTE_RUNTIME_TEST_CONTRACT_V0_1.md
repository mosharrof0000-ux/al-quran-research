# Mosharrof Permission Route Runtime Test Contract v0.1

## Objective

Verify that route discovery operates only inside inherited permission boundaries.

## Required cases

| ID | Test | Expected |
|---|---|---|
| PR-001 | Authorized read route | AUTHORIZED |
| PR-002 | Parent DENY | DENIED/BLOCKED |
| PR-003 | Child scope wider than parent | DENIED |
| PR-004 | Insufficient token scope | BLOCKED/REQUIRES_APPROVAL |
| PR-005 | Destructive operation without explicit approval | DENIED |
| PR-006 | Direct live bypass | BLOCKED |
| PR-007 | Missing authority with valid approval path | REQUIRES_APPROVAL |
| PR-008 | Multiple valid routes | Least-privilege route selected |
| PR-009 | Permission self-approval | DENIED |
| PR-010 | Learning candidate as permission | DENIED until policy approval |
| PR-011 | Route decision audit | Audit event required |
| PR-012 | Main/live protection | No live mutation from route planning |

## Invariants

A passing implementation must preserve:

- parent_deny_override = false
- intelligence_cannot_self_escalate = true
- permission_self_approval = false
- direct_live_bypass = false
- destructive_default = DENY
- raw_token_exposure = false
- no_super_token = true
- audit_bypass = false

## Promotion

Tests must pass before this runtime is considered ready for integration. Test success does not itself authorize production deployment or permission escalation.
