# Instruction Audit Protocol — v1.0

## Purpose
Continuously check whether the instruction system matches the actual repository.

## Audit Questions
For every relevant file, check:
1. Does an instruction exist?
2. Is the instruction registered?
3. Is the instruction version current?
4. Does it describe the file's current purpose?
5. Are dependencies accurate?
6. Are allowed/forbidden operations defined where needed?
7. Are verification rules defined?
8. Has the file changed in a way that requires an instruction update?
9. Does another instruction conflict with it?
10. Is important new information missing from the applicable instruction?

## Detect These Conditions
- `MISSING_INSTRUCTION`
- `STALE_INSTRUCTION`
- `UNREGISTERED_INSTRUCTION`
- `CONFLICT`
- `DEPENDENCY_DRIFT`
- `SCOPE_DRIFT`
- `DUPLICATE_RULE`
- `MISSING_VERIFICATION`
- `UNSAFE_CHANGE`

## Audit Flow
`Repository Change → Identify Affected Files → Load Instructions → Compare Current State → Detect Drift → Assess Impact → Propose Update → Review → Apply → Update Registry → Log Change`

## Safety
An audit must not automatically delete, rename, or move project files.

An audit may identify a problem and create a proposal, but structural changes require a separate reviewed action.

## Master Update Rule
If an individual instruction contains a rule that should become project-wide, it must first be proposed as a master-instruction change. Do not silently promote local rules to global rules.

## Frequency
Audit when:
- a new critical file is added;
- a critical file changes;
- dependencies change;
- architecture changes;
- an instruction changes;
- a new AI/session joins the project;
- a deployment-related change is made.

## Completion Standard
An audit is complete only when findings are classified as:
- resolved;
- accepted and documented;
- pending proposal;
- or explicitly deferred.

## Status
ACTIVE
