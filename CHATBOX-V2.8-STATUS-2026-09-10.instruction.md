# Instruction — CHATBOX-V2.8-STATUS-2026-09-10.md

- Instruction ID: `INST-CHATBOX-V28-STATUS`
- Class: B — Important
- Status: ACTIVE

## Purpose
Govern the recorded v2.8 chat-system state and its remaining verification work.

## Rules
1. Preserve the documented merge/backup history; do not rewrite it to hide failures.
2. Preserve cancellation/timeout/retry behavior, six research modes, Bengali voice/speech support, input compatibility, accessibility labels, and local research fallback unless an approved change supersedes them.
3. Remaining verification items are tests, not claims that the behavior is already verified.
4. Research answers must not be called verified merely because chatbox functionality works; dataset/evidence integration remains a separate verification layer.
5. Any future chat-system change requires backup, focused diff review, and regression testing.

## Verification
Test typing, Enter/Shift+Enter, voice/speaker, cancellation, retry, research modes, and evidence integration against the live architecture before marking complete.

## Update triggers
Update when chat-system version, merge state, protected behaviors, or verification results change.
