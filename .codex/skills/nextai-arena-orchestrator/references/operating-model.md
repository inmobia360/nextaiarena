# Multiagent operating model

## Standard cycle

1. Director frames the task and writes acceptance criteria.
2. Director assigns only independent work that has a clear output.
3. Subagents inspect the same current repository state before acting.
4. Each subagent reports changed files, verification commands, assumptions, risks, and handoff notes.
5. A reviewer checks the work against the acceptance criteria and surrounding code.
6. A security or privacy reviewer is added for auth, payments, ranking, moderation, uploads, personal data, external callbacks, or deployment.
7. Director integrates, runs end-to-end checks, and records the final decision.

## Handoff contract

Every handoff must include:

- Objective and scope.
- Files or artifacts inspected and changed.
- Decisions and alternatives rejected.
- Commands/tests run and their results.
- Known limitations and unresolved questions.
- Required follow-up for the next role.

## Conflict resolution

Prefer, in order: explicit user intent, project invariants, acceptance criteria, security/privacy, maintainability, evidence from tests, then speed or stylistic preference. If two agents disagree on a material product or deployment decision, pause integration and present the trade-off to the director.

## No false completion

“Implemented” means the change exists and is verified at the appropriate level. “Ready to deploy” additionally requires build/test/review evidence. “Deployed” requires a known commit, target confirmation, successful deployment, and smoke-check evidence.
