# Instruction — Project Agent Worker

Path: backend/project-agent/worker.js
Purpose: isolated autonomous Project Agent runtime.

Required behavior:
- read before edit;
- write only agent/*;
- protected paths remain blocked;
- assign unique Agent/Task/Session identity;
- create isolated task branch;
- preserve observable work metadata;
- never merge or production-deploy;
- report incomplete work and handoff state;
- never store hidden chain-of-thought.

Verification: syntax/runtime checks, branch isolation, auth, CORS, protected-path rejection, task metadata, and failure reporting.
Status: ACTIVE — v2
