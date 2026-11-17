# Instruction — Research Record Save-Gate Tests

## Identity
Path: scripts/test-research-record-gate.py
Status: ACTIVE — save proposal, approval workflow, and versioned manifest contract tests

## Purpose
Verify that AI research results remain proposals until a separate human approval action, that the master Quran dataset is protected, and that versioned records are discoverable through the manifest.

## Scope
- Confirm proposals begin as PENDING_REVIEW and require the no-master-overwrite save policy.
- Confirm version and supersedes metadata are preserved.
- Verify the manifest contains the expected record identity/version/status.
- Verify the manual approval workflow requires canonical ayah scope, matching source-reference scope, safe repository paths, VERIFIED same-scope prior records, and non-empty PENDING_REVIEW findings.
- Verify human approval writes a new immutable record and updates the index without changing the master dataset.

## Allowed
- Read project fixtures and workflow source.
- Use synthetic test proposals.
- Assert workflow source-contract invariants.

## Forbidden
- Dispatch the approval workflow.
- Write to main or alter research records during tests.
- Promote PENDING_REVIEW or DISPUTED data without explicit human approval.
- Modify the master Quran dataset.

## Verification
Run with Python 3: `python3 scripts/test-research-record-gate.py`.

## Change history
- 2026-09-20 — Initial save-gate contract test.
- 2026-11-17 — Extended for versioned manifest and strict approval provenance validation.
