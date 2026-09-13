# Chat Box v2.8 — 2026-09-10

## Completed
- Created backup branch before modification: `BACKUP-CHATBOX-BEFORE-NEXT-INTEGRATION-2026-09-10`
- Hardened `chat-system.js` from v2.7 to v2.8.
- Added AbortController cancellation and 30-second timeout.
- Added explicit `cancel()` API.
- Added retry action after Worker/AI failure or cancellation.
- Preserved all six research modes.
- Preserved Bengali voice input and Bengali speech output.
- Added safer input support for both input and textarea.
- Added Shift+Enter behavior for multiline-capable inputs.
- Added accessibility labels for voice/speaker/mode controls.
- Speaker toggle now stops active speech when muted.
- Added `clearChat()` API.
- Kept local research fallback and evidence-first wording.
- Merged through PR #10 into `main`.

## Merge
- PR: #10
- Merge commit: `0a173cfae7e2b45dedc7d69aea2c478dcb423087`

## Remaining verification
1. Open the live page on an Android phone and test typing.
2. Test Enter and Shift+Enter behavior.
3. Test voice input and speaker output.
4. Test Stop/cancellation during a real Worker response.
5. Test Worker failure and Retry button.
6. Test each research mode against the live backend.
7. Confirm Quran dataset/evidence integration before claiming research answers as verified.

## Safety
The locked/master design and research data are not intentionally modified by this change. The backup branch above preserves the pre-change main state.