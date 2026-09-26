# Mosharrof Token-Permission Runtime Test Contract v0.1

Minimum tests:
TR-001 active matching token
TR-002 token covers requested child scope
TR-003 broader credential does not widen effective permission
TR-004 capability mismatch
TR-005 inactive token
TR-006 parent DENY preservation
TR-007 least-privilege token selection
TR-008 revoked token
TR-009 environment mismatch
TR-010 raw-secret protection
TR-011 destructive default deny
TR-012 self-escalation denial

Promotion rule:
All tests must pass before token runtime is treated as a validated foundation. This contract does not create or expose provider secrets.
