#!/bin/bash

npm run build
bin/octokit-release-asset-upload.js --token=$GH_TOKEN https://github.com/$TRAVIS_REPO_SLUG dist/octokit-release-asset-upload.js
