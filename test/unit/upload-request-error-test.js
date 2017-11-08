const proxyquire = require('proxyquire')
const test = require('ava')

test('upload request connection error', async t => {
  t.plan(1)

  const upload = proxyquire('../../', {
    './lib/parse-options': () => null,
    './lib/get-release': () => null,
    './lib/upload-asset': () => Promise.reject(new Error('Connection Error'))
  })

  try {
    await upload()
  } catch (error) {
    t.is(error.message, 'Connection Error')
  }
})
