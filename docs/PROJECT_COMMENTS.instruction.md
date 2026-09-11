# Instruction — docs/PROJECT_COMMENTS.md

- ID: INST-PROJECT-COMMENTS
- Class: B — Important decision register
- Status: ACTIVE

## Purpose
Record audit findings, proposals, owner decisions, and implementation status without confusing suggestions with approval.

## Rules
1. AI proposals are not approvals.
2. Use explicit decision states such as `গ্রহণ`, `পরে`, `না`, or `পর্যালোচনা প্রয়োজন` when applicable.
3. Missing comments do not mean approval.
4. Completed claims must point to evidence when practical.
5. Proposed destructive cleanup must remain a proposal until explicitly approved.
6. Do not silently convert a proposal into implementation status.

## Safety
Approved changes still require backup, testing, and verification under project governance.

## Related
`MASTER_INSTRUCTION.md`, `PROJECT_WORK_LOG.instruction.md`, `PROJECT_STATE.instruction.md`, `INSTRUCTION_AUDIT_PROTOCOL.md`.
