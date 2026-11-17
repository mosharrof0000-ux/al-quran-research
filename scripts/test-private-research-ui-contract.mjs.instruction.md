# Instruction — Private Research UI Access-State Test

## Identity
Path: scripts/test-private-research-ui-contract.mjs
Status: ACTIVE — source-state and unlock-message regression test

## Purpose
Verify that uninstalled sources cannot be unlocked, session success requires a valid short-lived Bearer token, the UI does not falsely claim Chat retrieval is active, and the PIN field matches the backend input contract.

## Allowed
- Read the loader and HTML source.
- Execute the loader's patch function against a synthetic core fixture.

## Forbidden
- Call production endpoints, read private source content, or persist bearer tokens/secrets.
- Claim real browser/Android acceptance from this static contract test.

## Verification
Run `node scripts/test-private-research-ui-contract.mjs`.
