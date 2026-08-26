# Delivery runbook

## Before coding

- Inspect the working tree and branch.
- Read the relevant project documents and existing implementation.
- Define acceptance criteria and a rollback approach for stateful changes.
- Identify secrets, personal data, payments, external integrations, and production impact.

## Before commit

- Review the diff for accidental files and secrets.
- Check `.gitignore` and environment templates.
- Run the project’s lint, typecheck, unit/integration tests, and build when available.
- Run a focused smoke test for the changed flow.
- Record known warnings rather than hiding them.

## Before deployment

- Confirm repository, commit, target domain, environment, and deployment method.
- Confirm backup, migration, rollback, and owner for the release.
- Use least-privilege credentials without printing them.
- Deploy only the reviewed commit.

## After deployment

- Check the deployed site over HTTPS.
- Verify the changed user journey, authentication if applicable, and error paths.
- Inspect application/deployment logs and monitoring.
- Confirm no debug mode, test account, sample data, or secret exposure remains.
- Record commit, time, target, checks, result, and rollback status.

FTP is a transport fallback, not the default source of truth. Prefer GitHub-based or Hostinger-supported deployment workflows when available. If FTP is used, upload an explicit build artifact to the confirmed target and preserve a rollback copy; do not sync an unreviewed working directory blindly.
