# GitHub Actions Setup: Challenges, Solutions & Learnings

## What Was Done

- Set up a GitHub Actions workflow that validates the project on pushes to `main` and pull requests targeting `main`.
- Split the pipeline into a fast `checks` job and a separate `e2e` Playwright job.
- Kept the workflow on Node.js 24 to match the current project setup.
- Added Playwright browser installation and report artifact upload to the CI flow.

## Challenges Faced

- **Keeping the workflow aligned with the real repo state:**
  - As the project gained Jest tests, Playwright tests, and E2E-specific mocking, the original single-job documentation became outdated.
  - Solution: Updated the workflow and docs together so the repo description matches the actual CI behavior.
- **Separating fast checks from slower browser tests:**
  - Running everything in one job makes failures noisier and slower to triage.
  - Solution: Split CI into `checks` and `e2e`, with `e2e` depending on `checks`.
- **Avoiding external API flakiness in CI:**
  - Browser tests that hit `swapi.dev` directly can fail for reasons unrelated to the app.
  - Solution: Run Playwright against a local mock SWAPI route during tests.

## Steps Taken

1. Added a `checks` job for install, type check, lint, Jest, and build.
2. Added an `e2e` job for Playwright browser install, E2E run, and artifact upload.
3. Kept the workflow on Node.js 24.
4. Wired Playwright to use deterministic mock SWAPI data during test runs.
5. Verified local Jest, build, and targeted Playwright coverage before updating the docs.

## Takeaways & Learnings

- Keeping local and CI environments in sync (Node.js version, dependencies) is critical for smooth development and CI/CD.
- Separating fast feedback from slower browser testing makes CI easier to understand and maintain.
- Browser tests are much more reliable when they do not depend on third-party API uptime.
- CI documentation drifts quickly unless it is updated alongside workflow changes.

## How This Reflects on My Project

- The project now has automated validation for type safety, linting, unit/component testing, production builds, and browser-level E2E coverage.
- The CI setup reflects a more realistic engineering workflow than a single all-in-one job.
- The testing story is now clearer: Jest covers smaller units and Playwright covers user-visible flows.
- The project is now more reliable, maintainable, and ready for collaboration or deployment.

## Summary

The GitHub Actions setup now matches the current state of the project. It validates the app in two layers, keeps CI output easier to understand, and supports stable Playwright runs through local mock data rather than depending on external API availability.
