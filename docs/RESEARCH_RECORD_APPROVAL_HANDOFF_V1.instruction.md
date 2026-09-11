# Instruction — docs/RESEARCH_RECORD_APPROVAL_HANDOFF_V1.md

- Instruction ID: `INST-RECORD-APPROVAL-HANDOFF`
- Class: A — Critical
- Status: ACTIVE

## Purpose
Protect the handoff from AI-generated research proposals to human approval and immutable research records.

## Rules
1. AI chat may create/carry a `research_record_proposal`, but must not mark it `VERIFIED`.
2. Approval UI may validate/display a proposal but must not bypass the human approval gate.
3. No persistent versioned research record is created without human approval.
4. Master Dataset is not modified by the handoff itself.
5. Approved writes create a new immutable version and preserve `supersedes` relationships.
6. URL-fragment handoff must remain client-side; future transport changes must preserve the same security principle.

## Verification
Test proposal integrity, approval gate, dataset non-mutation, version creation, and supersession linkage.

## Update triggers
Update when the approval interface, transport mechanism, workflow, record schema, or human-approval gate changes.
