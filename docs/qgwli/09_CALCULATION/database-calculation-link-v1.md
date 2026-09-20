# QGWLI Database ↔ Calculation Link v1

The existing SQLite research schema already contains `formula`, `metric`, and `calculation_run` tables. This registry connects the QGWLI pilot formulas and metrics to those database entities.

Runtime rule:
1. Read the approved project research record / indexed fixture.
2. Resolve the registered formula and metric ID.
3. Execute deterministically.
4. Write/return a traceable calculation-run record.
5. Reject mismatches as BLOCKED.

The browser engine is an execution bridge while the project database runtime is being provisioned. It must not invent a database result when the project record is unavailable.
