# Mosharrof Permission Route Runtime Implementation v0.1

## Runtime contract

The executable harness validates the route-planning invariants without touching live credentials or infrastructure.

Production integration must implement the same decisions:

1. Resolve requested capability.
2. Load parent permission boundary.
3. Intersect requested child permission with the parent.
4. Reject scope widening.
5. Reject parent DENY overrides.
6. Discover only active authorized routes.
7. Reject unsafe environment transitions.
8. Select the least-privilege valid route.
9. Require explicit approval when no authorized route exists.
10. Execute only after authorization.
11. Verify the result.
12. Write an audit event.

## Separation of duties

Permission proposal, permission approval, token selection, execution, and verification are separate concerns. No single learned candidate can authorize itself.

## Security

The runtime must never expose raw credentials to route planning or learning records.
