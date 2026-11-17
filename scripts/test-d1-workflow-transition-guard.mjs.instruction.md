# Instruction — D1 Workflow Transition Guard Test

## Identity
Path: scripts/test-d1-workflow-transition-guard.mjs
Status: ACTIVE — static source-contract test

## Purpose
Verify that the transition guard is restricted to main pushes, requests actions:write, compares exact commit-parent file changes, and targets only the intended D1 workflow ID for disable/re-enable operations.

## Allowed
- Read the workflow file and assert source invariants.

## Forbidden
- Call GitHub APIs, dispatch workflows, or modify repository/production state from the test.

## Verification
Run `node scripts/test-d1-workflow-transition-guard.mjs`.
