# New AI / New ID / New Chat — Project Start Guide

**Version:** 1.0  
**Status:** ACTIVE  
**Role:** Operational startup guide for any new AI, ChatGPT ID, agent, or new chat/page that begins work on this project.

## 1. Purpose

This document gives a new AI/session a safe, repeatable starting procedure. It prevents the AI from relying on old chat memory, guessing the current project state, or changing protected project assets without first understanding the project.

## 2. First Rule

Do not start editing project files immediately.

First establish the current repository state, read the governing instructions, identify the requested task, and determine which files are actually affected.

## 3. Mandatory Reading Order

Read these in order:

1. `AI_ENTRY_PROTOCOL.md`
2. `NEW_AI_SESSION_START_GUIDE.md` (this document)
3. `MASTER_INSTRUCTION.md`
4. `MASTER_PROJECT.md`
5. `PROJECT_STATE.md`
6. `INSTRUCTION_REGISTRY.md`
7. `PROJECT_CONTINUITY_PROTOCOL.md` when continuity/current-state questions are involved
8. The relevant individual instruction(s)
9. The target file(s)
10. `INSTRUCTION_AUDIT_PROTOCOL.md` when instructions, dependencies, architecture, automation, or protected production paths are changed

## 4. Identity Check

Before project work, confirm:

- Repository: `mosharrof0000-ux/al-quran-research`
- Default branch: `main`
- Public site: `https://mosharrof0000-ux.github.io/al-quran-research/`
- The project is a Quran research infrastructure project.
- Website, research data, stable IDs, protocols, history, backups, backend/API paths, and production automation are protected assets.

## 5. Never Trust Chat Memory as Current State

A previous conversation, another ChatGPT ID, an old summary, or an AI's internal memory is not authoritative for the current repository state.

The repository's current files, commit history, project state, work log, backup records, and active instructions are the source of truth.

## 6. Before Any Change

The AI must:

1. Translate the user's request into a concrete task.
2. Identify affected files and dependencies.
3. Read the applicable instruction before editing each governed target.
4. Check whether the requested change is additive, corrective, structural, or production-impacting.
5. Prefer the smallest safe change.
6. Avoid unrelated cleanup.
7. Preserve existing public paths and stable identifiers.
8. Create or identify a rollback/safe point when the change is production-impacting or structural.

## 7. Protected-Asset Rules

Never delete, rename, move, overwrite, or restructure an existing project file merely for organization.

Never replace a live file with generated content without first checking its current contents, callers, dependencies, and required behavior.

Never silently change raw Quran text, research records, stable IDs, evidence history, approval history, or backup records.

Corrections to research data must be versioned or handled through the applicable approval workflow.

## 8. Research Integrity Rules

For Quran research:

- Raw text and analysis must remain distinguishable.
- AI-generated information is not automatically verified.
- Claims should have traceable evidence where applicable.
- Uncertainty and disputed linguistic analysis must remain explicit.
- Translation, linguistic analysis, interpretation, and sectarian conclusions must not be silently conflated.
- Previous versions and disagreements must remain recoverable.
- No fabricated evidence, citations, verification status, or test results.

## 9. Website / Backend / Automation Rules

Before changing live UI, backend, API, or GitHub Actions:

- inspect the relevant dependency/caller path;
- read `docs/instructions/BACKEND_AND_LIVE_UI.instruction.md` or `docs/instructions/GITHUB_ACTIONS_AND_AUTOMATION.instruction.md` as applicable;
- preserve the GitHub Pages entry path;
- preserve API contracts unless a reviewed change explicitly changes them;
- inspect workflow triggers, permissions, reads, writes, and dependencies;
- do not create duplicate automatic writers for the same protected production asset;
- keep rollback information available.

## 10. Execution Rule

Do not make a large batch of unrelated changes in one step.

Use this sequence:

**Understand → Inspect → Plan → Safe point → Minimal change → Verify → Record**

## 11. Verification Rule

After every meaningful change, verify:

- the intended file changed;
- the intended behavior exists;
- no unrelated critical file changed;
- links and public paths remain intact;
- syntax/data integrity remains valid;
- relevant instructions/registry remain accurate;
- the work log and backup record are updated when required.

For production-impacting changes, repository verification and live-site verification must be distinguished. Never claim live verification unless it was actually performed.

## 12. If Something Is Unclear

Do not guess.

If instructions conflict, follow the priority rules in `MASTER_INSTRUCTION.md`, identify the conflict, and resolve or escalate it explicitly.

If current state cannot be verified, stop before making a risky change.

If a requested change could damage the existing site, data, API, automation, or history, prefer a safe point and a reversible proposal first.

## 13. New Chat Handoff Summary

At the beginning of a new chat, the AI should be able to state:

- what the project is;
- what the current verified state is;
- what the user wants now;
- which files are affected;
- which instructions govern those files;
- what will not be changed;
- how the result will be verified.

## 14. Completion Standard

A task is complete only when the change is implemented, verified, and recorded at the appropriate governance level.

A response saying "done" without repository-level verification is not sufficient.

## 15. Status

**ACTIVE — v1.0**

This guide supplements `AI_ENTRY_PROTOCOL.md`; it does not replace the entry protocol or the master instruction hierarchy.
