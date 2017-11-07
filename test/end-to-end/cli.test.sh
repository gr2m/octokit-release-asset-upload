#!/usr/bin/env bash

if [ -z "$RELEASE_REPO_TOKEN" ]; then
  echo "RELEASE_REPO_TOKEN must be set"
  exit 1
fi

if [ -z "$RELEASE_REPO_URL" ]; then
  echo "RELEASE_REPO_URL must be set to a string like 'https://github.com/octokit-fixture-org/release-asset-upload'"
  exit 1
fi

# test without arguments
echo ""
echo "> bin/octokit-release-asset-upload.js"
OUTPUT="$(bin/octokit-release-asset-upload.js 2>&1)"
EXIT_CODE=$?

if [[ "$OUTPUT" =~ "releaseUrl & filePath are required" ]]; then
  echo "✔︎ Logs error"
else
  echo "✘ Should log error: releaseUrl & filePath are required"
  exit 1
fi

if [ "$EXIT_CODE" != 1 ]; then
  echo "✘ Should exit with Error Code 1"
fi

# test without tag name
echo ""
echo "> bin/octokit-release-asset-upload.js --replace --token=\$RELEASE_REPO_TOKEN $RELEASE_REPO_URL/releases/tag/v1.0.0 ./test/end-to-end/test-upload.txt"
OUTPUT="$(bin/octokit-release-asset-upload.js --replace --token=$RELEASE_REPO_TOKEN $RELEASE_REPO_URL/releases/tag/v1.0.0 ./test/end-to-end/test-upload.txt 2>&1)"
EXIT_CODE=$?

if [[ "$OUTPUT" =~ "uploaded to" ]]; then
  echo "✔︎ $OUTPUT"
else
  echo "✘ Error: $OUTPUT"
  exit 1
fi

if [ "$EXIT_CODE" != 0 ]; then
  echo "✘ Should exit with Error Code 0"
fi

# test with tag name
echo ""
echo "> bin/octokit-release-asset-upload.js --replace --token=$RELEASE_REPO_TOKEN $RELEASE_REPO_URL ./test/end-to-end/test-upload.txt"
OUTPUT="$(bin/octokit-release-asset-upload.js --replace --token=$RELEASE_REPO_TOKEN $RELEASE_REPO_URL ./test/end-to-end/test-upload.txt 2>&1)"
EXIT_CODE=$?

if [[ "$OUTPUT" =~ "uploaded to" ]]; then
  echo "✔︎ $OUTPUT"
else
  echo "✘ Error: $OUTPUT"
  exit 1
fi

if [ "$EXIT_CODE" != 0 ]; then
  echo "✘ Should exit with Error Code 0"
fi

echo ""
