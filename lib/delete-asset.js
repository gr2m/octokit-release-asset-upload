module.exports = deleteAsset

const getAsset = require('./get-asset')
const request = require('./request')

async function deleteAsset (release, { owner, repo, authorization, name }) {
  const existingAsset = await getAsset(release, { owner, repo, authorization, name })
  const existingAssetUrl = `https://api.github.com/repos/${owner}/${repo}/releases/assets/${existingAsset.id}`

  const { data } = await request({
    method: 'delete',
    url: existingAssetUrl,
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: authorization
    }
  })

  return data
}
