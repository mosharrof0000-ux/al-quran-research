# MOSHARROF Permission Boundary and Route Runtime v0.1

## 1. Purpose

This specification completes the next control layer for Mosharrof: it may create or propose permissions, but it can never create a permission that violates the governing parent policy.

Core rule:

**Mosharrof may expand capability only through an approved path; it may never expand the authority boundary by itself.**

## 2. Hard boundary

Effective permission is the intersection of:
- parent policy
- capability
- operation
- resource scope
- environment
- time/review window
- policy gate

A child permission may narrow any dimension. It may never widen an explicit parent DENY.

Hard boundaries:
- root authority
- security/admin restrictions
- destructive operations
- token scope
- direct-live bypass prohibition
- audit requirements
- mandatory human approval
- parent-policy DENY

## 3. Route graph

A route is a sequence of already permitted capabilities.

Route lifecycle:
DISCOVERED -> POLICY_CHECKED -> SCOPE_CHECKED -> SAFETY_CHECKED -> ROUTE_VALIDATED -> AUTHORIZED -> EXECUTED -> VERIFIED -> AUDITED

Failure:
DENIED | BLOCKED | REQUIRES_APPROVAL

The planner searches only inside the permission graph. It must not invent an edge that is not authorized.

## 4. Route selection

For multiple valid routes, prefer in this order:
1. policy compliant
2. least privilege
3. smallest resource scope
4. safest environment
5. minimum credential scope
6. reversible operation
7. independently verifiable result
8. complete audit trail

A more powerful route is never preferred merely because it is more powerful.

## 5. Permission creation

Mosharrof can:
- propose a new permission;
- create a narrower child permission from an authorized parent;
- compose an approved route from existing permissions;
- request additional authority.

Every new permission must pass:
PROPOSE -> INHERITANCE_CHECK -> POLICY_CHECK -> SCOPE_CHECK -> SECURITY_CHECK -> REVIEW -> APPROVE -> ACTIVE

A permission cannot approve itself.

## 6. Automatic denial conditions

Return DENIED or BLOCKED when:
- a parent policy says DENY;
- the route widens scope;
- token scope is insufficient;
- environment is outside authorization;
- destructive authority is inferred from non-destructive authority;
- security controls would be disabled;
- audit would be bypassed;
- direct live execution bypasses the protected deployment path.

Return REQUIRES_APPROVAL when the requested operation is outside the current authority but a legitimate higher-level approval path exists.

## 7. Capability-token bridge

INTENT
-> REQUIRED_CAPABILITY
-> ROUTE_DISCOVERY
-> PERMISSION_INHERITANCE_CHECK
-> POLICY_CHECK
-> TOKEN_SELECTION
-> SCOPE_CHECK
-> ENVIRONMENT_CHECK
-> EXECUTION
-> VERIFICATION
-> AUDIT

Token remains a credential. Capability remains authorized power. Intelligence remains the planner. None may redefine the other.

## 8. Self-escalation prevention

Intelligence cannot:
- grant itself a broader capability;
- change a token's scope;
- convert DENY to ALLOW;
- disable policy gates;
- delete audit history;
- bypass staging/verification;
- use a newly proposed permission as evidence that the permission is already approved.

## 9. Learning integration

A learned strategy is only a candidate until validated.

LEARNING -> CANDIDATE -> SANDBOX -> TEST -> VALIDATE -> POLICY REVIEW -> STAGING -> VERIFY -> ACTIVE

Learning can discover a possible route. Learning cannot authorize that route.

## 10. Audit record

Every route decision should record:
- route_id
- request_id
- entity_id
- requested capability
- candidate route
- selected route
- rejected routes and reason
- parent policy reference
- permission references
- token/auth reference (never raw secret)
- environment
- policy decision
- verification result
- timestamp
- version

## 11. Safety invariants

The following invariants must remain true:
- least_privilege = true
- no_super_token = true
- raw_token_exposure = false
- intelligence_cannot_self_escalate = true
- direct_live_bypass = false
- destructive_default = DENY
- parent_deny_override = false
- permission_self_approval = false
- audit_bypass = false

## 12. Test contract

Minimum tests:
1. Allowed permission produces a valid route.
2. Parent DENY blocks a child permission.
3. Child scope cannot exceed parent scope.
4. Token scope cannot be expanded by route planning.
5. Destructive operation remains DENY by default.
6. Direct-live bypass is blocked.
7. Missing authority returns REQUIRES_APPROVAL.
8. Multiple valid routes select least privilege.
9. Permission cannot approve itself.
10. Learning candidate cannot directly become active permission.
11. Audit record is produced for route decisions.
12. Existing main/live state remains unchanged until explicit promotion.

## 13. Scope

This document is an architecture/runtime contract. It does not itself grant production permissions, change Cloudflare permissions, activate external AI connections, merge main, or deploy live.

## 14. Version rule

Future revisions must preserve the hard-boundary invariants unless a higher-level human-approved policy explicitly changes them. Version history must remain intact; no silent overwrite.
