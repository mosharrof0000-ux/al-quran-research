# Project Agent — Full Verification Gate v1

## Purpose
Provide one deterministic release-gate command that combines the Project Agent's browser, console, and network/API checks.

## Sequence
1. Browser smoke/visual DOM gate.
2. Console error gate.
3. Network/API gate.
4. Every gate must pass.
5. Any unavailable dependency, runtime error, console error, page error, failed request, or API identity failure causes the combined gate to fail.

## Safety
The orchestrator is strictly read-only. It does not:
- edit repository files
- write main
- merge branches
- deploy
- authenticate users
- modify database/research data

## Evidence
The command emits one JSON object containing:
- target URL
- start/completion timestamps
- each child test
- exit code
- parsed machine-readable result when available
- stderr when applicable
- final `ok` gate

## Completion rule
A Project Agent task is not considered fully runtime-verified unless this combined gate passes in an environment with Playwright/Chromium and network access. If the environment cannot execute the dependencies, the result must remain a verification blocker rather than being reported as PASS.

## Recovery
When execution fails only because the verification environment loses network/dependency access, preserve the task identity and retry later. Do not create a new duplicate task merely because a verification attempt was interrupted.
