# Instruction — Private Research UI Contract Workflow

## Identity
Path: .github/workflows/private-research-ui-contract.yml
Status: ACTIVE — read-only UI source-state CI

## Purpose
Run the focused Node.js contract test whenever the Private Research UI loader, PIN field or contract test changes.

## Allowed
- Checkout source with read-only contents permission.
- Run `node scripts/test-private-research-ui-contract.mjs`.

## Forbidden
- Dispatch Worker workflows, install private source content, access production secrets, or perform deployments.

## Verification
The `private-research-ui` job must pass on the exact PR head.
