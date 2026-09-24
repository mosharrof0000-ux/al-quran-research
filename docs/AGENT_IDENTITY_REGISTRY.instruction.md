# Instruction — Agent Identity Registry

- ID: INST-AGENT-IDENTITY-REGISTRY
- Target: `docs/AGENT_IDENTITY_REGISTRY.md`
- Class: A — Critical Project Agent governance
- Status: ACTIVE

## Purpose
Maintain persistent human-readable identities for distinct Project Agent tasks.

## Rules
1. Every distinct task receives a unique Task ID and Agent Identity record.
2. Bengali names are human-facing labels, not GitHub permissions.
3. Identity collisions must be prevented; reuse requires a new sequence/identity.
4. Original and successor agents remain separately recorded.
5. Reviewer, verifier, and deployer roles must remain distinguishable.
6. Records must never claim completion without evidence.

## Verification
Confirm registry entries are unique, traceable to a task, and consistent with the work ledger and branch.

## Update trigger
New task, successor handoff, identity change, or Agent architecture change.
