# Mosharrof Cloudflare Token Creation Checklist v0.1

Use this checklist when the actual provider-side token is created.

## Before creation
- [ ] Confirm branch feature/dynamic-entity-token-engine-v0-1.
- [ ] Use MOSHARROF_CLOUDFLARE_TOKEN_BUNDLE_V0_1.md.
- [ ] Keep main/live unchanged.
- [ ] Never paste the secret into chat, GitHub files, issues, PRs or logs.

## Cloudflare permission selection
- [ ] Select only the approved Read/Edit entries from the bundle.
- [ ] Delete = None / Exclude everywhere.
- [ ] Account API Tokens = None / Exclude.
- [ ] Account Settings Edit/Write = prohibited.
- [ ] Billing & Subscriptions = excluded.
- [ ] Do not add unlisted permissions without a new review.

## After creation
- [ ] Record token name/ID only.
- [ ] Put the secret into the approved secret store.
- [ ] Register an opaque auth reference.
- [ ] Mark token REGISTERED, not ACTIVE, until verification.
- [ ] Run token runtime tests.
- [ ] Verify scope, environment and policy mapping.
- [ ] Promote to ACTIVE only after validation.
- [ ] Record audit reference and review/rotation date.

## Rollback
If verification fails: do not broaden the token. Suspend/revoke the credential and correct the policy or scope.
