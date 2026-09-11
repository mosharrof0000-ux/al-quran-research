# Automation Instruction Audit — 2026-09-11

## Status
VERIFIED — controlled live-entrypoint consolidation completed.

## Scope
Audited and then consolidated the repository workflows that could mutate the protected GitHub Pages `index.html` entrypoint.

## Pre-change finding
Four workflows could independently write the live entrypoint:
- `connect-tafsir-library.yml`
- `connect-tafsir-library-now.yml`
- `set-site-favicon.yml`
- `install-chat-system.yml`

The two Tafsir workflows had overlapping insertion logic and the chat installer had a broad `push` trigger.

## Approved remediation
A pre-change restore branch was created from the known main commit:
- Branch: `backup/pre-live-entrypoint-consolidation-2026-09-11`
- Pre-change commit: `35249656450757813964b2fd83287edf0551ee49`

### Canonical writer
Created:
- `.github/workflows/live-entrypoint-sync.yml`

The canonical workflow is now the single automatic writer for the live entrypoint integrations. It handles, with idempotent checks:
1. Tafsir Library button insertion.
2. Favicon file/link synchronization.
3. Chat-system script-tag normalization.

It uses a concurrency group so multiple live-entrypoint sync runs do not intentionally overlap.

### Legacy workflows retained, but no longer write
The existing files were preserved in their original paths and converted to read-only manual notice workflows:
- `connect-tafsir-library.yml`
- `connect-tafsir-library-now.yml`
- `set-site-favicon.yml`
- `install-chat-system.yml`

They now use `workflow_dispatch`, `contents: read`, and only report that the canonical workflow replaced their write behavior.

## Safety result
- No workflow file was deleted.
- No workflow file was renamed or moved.
- Existing filenames and paths were preserved.
- `index.html` was not manually replaced during this consolidation.
- `backup-main.yml` remains intact as the automatic backup mechanism.
- Backend deployment, research-record approval, smoke tests, and link-integrity workflows were not changed.

## Current automation model
`main push / approved workflow event`
→ `live-entrypoint-sync.yml`
→ `index.html` / `favicon.svg` integration checks
→ minimal commit only when needed
→ GitHub Pages continues using the existing public path.

## Verification performed
- Canonical workflow fetched after creation and SHA recorded.
- All four former live-entrypoint writers fetched after modification and confirmed as legacy/read-only.
- Pre-change backup branch exists at the recorded commit.
- Existing `index.html` remains present and its current content was inspected before consolidation.

## Evidence
Canonical workflow:
- `.github/workflows/live-entrypoint-sync.yml`
- SHA: `3259b5ca515b996b4b9ceb5ef5b4d644f1e88414`

Legacy workflow SHAs after consolidation:
- `connect-tafsir-library.yml`: `000c0f5a3e94412978d4519947fb1cd368b824cf`
- `connect-tafsir-library-now.yml`: `4f773e9ae13043c08b7c394ca3db4d7ac33609d4`
- `set-site-favicon.yml`: `bdeeaf596def85905a15b5d630ffd2b88f195143`
- `install-chat-system.yml`: `fab30ae22fbcc48952247f52040dbfef64919a09`

## Final decision
The repository now has **one canonical automatic live-entrypoint writer**. The previous writers remain preserved as historical/manual workflow files, but they no longer have repository write permission or automatic push triggers.

This is controlled consolidation, not destructive cleanup.
