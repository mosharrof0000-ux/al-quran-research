# Mosharrof Universal ID Discovery Runtime v0.1

## Purpose

Provide a central, page-independent way to resolve any registered Page-ID, Tool-ID, Entity-ID, or AI-Peer-ID from any new page.

## Core rule

A page must not maintain its own authoritative ID list. All resolution goes through the central registry.

```
ANY PAGE
  -> ID SEARCH / RESOLVE
  -> CENTRAL REGISTRY
  -> AUTHORIZATION / VISIBILITY CHECK
  -> ENTITY / PAGE / TOOL RECORD
  -> RESULT
```

## Supported identifiers

- Page-ID
- Tool-ID
- Entity-ID
- AI-Peer-ID
- Research-ID when explicitly registered
- Future registered identifier types

## Registry rules

1. Every identifier is globally unique within its declared namespace.
2. A new page registers its Page-ID before becoming discoverable.
3. Existing pages do not need to be modified individually when a new ID is registered.
4. Resolution returns the canonical record, lifecycle state, owner/parent relation, and permitted public metadata.
5. Protected Core records are never exposed merely because an ID is known.
6. Registry records are versioned; silent overwrite is prohibited.
7. Retired IDs remain resolvable to a retirement/tombstone record where policy permits, preventing accidental reuse.
8. Child entities cannot resolve themselves as root entities.
9. An ID lookup is read-only; lookup cannot grant permission.
10. Search/discovery does not bypass permission, token, or policy checks.

## New-page behavior

Every Page-ID is a live page identity from creation. Capability/data/features may be progressively delivered later. The page's identity remains resolvable throughout its lifecycle.

## Resolution result

A resolver should return at minimum:

- id
- id_type
- canonical_name
- lifecycle_state
- parent_id
- page_id (when applicable)
- tool_id (when applicable)
- visibility
- version
- registry_reference

Sensitive fields, credentials, internal security configuration, and Protected Core data are excluded from public resolution.

## Lifecycle

REGISTERED -> REVIEWED -> APPROVED -> ACTIVE -> SUSPENDED/RETIRED

Resolution may return SUSPENDED or RETIRED records with restricted metadata; it must never silently map an old ID to a different entity.

## Failure behavior

- UNKNOWN_ID: no matching registry record
- AMBIGUOUS_ID: more than one candidate in a non-unique namespace
- NOT_VISIBLE: record exists but caller scope cannot see it
- SUSPENDED: record exists but is inactive
- RETIRED: record exists as retired/tombstone
- POLICY_BLOCKED: resolution is blocked by policy

## Security invariants

- lookup_only: true
- permission_escalation: false
- protected_core_bypass: false
- token_secret_exposure: false
- silent_id_reuse: false
- child_can_become_root: false

## Non-goals

This v0.1 does not expose Protected Core internals, create provider credentials, grant permissions, or mutate the live core.

## Acceptance criteria

A future runtime implementation is valid only when it can:

1. Resolve a known Page-ID from a different page.
2. Resolve a known Tool-ID from a different page.
3. Resolve a known Entity-ID from a different page.
4. Return UNKNOWN_ID for an unregistered ID.
5. Prevent duplicate canonical IDs.
6. Preserve parent/root boundaries.
7. Prevent lookup from granting permission.
8. Preserve retired-ID history without reusing the identifier.
9. Hide protected fields from public resolution.
10. Record resolution events for auditable operations.
