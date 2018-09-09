module.exports = getAsset

const request = require('./request')

async function getAsset (release, { owner, repo, authorization, name }) {
  const releaseAssetsUrl = `https://api.github.com/repos/${owner}/${repo}/releases/${release.id}/assets`
  const { status, data } = await request({
    method: 'get',
    url: releaseAssetsUrl,
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

  return data.find(asset => asset.name.toLowerCase() === name.toLowerCase())
}
