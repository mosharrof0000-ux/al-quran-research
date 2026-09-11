# Automation Instruction Audit — 2026-09-11

## Status
VERIFIED — audit mapping completed. No workflow was deleted, disabled, renamed, or rewritten.

## Scope
Audited the repository workflows that were identified as relevant to live UI, backend deployment, research-record approval, backup, and CI verification.

## Findings

| Workflow | Write permission | Writes repo files | Risk | Decision |
|---|---|---|---|---|
| `connect-tafsir-library.yml` | `contents: write` | `index.html` | HIGH — live entrypoint writer | Preserve; redesign/retire only after approved replacement |
| `connect-tafsir-library-now.yml` | `contents: write` | `index.html` | HIGH — overlapping live entrypoint writer | Preserve for now; overlap requires controlled remediation |
| `set-site-favicon.yml` | `contents: write` | `favicon.svg`, `index.html` | HIGH — live entrypoint writer | Preserve; review for PR/manual model |
| `install-chat-system.yml` | `contents: write` | `index.html` | HIGH — live entrypoint writer on every main push | Preserve; highest-priority remediation candidate |
| `research-record-approval.yml` | `contents: write` | `data/research-records/*.json` | CONTROLLED — human APPROVE gate | Preserve; research governance workflow |
| `backup-main.yml` | `contents: write` | backup branches | CONTROLLED/POSITIVE — rollback support | Preserve |
| `deploy-worker.yml` | `contents: read` | no repo write; deploys Worker | PRODUCTION DEPLOYMENT | Preserve; secrets isolated in GitHub Actions |
| `chat-smoke-test.yml` | default/read behavior | no repo write | LOW | Preserve |
| `link-integrity.yml` | `contents: read` | no repo write | LOW | Preserve |
| `test-research-record-gate.yml` | `contents: read` | no repo write | LOW | Preserve |

## Confirmed live-entrypoint duplication
Three independently identified workflows write `index.html` for narrow purposes, while `install-chat-system.yml` also writes `index.html` on main pushes. The two Tafsir workflows implement materially overlapping insertion logic and use the same marker `id="tafsir-library-link"`.

This creates a concurrency/drift risk because more than one automation path can mutate the same protected production entrypoint.

## Recommended controlled remediation
1. Do **not** delete or disable any workflow yet.
2. Establish one canonical mechanism for production `index.html` changes.
3. Prefer a PR/review-based or explicitly approved automation model for live-entrypoint modifications.
4. Convert duplicate Tafsir automation into a single canonical path only after comparing history and confirming no unique behavior is lost.
5. Review `install-chat-system.yml` trigger scope before allowing broad automatic mutation of `index.html`.
6. Keep `backup-main.yml` as the rollback safety layer.
7. After any approved change: backup/safe point → minimal diff → syntax/test → live path verification → work-log entry.

## Protected assets
- GitHub Pages entrypoint: `index.html`
- Live project path: `https://mosharrof0000-ux.github.io/al-quran-research/`
- Active backend deployment: `backend/**` → Cloudflare Worker
- Research approval records: `data/research-records/`
- Backup branches produced by `backup-main.yml`

## Evidence SHAs
- `connect-tafsir-library.yml`: `d7ae1800cf189b582f005ae7b7b0e4192e5e222c`
- `connect-tafsir-library-now.yml`: `87c1df24201bd24f45375235b4fe7c51463fca00`
- `set-site-favicon.yml`: `cf607bad20342405dcb440eaa161e04b5291145b`
- `install-chat-system.yml`: `e03081fab2b9866304882e894a7a0255022bc57b`
- `research-record-approval.yml`: `fda36652642d21cb106a6172a5614e06560cbed3`
- `backup-main.yml`: `553622bc6ca68eab88d192b3fd27e8876788293d`
- `deploy-worker.yml`: `60b043241fc715ebcbadd2ee94a215cfc16f5c62`
- `chat-smoke-test.yml`: `3c3e131b7be64c2c3b5c037c74fbe5c895dba2e1`
- `link-integrity.yml`: `250261e3691671be8ad4643cbbb89ba726f65cde`
- `test-research-record-gate.yml`: `f9e9d5e29abbf856ed9b5578856906f8cb86808c`

## Safety conclusion
The audit confirms that the main governance risk is **automation writing directly to a protected live entrypoint**. The correct next action is controlled consolidation, not destructive cleanup. Existing architecture and rollback mechanisms remain preserved.
