# Instruction — AI_RESEARCH_AGENT_SYSTEM_V1.md

**Instruction ID:** INST-AI-AGENT
**Target:** `docs/AI_RESEARCH_AGENT_SYSTEM_V1.md`
**Class:** A — Critical
**Status:** ACTIVE

## Purpose
Define how an AI agent must conduct project research and technical work.

## Rules
- Read current project state before acting.
- Use repository evidence instead of memory or assumptions.
- Keep raw data, evidence, claims, uncertainty, and translation decisions distinct.
- Do not silently overwrite research data or erase history.
- Follow backup → change → test → verification workflow for risky changes.
- Respect human approval gates for core research/publication decisions.
- Keep provider-specific implementation separate from Research Core.

## Dependencies
`AI_ENTRY_PROTOCOL.md`, `MASTER_INSTRUCTION.md`, `docs/AI_RESEARCH_BRAIN_V1.md`, `docs/RESEARCH_CHAIN_OF_COMMAND.md`, backup/state/work-log documents.

## Verification
Agent behavior and project changes must be checked against the rules in the target document and the master instruction.

## Update Trigger
Changes to AI agent permissions, workflow, research verification, approval gates, or technical operating rules.
