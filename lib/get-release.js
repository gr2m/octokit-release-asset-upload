module.exports = getRelease

const request = require('./request')

async function getRelease ({owner, repo, tag, authorization}) {
  const {status, data} = await request({
    method: 'get',
    url: `https://api.github.com/repos/${owner}/${repo}/releases/${tag ? `tags/${tag}` : 'latest'}`,
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: authorization
    }
  })

  if (status !== 200) {
    const error = new Error(data.message)
    Object.assign(error, data)
    error.status = status
    throw error
  }

  return data
}
