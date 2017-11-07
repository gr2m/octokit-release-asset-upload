module.exports = toContentType

function toContentType (file, type) {
  if (type) {
    return type
  }

  if (typeof file === 'string') {
    return 'text/plain'
  }

  const error = new Error('Invalid options: type required (could not be derived from options.file)')
  error.status = 400
  error.documentation_url = 'https://github.com/gr2m/octokit-release-asset-upload#errors'
  throw error
}
