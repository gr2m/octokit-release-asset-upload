module.exports = validate

const btoa = require('btoa-lite')

function validate ({owner, repo, tag, file, name, label, username, password, token, type, size, replace}) {
  if (!username && !token) {
    const error = new Error('Credentials missing')
    error.status = 401
    error.documentation_url = 'https://github.com/gr2m/octokit-release-asset-upload#errors'
    throw error
  }

  const authorization = token ? `token ${token}` : `Basic ${btoa(username + ':' + password)}`

  return {
    owner,
    repo,
    authorization,
    tag,
    file,
    name,
    label,
    type,
    size,
    replace
  }
}
