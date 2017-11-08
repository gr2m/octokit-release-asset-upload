const proxyquire = require('proxyquire')
const test = require('ava')

test('connection error', async t => {
  t.plan(1)

  const getAsset = proxyquire('../../lib/get-asset', {
    './request': () => Promise.resolve({
      status: 401,
      data: {
        message: 'Unauthorized'
      }
    })
  })

  try {
    await getAsset({id: 123}, {})
  } catch (error) {
    t.is(error.message, 'Unauthorized')
  }
})
