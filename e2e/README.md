# Playwright E2E Test Guide

This folder contains end-to-end (E2E) tests for the SWAPI Explorer app using [Playwright](https://playwright.dev/).

## Structure

- All E2E tests are in the `e2e/` folder at the project root.
- Playwright config is in `playwright.config.ts` at the project root.
- Sample test: `search-filter.spec.ts` covers homepage navigation and search filtering.
- Notes: `PLAYWRIGHT-NOTES.md` for troubleshooting and tips.

## Running E2E Tests

1. **Run Playwright tests:**

   ```sh
   yarn test:e2e
   ```

   This command starts the app automatically before running the tests.

2. **Run Playwright in UI mode:**

   ```sh
   yarn test:e2e:ui
   ```

3. **View HTML report:**

   ```sh
   yarn test:e2e:report
   ```

## Notes

- Tests run against `http://localhost:3000` and Playwright starts the app automatically.
- Playwright runs the app with `SWAPI_BASE_URL=http://127.0.0.1:3000/api/mock-swapi` so E2E tests use the local mock route instead of the live `swapi.dev` API.
- The mock API lives in `src/app/api/mock-swapi/[category]/route.ts` and exists to keep local runs and GitHub Actions stable and deterministic.
- Normal app usage is unchanged because `src/lib/swapi.ts` still defaults to `https://swapi.dev/api` when `SWAPI_BASE_URL` is not set.
- Test artifacts are written to `test-results/`.
- The HTML report is written to `playwright-report/`.
- Update selectors in tests as needed if UI changes.
- See Playwright docs for more advanced usage.
