# Instruction — Research Memory Retrieval Tests

## Identity
Path: scripts/test-research-memory.mjs
Status: ACTIVE — read-only retrieval contract tests

## Purpose
Verify index-driven discovery and safe reuse of versioned research records.

## Scope
Tests no-fetch behavior for ordinary chat, manifest-based record discovery, scope filtering, status preservation, path allow-listing, and fail-closed handling of invalid manifests.

## Allowed
- Use synthetic fixtures and mock fetch.
- Verify only public, non-sensitive research record metadata and content fixtures.

## Forbidden
- Use private source text or production secrets.
- Modify repository data during tests.
- Convert PENDING_REVIEW or DISPUTED fixtures into VERIFIED.

## Verification
Run with Node.js 22: node scripts/test-research-memory.mjs

## Change history
- 2026-11-17 — Created with dynamic versioned memory retrieval.
