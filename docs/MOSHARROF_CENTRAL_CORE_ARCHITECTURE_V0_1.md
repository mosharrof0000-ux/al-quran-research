# মোশাররফ — Central Core Architecture v0.1

## Status
Draft architecture foundation — created on branch `feature/dynamic-entity-token-engine-v0-1`. This document does not change the live `main` project.

## Identity
**মোশাররফ** is the system-level root entity and central coordination layer.

**আল-কুরআন রিসার্চ** remains a separate tool/project. It is not renamed or absorbed into the root identity by this document.

## Core principle
Tools remain independently usable, but their registered capabilities, permissions, resources, automation channels, and policy boundaries are governed through the central মোশাররফ control plane.

A tool does not become a second root system.

## Control layers
1. **Identity Registry** — defines মোশাররফ and every registered tool/entity.
2. **Intent & Planning Engine** — converts user intent into a controlled execution plan.
3. **Capability Registry** — records what each tool can and cannot do.
4. **Permission Registry** — maps capabilities to approved permission IDs/scopes.
5. **Token Orchestrator** — selects the least-privileged registered credential required for a task; credentials are never merged into a new super-token.
6. **Policy/Safety Gate** — blocks forbidden/destructive operations and enforces approval requirements.
7. **Tool Runtime** — executes only the approved plan.
8. **Event/Audit Stream** — records requests, decisions, executions, results, versions, and failures.
9. **Version/Backup Vault** — preserves recoverable versions and prevents history from being overwritten.
10. **Protected Live Core** — production changes pass through review/test/staging/canary gates rather than direct modification.

## Tool relationship
```
মোশাররফ
  ├── আল-কুরআন রিসার্চ
  ├── Tool-02
  ├── Tool-03
  └── Future Tools
```

Each tool has its own identity and runtime, while remaining registered with মোশাররফ.

## Power allocation
Power is allocated by capability, scope, resource, and operation—not as an unlimited blanket grant.

Example:
```
মোশাররফ
  -> Tool: আল-কুরআন রিসার্চ
  -> Capability: approved research/data operations
  -> Permission: specific approved scope
  -> Token: selected credential
  -> Policy: enforced
```

If a tool needs more power, the request becomes a capability/permission change proposal. It does not silently gain authority.

## Continuous operation
Tools may remain continuously active and may receive new approved capabilities over time. New capabilities are detected/registered, documented, tested, and only then promoted according to policy.

## Evidence and history
Any important system change must retain:
- source/request
- reason
- affected entity/tool
- permission/capability used
- validation result
- version/change ID
- timestamp
- rollback reference

No important historical record is silently overwritten.

## Human control
The system may automate implementation inside its approved boundaries. Human approval remains available for policy-sensitive, security-sensitive, destructive, or production-changing actions.

## Relationship to existing project
The existing project already defines a research laboratory direction, a Universal Tool Engine foundation, evidence/versioning rules, and protected live-page practices. This document adds the higher-level identity: **মোশাররফ as the central system entity**.

## Non-goals
- No direct rename of the repository.
- No direct modification of the live main branch.
- No merging of API-token secrets.
- No removal of existing research evidence/history.
- No automatic promotion of unverified data to verified status.

## Next implementation stages
1. Register মোশাররফ as the root entity.
2. Register আল-কুরআন রিসার্চ as the first child tool.
3. Define entity/capability/permission/token relationships.
4. Build the central event/audit contract.
5. Connect the existing Universal Tool Engine.
6. Add controlled capability/power allocation.
7. Verify in branch, then review before any main/live adoption.
