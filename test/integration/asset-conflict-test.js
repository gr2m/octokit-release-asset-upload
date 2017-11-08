const fixtures = require('@octokit/fixtures')
const test = require('ava')

const upload = require('../../')

test.only('asset conflict', async t => {
  fixtures.mock('api.github.com/release-assets-conflict')

  try {
    await upload({
      owner: 'octokit-fixture-org',
      repo: 'release-assets-conflict',
      tag: 'v1.0.0',
      file: 'Hello, world!\n',
      name: 'test-upload.txt',
      label: 'test',
      token: '0000000000000000000000000000000000000001'
    })
  } catch (error) {
    t.is(error.status, 422)
  }
})
