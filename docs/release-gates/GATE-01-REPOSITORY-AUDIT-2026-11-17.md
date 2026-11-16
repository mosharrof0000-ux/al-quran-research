# Release Gate 1 — Repository-Level Audit

**Project:** Al-Quran Research  
**Repository:** `mosharrof0000-ux/al-quran-research`  
**Audit date:** 2026-11-17  
**Audit type:** Read-only repository, architecture, data, workflow, and CI review  
**Baseline branch:** `main`  
**Baseline commit:** `0c3520305b43bda0b9dc862561c9081285ded310`  
**Working branch:** `audit/gate-1-repository-baseline-20261117`  
**Status:** AUDIT RECORDED — formal Gate 1 closure requires governance-log synchronization and owner review.

## 1. Scope and method

Reviewed the repository tree and the principal application, chat, tool, backend, schema, dataset, governance, and workflow files. Rechecked PR #187 metadata, its patch, workflow runs, and the failed Live Runtime Smoke job log. No production file, database, secret, deployment, or live setting was changed during the audit.

## 2. Repository inventory

At the audited baseline:
- 440 tracked repository files.
- 41 instruction files.
- 142 documentation files.
- Multiple overlapping UI/chat paths exist: `index.html`, `chat.html`, `chat-system.js`, `chatbox-v28-live.html`, `ui/chat-v1/`, and `ui/home-v1/`.

These counts describe the inspected repository tree, not runtime feature completeness.

## 3. Architecture findings

### 3.1 Application entry and UI
- `index.html` loads `ui/home-v1/home-v1.html` through an iframe.
- `ui/home-v1/home-v1.js` is a loader that retrieves a core script. Before PR #187, the main path depended on a pinned external CDN resource.
- The parent document and iframe have separate DOM scopes. Static inspection did not establish that the legacy `chat-system.js` selectors and event wiring are correctly connected to the active iframe chat UI.
- The project has more than one UI/chat implementation path; there is no single proven canonical Chatbot Shell across all routes.
- No real browser/device end-to-end verification was performed as part of this audit.

### 3.2 Chat and tools
- `chat-system.js` contains general, word, ayah, math, concordance, and translation modes, voice input/output hooks, retry/local fallback, memory hooks, and tool registration.
- `tool-engine.js` contains registry/discovery/find/execute foundations. A registered tool without a real handler can still appear registered; complete handler coverage and real execution were not demonstrated.
- Shared presentation behavior is not yet established as a complete machine-readable Presentation Contract used by all render paths.
- Provider integration is not yet provider-neutral across ChatGPT, Gemini, Claude, Grok, and Copilot. Existing Gemini/Cloudflare paths do not prove a universal adapter layer.

### 3.3 Backend and data
- Research API v1.1 is present. The latest PR smoke output reports `storage=github-json-fallback`; D1 is therefore not confirmed as the active source of truth by that test.
- `schema.sql` and `database/schema.sql` differ and need a controlled schema reconciliation before claiming one canonical durable database schema.
- Pilot dataset `data/fatiha-master-v1.json` identifies itself as `2026-09-04-fatiha-master-v1`, status PILOT, and contains Al-Fatiha (7 ayat).
- The 7 Arabic ayah source texts are marked verified in the pilot dataset; detailed word analysis is verified only for ayah 1, while ayahs 2–7 remain pending.
- Do not treat the pilot as a complete Quran corpus or complete word/root/morphology research dataset.

### 3.4 Governance and automation
- The repository has Master Project, Project State, continuity protocol, work log, backup index, instruction registry, and live connection documentation.
- The documented canonical live path is stale relative to the current `index.html` iframe entry, so the connection map requires an evidence-based update.
- Some critical implementation files do not yet have a clearly colocated instruction/registry mapping; coverage needs a file-by-file audit.
- A recent Autonomous Development Loop run lacked `AGENT_URL` and `AGENT_ACCESS_TOKEN`; that run could not operate without those configured inputs.
- A recent D1 provision/deploy workflow ended in failure; its root cause was not established in this audit and must not be guessed.

## 4. PR #187 — current verified state

PR: https://github.com/mosharrof0000-ux/al-quran-research/pull/187  
Title: `Fix Quran home startup and reconnect inactive controls`  
Head branch: `fix/restore-home-buttons-local-core-20261117`  
Head commit: `65d0b412c028569b4f9e5226d7528c40019ae20d`  
Base commit: `0c3520305b43bda0b9dc862561c9081285ded310`  
Current metadata at audit time: OPEN, not merged, mergeable=true.

The PR proposes:
- Same-origin vendored home core with pinned CDN fallback.
- A visible error notice if both core sources fail.
- Cache/service-worker updates and local-core precache.
- Drawer shortcut and font customizer wiring.
- An honest notice for a file tool without upload implementation.

### CI evidence
The PR-triggered Live Runtime Smoke job checked:
- Worker health — PASS.
- Research API status — PASS, but storage reported `github-json-fallback`.
- Fatiha 1:1 — PASS, source `master-dataset`.
- GitHub Pages HTTP 200 — PASS.
- Verified Bengali chat round-trip — FAIL after 3 bounded attempts; operation aborted due to timeout.

The failing job log identifies:
`scripts/test-live-runtime-smoke.mjs:25` (`fetchBounded`) and line 70 (chat round-trip request).

The PR-triggered Mosharrof Token Runtime workflow completed successfully. That does not override the failing Live Runtime Smoke check.

**Decision:** PR #187 is not release-ready. Do not merge until the Bengali chat timeout is root-caused, fixed, and the same end-to-end check passes. No merge or deployment was performed.

## 5. Risk register

| ID | Finding | Severity | Required response |
|---|---|---|---|
| AQR-A01 | Multiple UI/chat entry paths; canonical route not fully unified | High | Trace runtime route and define one canonical shell |
| AQR-A02 | Parent/iframe chat integration not proven | High | Browser-level DOM/event/round-trip verification |
| AQR-A03 | Bengali chat round-trip times out in PR #187 CI | Blocker | Trace Worker/provider/request path and retest |
| AQR-A04 | Research API reports GitHub JSON fallback, not confirmed D1 source | High | Verify D1 binding, migrations, reads/writes and fallback behavior |
| AQR-A05 | Two schema files differ | High | Diff and approve canonical schema/migration plan |
| AQR-A06 | Tool registration does not prove real handler execution | High | Inventory handlers and execute contract tests |
| AQR-A07 | Shared presentation contract is incomplete/unproven | Medium | Define reusable schema and renderer contract |
| AQR-A08 | AI provider adapter layer is incomplete | Medium | Design provider-neutral request/response/tool contract |
| AQR-A09 | Live Connection Map describes an older route | Medium | Update only after runtime route is verified |
| AQR-A10 | Workflow configuration gaps and D1 workflow failure remain | Medium | Inspect exact failed jobs and required repository variables |

## 6. Preserve / repair / defer

**Preserve**
- Existing research evidence and provenance rules.
- Raw-data immutability and versioned correction policy.
- Research API v1.1 and current pilot data; do not overwrite research records.
- Locked design assets and historical backups.

**Repair before feature expansion**
- Chat startup and live Bengali chat timeout.
- Local-first core loading and CDN independence.
- Canonical UI/iframe/chat event path.
- Real tool-handler execution.
- D1/schema truth and deployment evidence.
- Governance registry and live connection map consistency.

**Defer**
- Implementing external AI plugins/connectors until the common core and tool/presentation contracts are stable.
- Full 114-surah corpus population until source and validation pipelines are established.

## 7. Gate 1 exit criteria

| Exit criterion | Result |
|---|---|
| Repository and primary modules inventoried | PASS |
| Current UI/chat/API/data paths identified | PASS |
| Existing vs incomplete vs blocked items classified | PASS |
| PR #187 and current CI failure inspected | PASS |
| Findings recorded in this audit artifact | PASS |
| Project State / Work Log / Backup Index / Registry synchronized | PENDING |
| Owner review of formal Gate 1 closure | PENDING |

**Gate 1 is not marked formally complete until the governance records are synchronized and the closure is reviewed.** This avoids treating an audit report alone as full release-gate completion.

## 8. Recommended next gate

**Gate 2 — Safe Baseline & Recovery**
1. Establish a verifiable pre-change restore point and record it in the backup index.
2. Trace PR #187 Bengali chat timeout from browser/UI through Worker, Research API, provider, and response parsing.
3. Establish a reproducible local-first core recovery path.
4. Preserve existing known-good routes and locked assets.
5. Reconcile schema and D1 configuration without changing production data.
6. Verify rollback and recovery procedures.
7. Keep merge, deployment, and production publication behind explicit owner approval.

---
*This report records observable repository and CI evidence. It does not claim browser/device verification, production D1 confirmation, full tool execution coverage, or release readiness.*
