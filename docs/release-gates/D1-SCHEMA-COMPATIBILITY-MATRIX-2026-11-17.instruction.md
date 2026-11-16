# Instruction — D1 Schema Compatibility Matrix

## Purpose
Govern the read-only comparison of the project's parallel schema definitions and D1 migration/API contract.

## Rules
1. Never edit or delete either schema based only on this report.
2. Preserve exact table/column names from inspected SQL/API sources.
3. Distinguish structural equivalence from conceptual similarity.
4. Do not run migrations or create/alter a D1 database while preparing a compatibility report.
5. Require an explicit canonical-schema decision and versioned entity/column mapping before migration work.
6. Validate migration sequences against a disposable test database before any remote operation.
7. Keep production D1 activation behind explicit owner approval.
8. Update the matrix when schema, migration, or API query code changes.

## Verification
Fetch the exact SQL/API files and confirm the report's table and column inventory. A static matrix does not prove a live database matches the expected schema.
