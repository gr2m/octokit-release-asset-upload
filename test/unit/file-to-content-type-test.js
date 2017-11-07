const test = require('ava')

const toContentType = require('../../lib/file-to-content-type')

test('String', t => {
  t.is(toContentType('123'), 'text/plain')
})

test('Stream', t => {
  try {
    toContentType(process.stdin)
  } catch (error) {
    t.regex(error.message, /^Invalid options/)
    t.is(error.status, 400)
  }
})

test('type passed', t => {
  t.is(toContentType(null, 'image/png'), 'image/png')
})
