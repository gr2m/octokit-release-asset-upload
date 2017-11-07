# Contribute

Please contribute! Here are some things that would be great:

- Open an issue!
- Open a pull request!
- Say hi! 👋

Please abide by the [code of conduct](CODE_OF_CONDUCT.md).

## Requirements

Node 8 or higher is required: https://nodejs.org/en/

## Local setup

```
git clone https://github.com/gr2m/octokit-release-asset-upload.git
cd octokit-release-asset-upload
npm install
```

## Run tests

```
npm test
```

This command runs

1. Linting using [standard](https://standardjs.com)
2. integration/unit tests using [ava](https://github.com/avajs/ava)

It should end something like `123 passed`, where `123` can change based on current tests.
If the command fails, please [create an issue](https://github.com/gr2m/octokit-release-asset-upload/issues/new), we are more than happy to help you out with become a contributor :)

There is also an end-to-end which runs the CLI to upload [test/end-to-end/test-upload.txt](test/end-to-end/test-upload.txt)
to the given repository url. The repository must have `v1.0.0` release like
https://github.com/octokit-fixture-org/release-asset-upload/releases/tag/v1.0.0.

You have to set two environment variables

- `RELEASE_REPO_URL`: URL to a release on GitHub, e.g. https://github.com/octokit-fixture-org/release-asset-upload
- `RELEASE_REPO_TOKEN`: access token with access to the release’s repository. Create one at https://github.com/settings/tokens/new

Then run the command with

```
test/end-to-end/cli.test.sh
```

## Pull Request reviews

Releases are happening automatically once pull requests are merged into master using [semantic-release](https://github.com/semantic-release/semantic-release). Version numbers and changelogs are calculated based on commit message, see the conventions at [conventionalcommits.org](https://conventionalcommits.org/). If a pull request does not follow the convention use the `Squash & merge` button to adapt the commit message accordingly. Don’t forget to clean up the commit body, too.
