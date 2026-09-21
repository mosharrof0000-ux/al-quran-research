# Instruction — Project Agent Worker

Path: backend/project-agent/worker.js

Purpose: isolated autonomous project-work runtime.

Rules:
- Inspect before edit.
- Every task has Task ID, Agent Name, Agent ID, Session ID and isolated agent/* branch.
- Preserve work history and handoff.
- Never write main; never merge; never deploy.
- Protected paths remain blocked.
- Never claim live verification without evidence.

Verification: syntax/runtime and authenticated tool-call tests are required before promotion.

Status: ACTIVE — v1.1 candidate.
