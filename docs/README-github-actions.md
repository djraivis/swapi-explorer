# GitHub Actions for Code Quality Checks

This project can use GitHub Actions to automatically check code quality on every push and pull request. This ensures that only code that passes type checks, linting, and tests is merged into the main branch.

---

## How It Works

- Runs on every push and pull request to the `main` branch.
- Installs dependencies, checks TypeScript types, lints, and runs tests.
- Does **not** deploy—deployment is handled by Netlify.

---

## Example Workflow File

Create a file at `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Type check
        run: yarn tsc --noEmit

      - name: Lint
        run: yarn lint

      - name: Run tests
        run: yarn test
```

---

## Benefits

- Catches errors before code is merged
- Keeps codebase clean and reliable
- Works alongside Netlify (which handles deployment)

---

## Next Steps

- Add the above workflow file to your repo to enable CI checks.
- Monitor the Actions tab in GitHub for results.
