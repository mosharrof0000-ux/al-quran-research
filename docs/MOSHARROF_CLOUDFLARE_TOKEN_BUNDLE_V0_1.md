# Mosharrof Cloudflare Token Bundle v0.1

## Status
FOUNDATION / PROVIDER-CREATION-READY

This bundle is the repository-side specification for the first Mosharrof Cloudflare credential. The actual provider secret is intentionally not stored here.

## Source of truth
Permission choices are derived from the project Cloudflare permission guideline PDF (1.pdf) supplied for this project.

## Required permissions for the first bundle
The first bundle is intentionally limited to the documented operational areas needed by the current Mosharrof runtime:

| Cloudflare permission area | Read | Edit | Delete |
|---|---:|---:|---:|
| WAF / Firewall Services | Allow | Allow | Exclude |
| Access: Apps and Policies | Allow | Allow | Exclude |
| Access: Mutual TLS | Allow | Allow | Exclude |
| Workers Scripts / Pages | Allow | Allow | Exclude |
| D1 | Allow | Allow | Exclude |
| Workers KV Storage | Allow | Allow | Exclude |
| R2 Storage | Allow | Allow | Exclude |
| Workers Scripts / Bindings | Allow | Allow | Exclude |
| Access: Service Tokens | Allow | Allow | Exclude |
| Rulesets Engine / Custom Rules | Allow | Allow | Exclude |
| Workers AI / Vectorize / AI Gateway | Allow | Allow | Exclude |
| Cloudflare Queues / Pub/Sub | Allow | Allow | Exclude |
| Cloudflare Stream / Images | Allow | Allow | Exclude |
| Workers Environment Variables & Secrets | Allow | Allow | Exclude |
| Cloudflare Tunnels | Allow | Allow | Exclude |
| Cloudflare Pages / Deployments | Allow | Allow | Exclude |

## Explicit exclusions
- Account API Tokens: None / Exclude.
- Account Settings: Edit / Write prohibited; Read only if separately required.
- Billing & Subscriptions: excluded from this operational token.
- Any Delete permission: excluded.
- Any permission not explicitly approved for this bundle: excluded.

## Runtime rules
1. The token cannot grant itself additional permissions.
2. Mosharrof's parent permission boundary remains authoritative.
3. A child Tool cannot receive a capability that Mosharrof does not possess.
4. Delete remains unavailable unless a future explicit policy changes the root boundary.
5. Provider secret is stored only in the approved secret mechanism; repository stores an opaque reference.
6. Token use is least-privilege and scope/environment checked.
7. Production-sensitive operations require the existing approval/deployment gate.

## Provider creation checklist
- Create provider token using this bundle.
- Name the token with a stable non-secret identifier.
- Confirm every selected permission against this document and the supplied PDF.
- Confirm all Delete permissions are excluded.
- Confirm Account API Tokens is excluded.
- Confirm Account Settings Edit/Write is not granted.
- Save the secret only in the approved secret store.
- Register only token ID + opaque auth reference in the repository-side registry.
- Run the token runtime tests after registration.

## Important
This file does not contain a token secret and does not claim that a provider-side token has already been created.
