#!/bin/bash

# Prevent deploy if the branch is "ignore-branch"
if [ "$BRANCH" = "ignore-branch" ]; then
  echo "Ignoring deploy for branch: $BRANCH"
  exit 0  # Exit 0 means "ignore deploy"
else
  exit 1  # Exit 1 means "continue with deploy"
fi
