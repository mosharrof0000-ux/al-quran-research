# Workflows Folder Master

## Purpose
Central record for GitHub Actions workflows that test, validate, deploy, back up, and synchronize the project.

## Rules
- Preserve existing workflow paths unless dependency verification and approved change exist.
- `live-entrypoint-sync.yml` is the canonical automatic writer for live-entrypoint integrations.
- Legacy/duplicate writers are not to be promoted without review.
- Workflow changes must pass the project's verification and promotion gates.

## File Map
All `.yml`/`.yaml` workflows in this directory are governed here; their individual instruction files remain authoritative for their own scope where present.

## Status
Governed; inventory verified on 2026-09-13.
