#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const url = require('url')

const mime = require('mime')
const minimist = require('minimist')

const upload = require('../')
const pkg = require('../package.json')

const argv = minimist(process.argv.slice(2), {
  string: ['username', 'password', 'token'],
  boolean: 'replace'
})
const [releaseUrl, filePath] = argv._
const usage = `Usage:
  octokit-release-asset-upload releaseUrl filePath [options]

Options:
  -h --help         Show this screen.
  -v --version      Show version.
  --username        GitHub username
  --password        GitHub password
  --token           GitHub access token`

if (argv.h || argv.help) {
  console.log(`octokit-release-asset-upload v${pkg.version}

${usage}`)
  process.exit()
}

if (argv.v || argv.version) {
  console.log(`v${pkg.version}`)
  process.exit()
}

if (!releaseUrl || !filePath) {
  console.error(`Error:
  releaseUrl & filePath are required

${usage}`)
  process.exit(1)
}

if (!argv.token && (!argv.username && !argv.password)) {
  console.error(`Error:
  --token or --username/--password are required

${usage}`)
  process.exit(1)
}

let fileSize
try {
  fileSize = fs.statSync(filePath).size
} catch (error) {
  console.error(`Error: No file found at "${filePath}"`)
  process.exit(1)
}

const fileName = path.basename(filePath)
const fileType = mime.getType(path.extname(fileName))
const [owner, repo,,, tag] = url.parse(releaseUrl).path.substr(1).split('/')

upload({
  owner: owner,
  repo: repo,
  tag: tag,
  // fs.createReadStream causes problems
  // see https://github.com/gr2m/octokit-release-asset-upload/issues/2#issuecomment-342608392
  file: fs.readFileSync(filePath, 'utf8'),
  size: fileSize,
  type: fileType,
  name: fileName,
  token: argv.token,
  replace: argv.replace
})

.then(result => {
  console.log(`${fileName} uploaded to ${releaseUrl}`)
})

.catch(error => {
  console.log(error)
  process.exit(1)
})
