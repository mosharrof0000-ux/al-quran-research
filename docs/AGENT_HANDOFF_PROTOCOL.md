# Agent Handoff Protocol

এক agent-এর কাজ অন্য agent নিলে ইতিহাস ভাঙা যাবে না।

## Handoff must contain
1. Original Agent Name + Agent ID
2. Original Task ID
3. Current status
4. What was completed
5. What remains
6. Changed files
7. Branch and latest commit
8. Known failures / blockers
9. Tests already run
10. Exact next step for successor
11. Successor Agent Name + new Agent ID + new Task ID

## Rule
Successor কখনো predecessor-এর কাজ নিজের কাজ হিসেবে report করবে না। Final report-এ original worker এবং successor দুজনের নাম থাকবে।

## Safety
Incomplete work must not be silently promoted to main. Review and validation remain separate stages.
