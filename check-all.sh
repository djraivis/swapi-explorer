#!/bin/sh

# Run lint checks
echo "Running ESLint..."
yarn lint || exit 1

echo "Running type check..."
yarn tsc --noEmit || exit 1

echo "Running tests..."
yarn test || exit 1

echo "Running build..."
yarn build || exit 1

echo "All checks passed!"
