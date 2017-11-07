module.exports = request

const r2 = require('r2')

async function request (options) {
  const response = await r2(options).response
  const data = response.status === 204 ? null : await response.json()

  return {
    status: response.status,
    data
  }
}
