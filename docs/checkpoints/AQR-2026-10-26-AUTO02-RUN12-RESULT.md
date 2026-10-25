# AUTO-02 Run 12 — Result checkpoint

- Task ID: `AQR-2026-10-26-AUTO02-RUN12`.
- Timestamp: 2026-10-26 02:20 Asia/Dhaka.
- Project: Al-Quran Research only.
- Canonical repo: https://github.com/mosharrof0000-ux/al-quran-research
- Main SHA at fresh discovery: `db847a6db993ebe8245a431ac58267f02505b10d`.
- Existing PR #170: GitHub source now reports CLOSED/MERGED; merge commit is `db847a6db993ebe8245a431ac58267f02505b10d`. This run did not merge it.
- New PR: [#172](https://github.com/mosharrof0000-ux/al-quran-research/pull/172), OPEN/DRAFT, branch `test/chat-provider-provenance-20261026-r1`, base `main`.
- Branch head before this result-checkpoint commit: `6a2ba714c6ab86c119e50bc3f216d6bf00003eb3`. The exact tested implementation head before the workflow-concurrency and documentation commits was `e498a0fd5a65837b93d830a93d615dce9b9c2bb4`. Refresh PR metadata/check-runs after this checkpoint commit to establish the final head; do not infer exact-head success from the earlier code head.

## Completed safe work
1. Added `scripts/lib/chat-provider-provenance.mjs` and `scripts/test-chat-provider-provenance.mjs`. Eleven fixture cases distinguish Gemini, Cloudflare AI and recovery-model labels from `verified-project-data`, Research API fail-closed, local processing, unknown provider and empty answer.
2. Updated `scripts/test-live-runtime-smoke.mjs` to explicitly classify the deterministic verified-data answer as fallback and assert `modelGenerated=false`.
3. Added `scripts/test-d1-workflow-trigger-contract.mjs`, which verifies the D1 workflow's configured paths and unconditional deploy-job declaration without running the provisioning/deployment workflow.
4. Added read-only CI workflow `.github/workflows/research-runtime-safety-contract.yml` with `contents: read`, a 5-minute timeout, and same-ref concurrency cancellation.
5. Saved the detailed run record in `PROJECT_WORK_LOG.md`.

## Evidence
- Main SHA `db847a6db993ebe8245a431ac58267f02505b10d`: 9 current check runs were completed successfully. GitHub Pages deployment job [#121279331782](https://github.com/mosharrof0000-ux/al-quran-research/actions/runs/40229924492/job/121279331782) logged “Reported success!”; Worker build checks passed at [Project Agent](https://github.com/mosharrof0000-ux/al-quran-research/runs/121281459039) and [Research Worker](https://github.com/mosharrof0000-ux/al-quran-research/runs/121281380266).
- Live provider evidence: [main smoke job #40229925761](https://github.com/mosharrof0000-ux/al-quran-research/actions/runs/40229925761) sent a Bengali HTTP POST to the live Worker and received answer `২+২ = ৪।` with `provider=cloudflare-ai`. This proves a live response labeled Cloudflare AI; it does not prove Gemini specifically.
- Exact tested implementation head `e498a0fd5a65837b93d830a93d615dce9b9c2bb4`:
  - [Safety contract run #40230971660](https://github.com/mosharrof0000-ux/al-quran-research/actions/runs/40230971660): PASS, 11/11 provider cases plus D1 workflow static contract.
  - [Token Runtime #40230971429](https://github.com/mosharrof0000-ux/al-quran-research/actions/runs/40230971429): PASS, 14/14 token tests, 12/12 permission-route tests, 11 reference/bounds/context cases.
  - [Live runtime smoke #40230971554](https://github.com/mosharrof0000-ux/al-quran-research/actions/runs/40230971554): PASS, 5/5 Worker/API/ayah/Pages/deterministic Bengali chat checks; explicitly logs `verified-data-fallback; modelGenerated=false`.
  - Both Worker build checks passed on that same head.
- D1 workflow [run #40227836398](https://github.com/mosharrof0000-ux/al-quran-research/actions/runs/40227836398): FAILURE, zero jobs, head `c6e0fd2d269b39a677cfa3999b6078c7efc9b630`. PR #171 changed files did not match the D1 workflow's bounded paths; source has one unconditional deploy job. The historical zero-job cause remains UNPROVEN. No D1 workflow rerun or database side effect was attempted.
- Agent blocker: [job #121224089577](https://github.com/mosharrof0000-ux/al-quran-research/actions/runs/40211694743/job/121224089577) logs show `AGENT_URL` and `AGENT_ACCESS_TOKEN` empty and exit code 1 before agent contact. Workflow source maps these to repository Actions secrets `MOSHARROF_AGENT_URL` and `AGENT_ACCESS_TOKEN`. Admin must configure the intended authorized endpoint and bearer token; this run did not read or change secret values.

## Stage ledger
- DISCOVER: PASS
- DIAGNOSE: PARTIAL — agent configuration blocker proven; D1 zero-job root cause remains unproven.
- PLAN: PASS
- CHANGE: PASS — isolated PR #172 only.
- FOCUSED_TEST: PASS on code head `e498a0fd5a65837b93d830a93d615dce9b9c2bb4`.
- FULL_REQUIRED_CHECKS: PENDING until current final PR head checks are refreshed.
- ARTIFACT_REVIEW: PASS for the cited logs and check runs.
- ACCEPTANCE_VERIFY: PARTIAL — live Cloudflare AI response PASS; deterministic fallback PASS; live D1, full browser/UI, and Gemini-specific invocation NOT TESTED.
- CHECKPOINT/REPORT: PENDING final-head reconciliation.

## Safety / rollback
- This run did not write to main, merge PRs, provision/migrate D1, change secrets, or deploy production.
- Keep PR #172 Draft until exact final-head checks and review pass. If a new check fails, change only the isolated branch; do not weaken tests or touch the D1 provisioning workflow.
