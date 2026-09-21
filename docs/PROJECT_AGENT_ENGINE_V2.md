# Project Agent Engine v2 — AI Strengthening

## Goal
The Project Agent is a separate engineering intelligence layer for the Al-Quran Research project. It can understand a Bengali command, inspect current project state and previous agent work, make bounded changes on an isolated branch, and return an auditable result.

## Stronger controls
- Dynamic Bengali Agent identity based on work type.
- Unique Task ID, Agent ID and Session ID per request.
- Optional Parent Task ID for inherited work.
- Prior agent branch inspection.
- Ref/commit comparison before relying on history.
- Bounded 12-turn Gemini tool loop.
- File/message size limits.
- Safe path validation and protected production-sensitive paths.
- Main branch write prohibited.
- Merge and production deployment prohibited.
- Explicit HANDOFF_REQUIRED when the loop cannot finish safely.

## Tool layer
1. project_read_file
2. project_list_directory
3. project_search_code
4. project_list_agent_branches
5. project_compare_refs
6. project_get_commit
7. project_create_branch
8. project_write_file

## Verification gate
This implementation is an isolated code change. It is **not** a claim of Cloudflare deployment, Gemini secret availability, browser integration, or live website activation. Those require separate runtime verification.

## Future gates
Isolated Worker deploy → health → authenticated Gemini call → real GitHub read/write test → browser/console/network test → self-repair test → website Agent Mode integration → review → explicit approval → promotion → live smoke test.

## No false completion
A green code commit is not the same as a live feature. Every final report must distinguish code state, runtime state and live state.
