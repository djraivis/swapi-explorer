# GitHub Actions for Code Quality Checks

This project uses GitHub Actions to run automated quality checks and browser tests for the `main` branch workflow.

## Current Workflow

The workflow file is `/.github/workflows/ci.yml`.

It runs on:

- pushes to `main`
- pull requests targeting `main`

## Jobs

### `checks`

This job runs the faster validation steps:

- `yarn install --frozen-lockfile`
- `yarn tsc --noEmit`
- `yarn lint`
- `yarn test --passWithNoTests`
- `yarn build`

### `e2e`

This job depends on `checks` and runs browser coverage:

- `yarn install --frozen-lockfile`
- `npx playwright install --with-deps chromium`
- `yarn test:e2e`
- upload `playwright-report/` and `test-results/` as workflow artifacts

## Why It Is Split

The workflow uses separate jobs so:

- cheaper checks fail fast before Playwright starts
- unit/lint/build failures are easier to distinguish from browser-test failures
- Playwright artifacts stay attached to the E2E job where they are most useful

## Notes

- GitHub Actions is used for validation, not deployment.
- Netlify still handles deployment separately.
- The Playwright suite uses the local mock SWAPI route configured by the test setup, so CI does not depend on the live `swapi.dev` API.
