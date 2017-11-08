# octokit-release-asset-upload

> Upload files to a GitHub Release from Node and the browser

[![Build Status](https://travis-ci.org/gr2m/octokit-release-asset-upload.svg?branch=master)](https://travis-ci.org/gr2m/octokit-release-asset-upload)
[![Coverage Status](https://coveralls.io/repos/gr2m/octokit-release-asset-upload/badge.svg?branch=master)](https://coveralls.io/github/gr2m/octokit-release-asset-upload?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/gr2m/octokit-release-asset-upload.svg)](https://greenkeeper.io/)

## ⚠️ currently not working in browser

See [#1](https://github.com/gr2m/octokit-release-asset-upload/issues/1) for more information.

## Usage

See [options](#options) below. The `octokitReleaseAssetUpload` method resolves
with [the response from the GitHub API](https://developer.github.com/v3/repos/releases/#upload-a-release-asset)
and an additional `.release` property which is the [release response](https://developer.github.com/v3/repos/releases/#get-a-single-release).

See list of potential [errors](#errors) below.

As Node module

```js
// npm install @gr2m/release-asset-upload
const octokitReleaseAssetUpload = require('@gr2m/release-asset-upload')
const fs = require('fs')

octokitReleaseAssetUpload({
  owner: 'octokit-fixture-org',
  repo: 'release-assets',
  tag: 'v1.0.0',
  username: 'your-username',
  password: 'secret'
  file: fs.createReadStream('example.png'),
  name: 'example.png',
  contentType: 'image/png',
  contentLength: fs.statSync('example.png').size
})
```

In Browser

```html
<input type="file" id="input">
<script src="octokit-release-asset-upload.min.js"></script>
<script>
octokitReleaseAssetUpload({
  owner: 'octokit-fixture-org',
  repo: 'release-assets',
  tag: 'v1.0.0',
  username: 'your-username',
  password: 'secret'
  file: document.getElementById('input').files[0]
})
</script>
```

CLI

```
$ npx octokit-release-asset-upload \
  https://github.com/gr2m/octokit-release-asset-upload/releases/tag/v1.0.0 \
  ./example.png \
  --username="your-username" \
  --password="secret" \
```

## Options

<table>
  <thead>
    <tr>
      <th>
        Option
      </th>
      <th>
        Type
      </th>
      <th>
        Description
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>
        <code>owner</code>
      </th>
      <td>
        String
      </td>
      <td>
        <strong>Required.</strong>
        Name of repository owner (username or organization)
      </td>
    </tr>
    <tr>
      <th>
        <code>repo</code>
      </th>
      <td>
        String
      </td>
      <td>
        <strong>Required.</strong>
        Name of repository
      </td>
    </tr>
    <tr>
      <th>
        <code>username</code>
      </th>
      <td>
        Object
      </td>
      <td>
        Required unless <code>token</code> is set
      </td>
    </tr>
    <tr>
      <th>
        <code>password</code>
      </th>
      <td>
        Object
      </td>
      <td>
        Required unless <code>token</code> is set
      </td>
    </tr>
    <tr>
      <th>
        <code>token</code>
      </th>
      <td>
        Object
      </td>
      <td>
        Required unless <code>username</code> and <code>password</code> are set
      </td>
    </tr>
    <tr>
      <th>
        <code>file</code>
      </th>
      <td>
        File
      </td>
      <td>
        <strong>Required.</strong>
        Node: A file read stream, a String or a Buffer<br><br>
        Browser: a <a href="https://developer.mozilla.org/en-US/docs/Web/API/File">File Object</a>
      </td>
    </tr>
    <tr>
      <th>
        <code>tag</code>
      </th>
      <td>
        String
      </td>
      <td>
        Name of the tag the release is assigned to, e.g. <code>v1.0.0</code>. Defaults to <a href="https://developer.github.com/v3/repos/releases/#get-the-latest-release">latest</a>
      </td>
    </tr>
    <tr>
      <th>
        <code>type</code>
      </th>
      <td>
        String
      </td>
      <td>
        The file <a href="https://www.iana.org/assignments/media-types/media-types.xhtml">media type</a>. Required if <code>file</code> is a Node read stream, a String, or a Buffer. Defaults to mime type of <code>file</code> otherwise.
      </td>
    </tr>
    <tr>
      <th>
        <code>size</code>
      </th>
      <td>
        Number
      </td>
      <td>
        The size of the file in bytes. Required if <code>file</code> is a Node read stream. Defaults to size of <code>file</code> otherwise.
      </td>
    </tr>
    <tr>
      <th>
        <code>name</code>
      </th>
      <td>
        String
      </td>
      <td>
        The file name of the asset. Required if <code>file</code> is a Node read stream, a String, or a Buffer. Defaults to name of <code>file</code> otherwise.
      </td>
    </tr>
    <tr>
      <th>
        <code>label</code>
      </th>
      <td>
        String
      </td>
      <td>
        An alternate short description of the asset. Used in place of the filename on the GitHub release file list UI.
      </td>
    </tr>
    <tr>
      <th>
        <code>replace</code>
      </th>
      <td>
        Boolean
      </td>
      <td>
        When uploading an asset with an existing `name`, the upload will fail with an `already_exists` error. To replace the existing asset instead in that case, set `replace` to `true`. Defaults to `false`.
      </td>
    </tr>
  </tbody>
</table>

## Errors

<table>
  <thead>
    <tr>
      <th>
        Status
      </th>
      <th>
        Message
      </th>
      <th>
        Description
      </th>
    </tr>
  </thead>
  <tr>
    <th>
      <code>400</code>
    </th>
    <td>
      Invalid options
    </td>
    <td>
      See message for more details
    </td>
  </tr>
  <tr>
    <th>
      <code>422</code>
    </th>
    <td>
      Validation Failed
    </td>
    <td>
      An asset with the passed name already exists.
      Run with <code>replace: true</code> to overwrite it.
    </td>
  </tr>
</table>

## Similar solutions

- https://github.com/hypermodules/gh-release-assets – Upload assets to a GitHub release
- https://github.com/remixz/publish-release – Create GitHub releases with assets from CLI
- https://github.com/coderaiser/node-putasset – upload asset to release on github
- https://github.com/juliangruber/gh-release-upload – CLI to upload an asset to the latest GitHub Release.

## Contribute

All contributions are welcome ❤️ See [CONTRIBUTING.md](CONTRIBUTING.md) for more details

## LICENSE

[MIT](LICENSE)
