#!/bin/bash

# Only run for deploy previews
if [ "$CONTEXT" = "deploy-preview" ]; then
  echo "Deploy preview triggered for branch: $BRANCH"

  # Fetch the remote info
  git fetch origin "+refs/heads/*:refs/remotes/origin/*"

  # Get the PR target branch from the remote (HEAD of current PR)
  BASE_BRANCH=$(git merge-base origin/$BRANCH origin/main >/dev/null 2>&1 && echo "main")

  # Add more branches if needed
  if [ "$BASE_BRANCH" = "ignore-branch" ]; then
    echo "Skipping deploy preview for PR into $BASE_BRANCH"
    exit 0
  fi
fi

# Continue with deploy
exit 1
