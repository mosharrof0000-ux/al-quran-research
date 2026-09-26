# Mosharrof Master Execution Record v0.1

This record adopts the supplied Master Guideline as the design basis for future implementation.

## Execution rules
- Keep the project root clean and lightweight.
- Prefer modular, isolated components.
- Prefer lightweight stream/event communication.
- Preserve independent component boundaries.
- Keep architecture open to future AI-assisted optimization and safe evolution.
- Do not introduce heavy dependencies without a concrete need.
- Preserve human review and explicit safety gates for consequential operations.
- Do not silently overwrite existing working production architecture.
- Keep deployment configuration explicit and environment-specific.

## Cloudflare alignment
- The repository's valid Worker source root is `/backend`.
- The shared `backend/wrangler.jsonc` currently names the production Worker `al-quran-research`.
- The production deployment workflow uses the shared configuration and the D1-bound generated configuration.
- Therefore the shared production Wrangler configuration must not be renamed to `al-quran-research-project-agent` merely to satisfy a separate Cloudflare project.
- A distinct Project Agent Worker requires an isolated source/configuration boundary before its Cloudflare project is pointed at it.
- No delete operation is part of this migration.

## Final human action
Cloudflare dashboard changes cannot be performed from the connected GitHub tools. The repository-side preparation is complete only when the isolated Project Agent configuration is explicitly connected to its Cloudflare project and its build/deploy is verified.
