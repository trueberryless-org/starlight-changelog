#!/bin/bash

# Only care about deploy previews
if [ "$CONTEXT" != "deploy-preview" ]; then
  exit 1
fi

# Only run this if it's a PR (not a branch deploy)
if [ -z "$PULL_REQUEST" ]; then
  echo "Not a pull request. Proceeding with deploy."
  exit 1
fi

# Branches for which PRs should NOT be deployed
IGNORED_BASE_BRANCHES=("ignore-branch" "another-one")

# Get the base branch using GitHub API
echo "Fetching PR #$PULL_REQUEST base branch..."

BASE_BRANCH=$(curl -s -H "Authorization: token $GH_TOKEN" \
  "https://api.github.com/repos/${REPOSITORY_URL#https://github.com/}/pulls/$PULL_REQUEST" \
  | jq -r .base.ref)

echo "Base branch of PR: $BASE_BRANCH"

# Check if base branch is in the ignore list
for IGNORE in "${IGNORED_BASE_BRANCHES[@]}"; do
  if [ "$BASE_BRANCH" = "$IGNORE" ]; then
    echo "Skipping deploy preview for base branch: $BASE_BRANCH"
    exit 0
  fi
done

# Continue with deploy
exit 1
