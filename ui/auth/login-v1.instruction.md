# Login v1 Component Instruction

## Purpose
Reusable vanilla HTML/CSS/JS dark Glassmorphism login component.

## Protected behavior
- No external libraries/frameworks.
- Form submission uses preventDefault() and asynchronous Fetch API logic.
- Validation and authentication errors are dynamically shown.
- Session tokens are stored in localStorage only after a successful response/mock result.
- Responsive container target is max-width 400px.

## Backend contract
- data-api-endpoint defaults to /api/login.
- POST JSON payload: { identity, password }.
- Success may return token, access_token, or sessionToken; optional user object is persisted.
- Network/unavailable backend falls back to mock mode for rapid UI testing.

## Change policy
Update this instruction when component behavior, API contract, or protected constraints change.
