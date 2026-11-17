# Instruction — D1 Workflow Transition Guard

## Identity
Path: .github/workflows/d1-workflow-transition-guard.yml
Status: ACTIVE — controlled legacy-to-manual workflow transition

## Purpose
Prevent the legacy D1 push-triggered deployment from running while its workflow is replaced with a manual-only release gate.

## Contract
- Trigger only on main pushes that change this guard file or the D1 workflow file.
- Compare the pushed commit with its parent using `git diff --name-only HEAD^ HEAD`.
- When this guard is first installed/changed, disable legacy workflow ID 365243636.
- When the D1 deployment workflow file is changed, re-enable workflow ID 365243636 after the manual-only replacement is present.
- Use the repository-scoped GITHUB_TOKEN with actions:write; never expose token values.

## Forbidden
- Dispatch the D1 workflow.
- Provision D1, run migrations, deploy Workers, or change routes/secrets.
- Use event-payload path projections as the sole change detector; the previous implementation skipped both actions.

## Verification
Inspect the exact push run and confirm the expected log line: `Legacy D1 workflow disabled.` or `Manual-only D1 workflow enabled after replacement.`.
