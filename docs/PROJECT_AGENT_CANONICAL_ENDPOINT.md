# Project Agent Canonical Endpoint

- Worker purpose: isolated Project Agent
- Canonical Worker name: `al-quran-research-agent`
- Canonical workers.dev URL: `https://al-quran-research-agent.mosharrof000.workers.dev`
- Source config: `backend/project-agent/wrangler.jsonc`
- The URL must be derived from the Worker name in the Wrangler config; do not use the older `al-quran-research-project-agent` hostname.
- Expected GET response identifies the service as `al-quran-research-project-agent` and must include `isolated: true`, `merge: false`, and `deploy: false`.
- Any future deployment/check must use this canonical URL.
