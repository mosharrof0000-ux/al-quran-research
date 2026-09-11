# Instruction — docs/RESEARCH_MEMORY_V1.md

- Instruction ID: `INST-RESEARCH-MEMORY`
- Class: A — Critical
- Status: ACTIVE

## Purpose
Govern reusable research memory without mixing versions or silently converting proposals into verified knowledge.

## Rules
1. Retrieve versioned records read-only for research answers.
2. Preserve `record_id`, version, status, scope, and source reference when using a record.
3. A save begins as a proposal and requires human approval before persistent write.
4. Approved records are immutable/versioned; old records remain untouched.
5. Preserve uncertainty, disputes, and supersession status explicitly.
6. Never treat AI-generated memory as automatically verified.

## Verification
Check record identity, version, status, scope, source/evidence, and approval state before reuse.

## Update triggers
Update when research-memory schema, statuses, save/approval flow, or retrieval behavior changes.
