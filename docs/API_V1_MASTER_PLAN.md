# API v1 Master Plan

## Phase A — foundation
- Gateway
- stable route contract
- common CORS/error headers
- current JSON adapter retained

## Phase B — database
- create/bind Cloudflare D1
- migrate pilot dataset
- keep endpoint response contract unchanged

## Phase C — scale
- indexed search
- pagination
- research ID lookup
- source/provenance fields

## Phase D — AI
- verified-context retrieval
- explicit provenance
- fail-closed when requested record is unavailable
- protected AI endpoint

## Phase E — security
- API authentication for protected routes
- rate limiting
- request validation
- observability

## Safety
No production Worker routing is changed by this foundation alone. Integration and deployment require separate review.
