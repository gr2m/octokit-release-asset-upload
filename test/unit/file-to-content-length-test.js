const test = require('ava')

const toContentLength = require('../../lib/file-to-content-length')

test('String', t => {
  t.is(toContentLength('123'), 3)
})

test('Stream', t => {
  try {
    toContentLength(process.stdin)
  } catch (error) {
    t.regex(error.message, /^Invalid options/)
    t.is(error.status, 400)
  }
})

test('length passed', t => {
  t.is(toContentLength(null, 3), 3)
})
