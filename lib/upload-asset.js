module.exports = uploadAsset

const urlTemplate = require('url-template')

const request = require('./request')
const toContentType = require('./file-to-content-type')
const toContentLength = require('./file-to-content-length')

async function uploadAsset (release, {owner, repo, name, label, authorization, file, type, size, replace}) {
  const {status, data} = await request({
    method: 'post',
    url: urlTemplate.parse(release.upload_url).expand({name, label}),
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: authorization,
      'Content-Type': toContentType(file, type),
      'Content-Length': toContentLength(file, size)
    },
    body: file
  })

  if (status !== 201) {
    const error = new Error(data.message)
    Object.assign(error, data)
    error.status = status
    throw error
  }

  return data
}
