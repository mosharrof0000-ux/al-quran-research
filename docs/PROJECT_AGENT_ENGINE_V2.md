# Autonomous Project Agent Engine v2

- Agent: শাহীন
- Task: AI-STRENGTH-V2-001
- Branch: agent/shahin-ai-core-v2-001
- Base: current main
- Status: isolated implementation

## Strengthening
1. Bengali human-like identity selected from work type.
2. Unique Task ID, Session ID and Agent ID for every request.
3. Controlled Gemini tool loop with a 12-turn ceiling.
4. Project inspection: file read, directory listing, code search, recent commits and ref comparison.
5. Safe branch creation restricted to agent/*.
6. File writes restricted to agent/* and blocked protected paths.
7. Explicit BLOCKED + handoff_required on runtime failure.
8. CORS restricted to the canonical GitHub Pages origin.
9. Request/file-size limits.
10. Production merge/deploy are outside the engine.

## Verification gate
Success from this code is not deployment or live verification. Build, runtime, authenticated tool-call, branch/write safety, browser/console/network, independent final verification and live smoke testing remain required.
