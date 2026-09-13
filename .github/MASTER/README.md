# .github Folder Master

## Purpose
GitHub platform configuration, automation, and repository-level CI/CD support.

## Rules
- Do not move, rename, or delete workflow assets without dependency verification.
- Automation must not bypass project governance or promotion gates.
- Live-entrypoint synchronization remains governed by `.github/workflows/live-entrypoint-sync.yml`.
- This folder cannot override root `MASTER_INSTRUCTION.md`.

## File Map
- `workflows/` — GitHub Actions automation.
- `MASTER/` — local folder governance record.

## Status
Governed; inventory verified on 2026-09-13.
