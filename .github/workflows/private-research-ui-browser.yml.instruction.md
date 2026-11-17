# Instruction — Private Research UI Browser Workflow

## Identity
Path: .github/workflows/private-research-ui-browser.yml
Status: ACTIVE — Playwright/Chromium browser regression

## Purpose
Run the Private Research UI state test in Chromium whenever governed UI assets or the browser test change.

## Allowed
- Install Playwright/Chromium on the hosted runner.
- Serve the repository locally inside the job.
- Use synthetic Private Research API responses.

## Forbidden
- Use production PINs, bearer tokens, private source content, or real storage bindings.
- Dispatch production workflows or deploy code.

## Verification
The browser job must pass on the exact PR head. It validates only UI state, not real private-source retrieval.
