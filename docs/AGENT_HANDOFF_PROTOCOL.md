# Agent Handoff Protocol — v2

1. **Start** — create Task ID, Agent identity, Session ID and isolated branch.
2. **Inspect** — read governance, current implementation, relevant history and prior agent branches.
3. **Plan** — state intended scope and risks before writing.
4. **Work** — smallest safe change only.
5. **Test** — functional, technical, compatibility, and available browser/visual/runtime checks.
6. **Repair** — record each failed test and correction.
7. **Validate** — independently check changed files, diff, protected paths and expected behavior.
8. **Handoff** — if incomplete, record original agent, successor, completed work, remaining work, branch, commit, failures and exact next action.
9. **Promotion** — review → explicit approval → main promotion → deployment → live smoke test.
10. **History** — never rewrite inherited work as if it were newly created.

A task is not "done" merely because a commit exists.
