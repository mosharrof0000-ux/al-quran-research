# Instruction — Release Gate 1 Repository Audit

## Purpose
Govern `GATE-01-REPOSITORY-AUDIT-2026-11-17.md`, the evidence record for the Al-Quran Research Release Gate 1 repository audit.

## Rules
1. Treat this report as a dated snapshot, not as a live status feed.
2. Preserve exact commit SHAs, PR state, workflow run/job IDs, test outcomes, and known limitations.
3. Distinguish source/static inspection from CI, live API, browser, and physical-device verification.
4. Never label an item verified unless the report names observable evidence.
5. Do not infer root causes from symptoms. Mark unknown causes as NOT PROVEN.
6. Do not convert an open PR into an approved or merged change; merge and production deployment require explicit owner approval.
7. When evidence changes, append a dated addendum or create a new versioned report; do not silently rewrite historical findings.
8. Update the Project Work Log, Project State, Backup Index, and Instruction Registry whenever this report is formally adopted into the active project record.
9. Keep research source data, locked design files, secrets, and production settings out of scope unless separately authorized.
10. Keep future AI provider plugins/connectors deferred until common core, tool execution, and presentation contracts are stable.

## Verification
A report edit must be checked by fetching the exact branch/path after writing and confirming its content and commit reference. A documentation-only report does not establish runtime or release-gate completion.
