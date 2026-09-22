# Login v1 Component Instruction

## Purpose
Standalone vanilla HTML/CSS/JS dark Glassmorphism login component rebuilt after the previous implementation was discarded.

## Protected behavior
- No external libraries or frameworks.
- Form submission always uses preventDefault() and async JavaScript.
- Validation/authentication errors are dynamically visible.
- Session token and optional user data are stored only after successful authentication/mock authentication.
- Responsive layout remains fluid with a 400px maximum width.

## Authentication behavior
- If no API endpoint is configured, the component uses explicit local mock mode for UI testing.
- A real backend can be supplied with form data-api-endpoint or window.ALQURAN_LOGIN_API.
- POST payload is JSON: { identity, password }.
- Success accepts token, access_token, or sessionToken, plus optional user.
- Network TypeError falls back to mock mode; real HTTP authentication errors remain visible.

## Change policy
Test the component before merge or live publication. Do not publish an untested version.
