# Mosharrof Token Engine Implementation v0.1

## Purpose
Provide the central runtime that safely maps Mosharrof intent to an already-approved credential without allowing the credential to become a source of authority.

## Pipeline
REQUEST
→ REQUIRED CAPABILITY
→ PARENT PERMISSION
→ TOKEN CANDIDATES
→ SCOPE INTERSECTION
→ ENVIRONMENT CHECK
→ POLICY GATE
→ LEAST-PRIVILEGE SELECTION
→ APPROVAL CHECK
→ EXECUTE
→ VERIFY
→ AUDIT

## Components
- Token Registry: metadata only; no raw secret.
- Capability Resolver: identifies required capability/operation.
- Permission Boundary: intersects parent and child authority.
- Token Selector: selects an active credential that covers the requested scope.
- Policy Gate: enforces approval, environment and destructive/security restrictions.
- Secret Adapter: resolves the opaque auth reference at execution time.
- Audit Sink: records decisions and outcomes without credentials.
- Rotation/Revocation Monitor: handles expiry, review, suspension and revocation.

## Authority rule
Effective permission is the intersection of:
parent policy × capability × operation × resource scope × environment × token scope × policy gate.

A token can authenticate an operation; it cannot authorize an operation that policy has denied.

## Failure behavior
- Missing token → BLOCKED.
- Inactive/revoked token → BLOCKED.
- Scope mismatch → BLOCKED.
- Parent deny → DENIED.
- Destructive operation without explicit approval → DENIED.
- Self-escalation request → DENIED.
- Valid operation requiring human approval → REQUIRES_APPROVAL.
- Provider/API failure → ERROR and audit event; do not silently retry with a broader credential.

## Secret handling
Raw secrets must never appear in source, commits, issues, PR comments, logs, audit payloads, test fixtures or learning records.

## Provider boundary
The engine does not manufacture Cloudflare permissions. Cloudflare remains the provider-side authority that creates/revokes credentials. The engine consumes only approved credentials and enforces the project's narrower runtime boundary.

## Promotion
REGISTERED → VERIFIED → ACTIVE → REVIEW → SUSPENDED/REVOKED.

A credential is not ACTIVE merely because a secret exists; its provider scope, registry record, policy mapping and runtime tests must be valid.
