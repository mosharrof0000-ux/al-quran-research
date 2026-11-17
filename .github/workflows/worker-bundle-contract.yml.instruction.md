# Instruction — Cloudflare Worker Bundle Contract

## Identity
Path: .github/workflows/worker-bundle-contract.yml
Status: ACTIVE — no-deploy Wrangler bundle validation

## Purpose
Compile the Worker entry and its imports, including Private Research modules, using the repository Wrangler configuration without deploying.

## Allowed
- Install Wrangler CLI in the hosted runner.
- Run `wrangler deploy --dry-run` with the configured backend entry.
- Write build output only to the runner's temporary directory.

## Forbidden
- Add Cloudflare API credentials or secrets to this job.
- Remove `--dry-run`, add remote migration commands, deploy Workers, create D1 databases or enable routes.

## Verification
The `worker-bundle` job must pass on the exact PR head. A dry-run bundle is build evidence only, not production deployment acceptance.
