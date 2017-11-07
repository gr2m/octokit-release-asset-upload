const fixtures = require('@octokit/fixtures')
const test = require('ava')

const upload = require('../../')

test('happy path', async t => {
  const mock = fixtures.mock('api.github.com/release-assets')

  const result = await upload({
    owner: 'octokit-fixture-org',
    repo: 'release-assets',
    tag: 'v1.0.0',
    file: 'Hello, world!\n',
    name: 'test-upload.txt',
    label: 'test',
    token: '0000000000000000000000000000000000000001'
  }).catch(mock.explain)

  t.is(result.id, 1)
  t.is(result.name, 'test-upload.txt')
  t.is(result.label, 'test')
})

test('asset conflict', async t => {
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

test('asset conflict with replace', async t => {
  const mock = fixtures.mock('api.github.com/release-assets-conflict')

  const result = await upload({
    owner: 'octokit-fixture-org',
    repo: 'release-assets-conflict',
    tag: 'v1.0.0',
    file: 'Hello, world!\n',
    name: 'test-upload.txt',
    label: 'test',
    token: '0000000000000000000000000000000000000001',
    replace: true
  }).catch(mock.explain)

  t.is(result.id, 1)
  t.is(result.name, 'test-upload.txt')
  t.is(result.label, 'test')
})
