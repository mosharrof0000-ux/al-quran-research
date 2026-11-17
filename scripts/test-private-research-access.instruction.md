# Instruction — Private Research Access Tests

## Identity
Path: scripts/test-private-research-access.mjs
Status: ACTIVE — contract tests

## Purpose
Verify the fail-closed behavior of the Private Research access-control module.

## Scope
Tests metadata visibility, missing-secret behavior, invalid PIN, uninstalled source denial, signed token validity/tampering/source binding, missing bearer session, unsupported method, and CORS Authorization support.

## Allowed
- Use test-only PIN/session secrets.
- Mock Worker requests and responses.
- Assert that no private content is returned while the source remains uninstalled.

## Forbidden
- Use production secrets or real private source material.
- Mark a source installed or test against production content.
- Print PINs, session tokens, or private source text.

## Verification
Run with Node.js 20+: node scripts/test-private-research-access.mjs

## Change history
- 2026-11-17 — Created with Private Research session hardening.
