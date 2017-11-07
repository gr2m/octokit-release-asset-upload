const test = require('ava')

const parseOptions = require('../../lib/parse-options')

test('without usernme/password or password', t => {
  t.plan(2)

  try {
    parseOptions({
      owner: 'octokit-fixture-org',
      repo: 'release-assets',
      tag: 'v1.0.0',
      file: 'Hello, world!\n',
      name: 'test-upload.txt',
      label: 'test'
    })
  } catch (error) {
    t.is(error.status, 401)
    t.is(error.message, 'Credentials missing')
  }
})

test('username/password', async t => {
  const options = parseOptions({
    owner: 'octokit-fixture-org',
    repo: 'release-assets',
    tag: 'v1.0.0',
    file: 'Hello, world!\n',
    name: 'test-upload.txt',
    label: 'test',
    username: 'foo',
    password: 'bar'
  })

  t.is(options.authorization, 'Basic Zm9vOmJhcg==')
})
