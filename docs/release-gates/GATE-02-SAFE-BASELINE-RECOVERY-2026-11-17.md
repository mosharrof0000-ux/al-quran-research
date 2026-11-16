# Release Gate 2 — Safe Baseline & Recovery

**Project:** Al-Quran Research  
**Audit date:** 2026-11-17  
**Baseline:** PR #187 head `65d0b412c028569b4f9e5226d7528c40019ae20d`  
**Working branch:** `fix/gate2-deterministic-chat-route-20261117`  
**Implementation PR:** https://github.com/mosharrof0000-ux/al-quran-research/pull/189  
**Status:** PARTIAL — deterministic route repair and regression CI passed; D1/schema and production verification remain open.

## 1. Safety baseline

- Main baseline used for Gate 1 documentation: `0c3520305b43bda0b9dc862561c9081285ded310`.
- Gate 2 repair starts from the exact PR #187 head above, preserving its local-first UI changes without editing that branch directly.
- Working branch is isolated. No main ref was moved.
- No research dataset, database, secret, production configuration, or locked design asset was changed.
- No PR was merged and no production deployment was initiated by an authorized deployment action.

## 2. Bengali chat timeout — code-level cause

The Live Runtime Smoke script posts this prompt:

`সূরা ফাতিহা ১ নম্বর আয়াতের প্রতিটি শব্দের মূল ধাতু ও ব্যাকরণ বিশ্লেষণ দিন`

It expects `provider=verified-project-data` and an answer containing the verified Fatiha 1:1 Arabic fixture and Bengali word-analysis fields.

Source inspection established:
1. `backend/worker.js` already contains a deterministic branch: `isFatiha1(message) && wantsWordAnalysis(message)`.
2. `backend/worker-entry.js` previously called `directGemini()` before `worker.fetch()`.
3. `directGemini()` loads research context, project context and research memory, and may call Gemini.
4. Therefore the request could enter the AI Brain/context/Gemini path before reaching the deterministic branch. This contradicts the smoke-test comment that says the prompt avoids model-provider calls.

This is the verified routing defect. The historical live timeout's exact runtime timing contribution is not fully proven, but the wrong dispatch precedence is directly established by source.

## 3. Repair implemented

On the isolated branch:
- Added a narrow predicate for the existing Fatiha 1:1 word-analysis request.
- Matching requests skip `directGemini()` and proceed to the existing `worker.js` handler.
- Unrelated prompts keep the existing AI Brain/Gemini route.
- Added `scripts/test-deterministic-chat-routing.mjs` and a colocated instruction.
- Added the regression to the existing pull-request Token Runtime workflow.
- Updated Worker Entry instructions and Instruction Registry.
- Recorded Gate 2 status, work log and safe point.

No new research answer or dataset record was invented; the existing verified-project-data handler is reused.

## 4. Regression evidence

**Latest verified head:** `e6212896fc0b58761e4e74e191a23cb6542ab77d`  
**PR:** #189, open, not merged, stacked on PR #187.  
**CI run:** #43982569635  
**Job:** #133702482836 — `token-runtime` — SUCCESS.

Log confirms:
- 14/14 Token Runtime tests passed.
- 12/12 Permission Route tests passed.
- Research Context Routing test passed.
- Provider Routing test passed.
- D1 Workflow Contract test passed.
- New deterministic Bengali chat route test passed:
  - expected prompt recognized;
  - provider `verified-project-data`;
  - verified Arabic fixture and Bengali pronunciation fields present;
  - zero outbound fetches despite a fake Gemini key being present.

This is branch-local CI evidence. It is not a production Worker or browser/device test.

## 5. D1 and schema findings

### 5.1 Active D1 binding
- `backend/wrangler.jsonc` has no active `d1_databases` binding; the D1 binding remains commented as a future activation.
- Live Research API status reported `storage=github-json-fallback`.
- Therefore D1 is not confirmed as the live source of truth.

### 5.2 Schema divergence
- Root `schema.sql`: 303 lines and a separate older master schema (e.g. `lemma`, `grammar_annotation`, `translation_edition`, `research_claim`, `metric_definition`).
- `database/schema.sql`: 55 lines, a different normalized schema (e.g. `lexeme`, `token_lexeme`, `pronunciation`, `source_version`, `research_question`, `claim_evidence`).
- `migrations/001_core_schema.sql` explicitly says it replays `database/schema.sql`.
- `migrations/002_workspace_versioning.sql` adds workspace/versioning structures.
- `migrations/003_api_hardening.sql` adds `dataset_release` and `api_schema_version`.
- The current `backend/research-api.js` queries the newer `database/schema.sql` family plus migration 003 tables.

**Conclusion:** the migration/API path is internally aligned around `database/schema.sql` plus migrations 001–003, while root `schema.sql` remains a parallel/older schema. Do not merge the two or run migrations against production until an explicit canonical-schema decision and compatibility review are recorded.

### 5.3 D1 workflow metadata anomaly
Workflow `.github/workflows/d1-provision-deploy.yml` declares push branches limited to `main`, yet recent workflow-run metadata lists `event=push` and `head_branch=fix/gate2-deterministic-chat-route-20261117` for runs #43982415632, #43982557537, #43982558903 and #43982564056.
- The jobs endpoint returned an empty jobs array for run #43982564056.
- No job steps ran in that observed run; no D1 create, migration, Worker deploy, or Project Agent deploy is evidenced by it.
- The exact reason for the branch/event metadata and zero-job result is NOT PROVEN.
- No rerun or manual dispatch was performed.

Do not claim that D1 was provisioned or that a deployment occurred from these zero-job runs.

## 6. Gate 2 exit criteria

| Criterion | Result |
|---|---|
| Exact pre-change source baseline identified | PASS |
| Isolated recovery branch created | PASS |
| Bengali chat routing defect identified from source | PASS |
| Narrow deterministic-route fix implemented | PASS |
| Branch-local regression test and CI pass | PASS |
| D1 schema canonicalization decision | PENDING |
| D1 workflow zero-job/event anomaly root cause | PENDING |
| Production Worker/live Bengali round-trip | PENDING — deployment not authorized |
| Full browser/device acceptance | PENDING |
| Owner review and promotion | PENDING |

**Gate 2 is not complete.** The deterministic routing repair is implemented and regression-tested on an isolated branch. D1 schema reconciliation, the workflow metadata anomaly, and production/live verification remain blockers.

## 7. Next work

1. Complete a read-only D1 workflow/event investigation and identify why feature-branch push metadata creates failed zero-job runs.
2. Produce a schema compatibility matrix for root `schema.sql`, `database/schema.sql`, migrations 001–003, and all live API queries.
3. Recommend a canonical schema and safe migration/compatibility plan without applying it.
4. Preserve PR #187 and PR #189 as separate reviewable changes; do not merge automatically.
5. After explicit owner approval for merge/deployment, deploy the Worker fix and rerun the live Bengali chat smoke test.
6. Complete real browser/device acceptance only after the live route passes.

---
*This report distinguishes source inspection, CI regression, live API observations, and production acceptance. No production deployment is claimed.*
