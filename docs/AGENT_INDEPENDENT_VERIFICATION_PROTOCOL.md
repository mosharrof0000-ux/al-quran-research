# Agent Independent Verification Protocol v1

## Purpose
Primary-agent completion must not be trusted as final validation. A fresh read-only verification pass independently checks the isolated task before HANDOFF_COMPLETE.

## Verification sequence
1. Require an agent/* branch.
2. Inspect main...agent/* changed files through GitHub.
3. Fail if protected paths/files were touched.
4. Confirm the task journal exists on the same isolated branch.
5. Send the evidence and primary answer to a fresh verifier model context.
6. The verifier returns VERIFIED, FAILED, or REQUIRES_REVIEW.
7. Only VERIFIED may become HANDOFF_COMPLETE.
8. FAILED or REQUIRES_REVIEW becomes READY_FOR_REVIEW; no success notification is appropriate.
9. Merge and production deployment remain prohibited at this stage.

## Independence boundary
The verifier has no project-write tool access and does not reuse the primary agent's conversation/tool history. It evaluates a fresh evidence package gathered directly from GitHub and the task journal.

## Safety
Protected-path violations override the model result and force FAILED. Missing task state forces REQUIRES_REVIEW. Runtime E2E and production activation remain separate gates.