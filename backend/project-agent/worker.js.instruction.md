# Instruction — backend/project-agent/worker.js

## Purpose
Governs the isolated Project Agent Worker runtime.

## Safety
- Never write main.
- Write only to agent/* branches.
- Protected paths remain blocked.
- Never claim merge or production deployment.
- Read governance/identity/handoff records before project modification.

## Identity
Each request must expose Agent Name, Agent ID, Task ID, Session ID, Task Type and optional Parent Task ID.

## Verification
Worker syntax, tool permissions, CORS, authorization, isolation flags and runtime health must be tested before promotion.

## Status
ACTIVE — v1.1
