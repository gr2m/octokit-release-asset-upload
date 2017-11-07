module.exports = octokitReleaseAssetUpload

const deleteAsset = require('./lib/delete-asset')
const getRelease = require('./lib/get-release')
const parse = require('./lib/parse-options')
const uploadAsset = require('./lib/upload-asset')

async function octokitReleaseAssetUpload (input) {
  const options = parse(input)

  const release = await getRelease(options)

  try {
    const upload = await uploadAsset(release, options)
    return Object.assign(upload, {release})
  } catch (error) {
    // GitHub API returns 422 if an asset with the same name was already
    // uploaded to the given release. If the `replace` option is truthy,
    // we try to delete and re-upload the asset
    if (error.status !== 422) {
      throw error
    }
    if (!options.replace) {
      throw error
    }

    await deleteAsset(release, options)
    const upload = await uploadAsset(release, options)
    return Object.assign(upload, {release})
  }
}
