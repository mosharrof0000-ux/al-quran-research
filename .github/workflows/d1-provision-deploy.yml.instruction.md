# Instruction — D1 Production Provisioning and Worker Deployment

## Identity
Path: .github/workflows/d1-provision-deploy.yml
Status: ACTIVE — manual-only production workflow

## Purpose
Provision/find the production D1 database, apply approved migrations, deploy the Research Worker and isolated Project Agent, and run bounded post-deploy checks only during an explicitly authorized release.

## Required gates
- Trigger must remain workflow_dispatch only; never add automatic push or pull_request triggers.
- Deploy job must require `vars.ENABLE_D1_PROVISION_DEPLOY == 'true'`.
- Deploy job must use the `production` environment with required reviewers configured by repository administrators.
- Keep the bounded job timeout.
- Never dispatch this workflow for routine tests or source inspection.

## Allowed
- Read workflow source and validate the trigger/guard contract.
- Run local/static tests that do not contact Cloudflare or mutate D1.

## Forbidden
- Dispatch without an explicitly approved release and configured production reviewers.
- Provision databases, apply remote migrations, deploy Workers, enable routes, or change secrets during ordinary PR validation.
- Print or expose Cloudflare token values.

## Verification
Run `node scripts/test-d1-workflow-contract.mjs`. Production acceptance is separate and must be recorded only after an explicitly approved release.
