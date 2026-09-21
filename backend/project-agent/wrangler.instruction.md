# Instruction — Project Agent Wrangler
Status: ACTIVE
Purpose: Cloudflare Worker configuration for the isolated Project Agent.
Rules: remain separate from the production chat Worker; no production Worker target; secrets are runtime configuration and must never be committed.
Verification: deployment target must be al-quran-research-project-agent only; health endpoint must report isolated=true and merge/deploy=false.
