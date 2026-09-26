# Quran App Login Card v1

## Purpose
Responsive accessible Quran App login card using semantic HTML5, CSS3, and vanilla JavaScript.

## Required IDs
- `loginBox`
- `loginError`
- `quranLoginForm`
- `userEmail`
- `userPassword`

## Protected behavior
- Form uses `onsubmit="submitLogin(event)"`.
- `submitLogin(event)` always calls `event.preventDefault()`.
- No traditional form reload.
- Error visibility is dynamically controlled by JavaScript.
- Error starts hidden with CSS `display:none`.
- Email/password fields have explicit labels and placeholders.
- No external libraries or frameworks.

## Change policy
Test before merge or live publication. Do not publish an untested version.
