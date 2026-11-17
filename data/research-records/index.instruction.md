# Instruction — Versioned Research Memory Index

## Identity
Path: data/research-records/index.json
Version: 1
Status: ACTIVE — manifest for approved versioned records

## Purpose
Provide a small, public, non-sensitive manifest so the Worker can discover versioned research records without hard-coding a file list.

## Schema
- schema_version: integer, currently 1
- records: array of immutable record references
- each entry contains file, record_id, version, status, ayah_id, updated_at

## Allowed
- Add a new entry only when the corresponding record is created by the human-approved research-record workflow.
- Preserve every historical version entry.
- Keep the manifest free of private source text and secrets.

## Forbidden
- Removing old record entries during ordinary updates.
- Pointing to a missing or unvalidated record file.
- Treating index metadata as proof that a record is VERIFIED.
- Adding private-source documents or personal data.

## Verification
Each entry must match the target record's record_id, version, and scope. The referenced file must exist. Status must match the record. The Worker validates these fields again before using a record.

## Change history
- 2026-11-17 — Created as the versioned research-memory manifest.
