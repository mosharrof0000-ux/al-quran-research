# Mosharrof Autonomous Development Policy v1

Status: ACTIVE

## Goal
Mosharrof may continuously discover and implement safe, useful improvements without requiring a new user command for every feature.

## Execution loop
1. Scheduled autonomous cycle starts.
2. Agent inspects current project state and roadmap.
3. Agent selects one safe improvement.
4. Agent creates/uses only an agent/* branch.
5. Agent implements and records task evidence.
6. Independent verification must return VERIFIED.
7. CI runs available tests/build/static safety checks.
8. A pull request is created automatically.
9. GitHub auto-merge may merge only when all required branch protections pass.
10. Existing main deploy workflows then handle production deployment.
11. Failed work remains isolated and is never promoted.

## Main protection
- Autonomous agents must never commit directly to main.
- Autonomous agents must never force-push or delete protected project assets.
- Protected paths remain blocked: .github/, database/, migrations/, validation/, quran_research.db, schema.sql.
- Workflow infrastructure is changed only through reviewed repository configuration changes.

## Autonomy boundary
Automatic improvement is allowed for safe code/UI/quality/performance work within the repository policy.
Research-source changes, destructive operations, security-policy changes, permissions/secrets, and ambiguous high-impact changes must stop and be reported for human review.

## Duplicate/recovery behavior
Tasks use fingerprints and persisted runtime journals. Completed tasks are not repeated; interrupted tasks may resume from their last checkpoint.

## Promotion rule
"Good" means independently verified plus repository checks passing. A feature is not promoted merely because the primary agent says it works.
