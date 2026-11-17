# Instruction — D1 Workflow Transition Guard Contract CI

## Identity
Path: .github/workflows/d1-workflow-transition-guard-contract.yml
Status: ACTIVE — pull-request and main source-contract verification

## Purpose
Run the Node.js source-contract test whenever the D1 transition guard or its test changes.

## Allowed
- Checkout source and run `node scripts/test-d1-workflow-transition-guard.mjs`.
- Use read-only repository permissions.

## Forbidden
- Dispatch or invoke the D1 provisioning workflow.
- Write secrets, database state, routes, or deployments.

## Verification
The D1 transition guard contract job must pass on the exact PR head.
