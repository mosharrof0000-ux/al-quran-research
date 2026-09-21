# Instruction — wrangler.toml

## Purpose
Cloudflare Worker configuration for the isolated Project Agent Engine.

## Rules
- Worker name must remain separate from production chat Worker.
- Do not point this configuration at the production Worker.
- Runtime version changes require verification.

## Verification
Check worker name, compatibility date, vars and deployment target.

## Status
ACTIVE on safety branch; promotion pending.
