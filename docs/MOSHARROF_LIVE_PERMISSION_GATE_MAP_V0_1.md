# MOSHARROF LIVE PERMISSION GATE MAP v0.1

## Purpose
This record maps the permissions required to move from repository code to directly verifiable live operation. It is an operational map, not a provider token secret.

## Verified repository authority
Repository: mosharrof0000-ux/al-quran-research
Current connected GitHub authority: admin/maintain/push/pull/triage.
Therefore repository-side code, workflow, branch and merge operations are not currently blocked by repository permission.

## Current workflow findings

### 1. Mosharrof Token Runtime
Workflow: .github/workflows/mosharrof-token-runtime.yml
Required repository permission:
- contents: read
Status: present in workflow.
Purpose: run runtime contract tests.
No provider credential required for the current test-only path.

### 2. Canonical Live Entrypoint Sync
Workflow: .github/workflows/live-entrypoint-sync.yml
Required repository permission:
- contents: write
Status: present.
Purpose: controlled automatic commit/push of canonical integration changes.
This is production-impacting and remains subject to the project's write-protection rules.

### 3. Cloudflare D1 + Worker deployment
Workflow: .github/workflows/d1-provision-deploy.yml
GitHub workflow permission:
- contents: read
Status: present.
External Cloudflare credential required through GitHub secret:
- CLOUDFLARE_API_TOKEN
Provider operations used by the workflow:
- inspect/list D1
- create D1 if absent
- apply remote D1 migrations
- execute remote D1 verification/seed commands
- deploy Worker
Therefore the Cloudflare credential must have the current provider-side permissions covering the project's D1 operations and Worker deployment operations.

### 4. Manual Worker deployment
Workflow: .github/workflows/deploy-worker.yml
External Cloudflare credential required:
- CLOUDFLARE_API_TOKEN
Provider operation:
- Worker deployment.

## Current blocker
The repository-side permission is NOT the blocker for the Worker/D1 deployment path.

The remaining authority that must be verified at provider level is the Cloudflare API token stored in GitHub secret CLOUDFLARE_API_TOKEN. The previously verified WAF-READ token is WAF Read only and cannot by itself prove Worker/D1 deployment authority.

## Required provider capability set for the deployment path
Minimum functional areas to verify against the current Cloudflare permission UI/docs:
- Workers Scripts: Read + Edit
- D1: Read + Edit
- Any additional Worker route/domain permission only if the actual deployment configuration requires route mutation.
- No Delete permission.
- No Account API Token management permission.
- No Billing permission.
- No unrelated security/admin permission unless a concrete workflow requires it.

Important: Cloudflare Edit may bundle destructive API operations at provider level. The Mosharrof runtime policy must therefore continue to block DELETE regardless of provider-side Edit.

## Live proof gate
A deployment is not considered proven merely because:
- code is merged;
- a GitHub Actions test is green; or
- a token exists.

Live status becomes VERIFIED only after:
1. deployment workflow succeeds;
2. deployment artifact/version is identified;
3. live endpoint is directly reachable;
4. expected response is directly observed;
5. relevant UI/live path is directly tested where applicable.

## Next automatic investigation
Continue by checking:
- exact Cloudflare permission names currently required by the deployment workflow;
- whether CLOUDFLARE_API_TOKEN has those permissions;
- deployment workflow run/result;
- live Worker diagnostic/API response;
- GitHub Pages/live-site deployment evidence.

If provider-side permission creation or secret rotation requires a user action that cannot be performed through the available connected tools, stop at that exact point and request only that action. Never request or expose the raw token secret.

## Hard safety rule
DELETE remains blocked at Mosharrof policy/runtime level even when a provider permission is broader than desired.
