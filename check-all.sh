#!/bin/sh

# Run lint checks
echo "Running ESLint..."
yarn lint || exit 1

echo "Running type check..."
yarn tsc --noEmit || exit 1

echo "Running unit tests..."
yarn test || exit 1

echo "Running Playwright E2E tests..."
yarn test:e2e || exit 1

echo "Running build..."
yarn build || exit 1

echo "All checks passed!"
