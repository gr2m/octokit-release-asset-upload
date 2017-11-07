module.exports = toContentLength

function toContentLength (file, length) {
  if (length) {
    return length
  }

  if (typeof file === 'string') {
    return file.length
  }

  const error = new Error('Invalid options: size required (could not be derived from options.file)')
  error.status = 400
  error.documentation_url = 'https://github.com/gr2m/octokit-release-asset-upload#errors'
  throw error
}
