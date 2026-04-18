# GitHub Actions Setup: Challenges, Solutions & Learnings

## What Was Done

- Set up a CI workflow using GitHub Actions to automate code quality checks (type checking, linting, and tests) for every push and pull request to main.
- Ensured the workflow uses the correct Node.js version to match project requirements and future GitHub Actions runner updates.
- Added a basic Jest test to ensure the test step passes.

---

## Challenges Faced

- **Node.js Version Mismatch:**
  - Next.js and some dependencies required Node.js 20.9.0+ or even 20.19.0+, but the workflow and local environment were initially on older versions.
  - Solution: Upgraded both local and CI environments to Node.js 22, and later to Node.js 24 to future-proof the setup.
- **Missing Test Script:**
  - The test script in package.json pointed to Jest, but Jest was not installed.
  - Solution: Installed Jest, @types/jest, and ts-jest, and initialized Jest config.
- **No Test Files:**
  - Jest failed with exit code 1 when no test files were present.
  - Solution: Used the --passWithNoTests flag and added a simple test for the slugify utility.
- **Linting Errors in Config Files:**
  - ESLint flagged require() in jest.config.js.
  - Solution: Added jest.config.js to .eslintignore to avoid linting config files.
- **GitHub Actions Node.js Deprecation Warning:**
  - GitHub Actions warned about Node.js 20 deprecation for actions.
  - Solution: Updated workflow to use Node.js 24 and confirmed all actions are compatible.

---

## Steps Taken

1. Matched local and CI Node.js versions using fnm and setup-node.
2. Installed and configured Jest for testing.
3. Added a basic test to ensure CI passes.
4. Updated ESLint config to ignore config files.
5. Updated the workflow to use Node.js 24 for future compatibility.
6. Verified all steps (install, lint, type check, test, build) work locally before pushing.

---

## Takeaways & Learnings

- Keeping local and CI environments in sync (Node.js version, dependencies) is critical for smooth development and CI/CD.
- Even a simple test is useful to ensure the test step passes and CI is green.
- Reading and acting on CI error messages step by step is the fastest way to resolve issues.
- Using --passWithNoTests is helpful when starting out, but adding real tests is important for long-term quality.
- Keeping config files out of linting avoids unnecessary errors.
- Staying ahead of deprecation warnings (like Node.js 20 → 24) prevents future build failures.

---

## How This Reflects on My Project

- The project now has a robust, automated CI pipeline that checks code quality on every push and pull request.
- The setup process improved my understanding of Node.js version management, CI/CD, and test tooling.
- I learned how to debug and resolve common CI issues, making future maintenance easier.
- The project is now more reliable, maintainable, and ready for collaboration or deployment.

---

## Summary

Setting up GitHub Actions for CI/CD required careful attention to Node.js versions, test tooling, and linting. By resolving each challenge, I improved both the project and my own workflow. The result is a modern, automated pipeline that ensures code quality and reliability for every change.
