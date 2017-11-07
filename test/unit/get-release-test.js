const proxyquire = require('proxyquire')
const test = require('ava')

test('without tag', async t => {
  t.plan(2)
  const getRelease = proxyquire('../../lib/get-release', {
    './request': async ({url}) => {
      t.is(url, 'https://api.github.com/repos/octokit-fixture-org/release-assets/releases/latest')
      throw new Error('test')
    }
  })

  try {
    await getRelease({
      owner: 'octokit-fixture-org',
      repo: 'release-assets',
      token: '0000000000000000000000000000000000000001'
    })
  } catch (error) {
    t.is(error.message, 'test')
  }
})

test('404', async t => {
  t.plan(1)

  const getRelease = proxyquire('../../lib/get-release', {
    './request': async () => {
      return {
        status: 404,
        data: {
          message: 'Not Found'
        }
      }
    }
  })

  try {
    await getRelease({
      owner: 'octokit-fixture-org',
      repo: 'release-assets',
      token: '0000000000000000000000000000000000000001'
    })
  } catch (error) {
    t.is(error.message, 'Not Found')
  }
})
