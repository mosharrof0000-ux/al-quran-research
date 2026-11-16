# Instruction — Release Gate 2 Safe Baseline & Recovery Report

## Purpose
Govern the dated Gate 2 report and preserve its evidence/limitations.

## Rules
1. Keep baseline commit SHAs, branch names, PR IDs, run IDs, job IDs, and observed outcomes exact.
2. Distinguish source-level root-cause evidence from proof of runtime timeout causality.
3. Treat empty workflow job lists as no job-step evidence; do not infer that provisioning or deployment occurred.
4. Do not activate D1, apply migrations, deploy Workers, or change secrets while documenting this report.
5. Do not merge schema variants. Require a table/column/query compatibility matrix and an approved canonical-schema decision first.
6. Keep the report status PARTIAL until every pending exit criterion is verified.
7. Update the Work Log, Project State, Backup Index, and Instruction Registry when material new evidence is added.
8. Any production deployment requires explicit owner approval and post-deployment live verification.

## Verification
Fetch the report from its exact branch/path after writing. A passing branch-local test does not prove production deployment or live acceptance.
