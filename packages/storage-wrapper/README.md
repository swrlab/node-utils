# SWR Audio Lab / Storage Wrapper

A utility to wrap file access to local, Google Cloud Storage and AWS S3 file storage.

- [SWR Audio Lab / Storage Wrapper](#swr-audio-lab--storage-wrapper)
  - [Install](#install)
  - [Initialization](#initialization)
  - [`createUri` - Convert to URI](#createuri---convert-to-uri)
  - [`createUrl` - Sign a URI for public URL](#createurl---sign-a-uri-for-public-url)
  - [`delete` - Delete a file](#delete---delete-a-file)
  - [`list` - List files by prefix](#list---list-files-by-prefix)
  - [`load` - Download a file](#load---download-a-file)
  - [`move` - Copy or Move a file](#move---copy-or-move-a-file)
  - [`save` - Save a file](#save---save-a-file)

## Install

Add the parent package to your dependencies:

```sh
yarn add @swrlab/utils
```

## Initialization

We like to create one local file in a project that provides this initialized utility:

```js
// load node util
const Storage = require('@swrlab/utils/packages/storage-wrapper')

// load custom keys and storage
const storage = new Storage({
  gs: {
    projectId: 'my-project-id',
  },
  s3: { region: 'eu-west-1' },
  logging: true,
})

// export everything
module.exports = storage
```

The `gs` object is the same, as one can provide to the [Google Cloud Storage utility](https://googleapis.dev/nodejs/storage/latest/index.html). We usually only set the `projectId` explicitly. If needed you can provide more details like `keyFilename` or [set credentials using `GOOGLE_APPLICATION_CREDENTIALS`](https://cloud.google.com/docs/authentication/production#auth-cloud-implicit-nodejs) env.

For AWS the `s3` also provides access to configure the `aws-sdk` library. It has multiple options to load credentials, all documented in [AWS: Configuring the SDK for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/configuring-the-jssdk.html). We sometimes also set the credentials asynchronously using Google Cloud Secret Manager:

```js
const storage = new Storage({
  gs: {
    projectId: 'my-project-id',
  },
  s3: { region: 'eu-west-1' },
  logging: true,
})

secrets.get('radiohub-ingest-aws').then(({ json }) => {
  storage.sdk.s3.config.update(json)
})
```

The `logging` flag controls whether all file actions by this utility should be logged.

## `createUri` - Convert to URI

- `bucket` (required)
- `path` (required)

Create a URI (e.g. `gs://my-bucket/my-file.txt`) from bucket and path names.

Works with Google Cloud Storage (`gs`):

```js
const fileUri = storage.createUri.gs(bucket, name)
// gs://bucket/name
```

And `s3`:

```js
const fileUri = storage.createUri.s3(bucket, name)
// s3://bucket/name
```

## `createUrl` - Sign a URI for public URL

- `uri` (required) - Source URI to use for signing
- `ttl` (required) - Time to live in milliseconds for public link, provide as integer or shortform (e.g. `60e3` for `60000`)
- `logPrefix` (optional) - Prefix for log lines

Use this to sign a URI into a (publicly) accessible URL. Currently only implemented for Google Cloud Storage:

```js
const sourceUrl = await storage.createUrl(fileUri, 60e3)
```

## `delete` - Delete a file

- `uri` (required) - Source URI to delete
- `logPrefix` (optional) - Prefix for log lines

Delete an existing file:

```js
await storage.delete(fileUri)
```

The proper connector is detected using the prefixes (`s3://`, `gs://`, `http[s]://` or local file). Actions against `http[s]://` are rejected.

## `list` - List files by prefix

- `uri` (required) - Source URI prefix to list
- `max` (required) - Rough maximum of elements expected
- `next` (optional) - Next token if available (AWS only)
- `logPrefix` (optional) - Prefix for log lines

List all elements matching a prefix, which can be a folder name or folder + fileprefix.
Google Cloud provides a full list of elements:

```js
const list = await storage.list(fileUriPrefix, 300)
```

AWS also returns a next token if available

```js
const { list, next } = await storage.list(fileUriPrefix, 300)
```

The utility keeps listing more elements until either max is reached or no more items are available. Please note that AWS and GCP provide lists in batches, the maximum of elements might be exceeded.

## `load` - Download a file

- `uri` (required) - Source URI to load
- `logPrefix` (optional) - Prefix for log lines
- `options` (optional) - Prefix for log lines
  - `timeout` (optional) - Timeout for http[s] requests

Download a single file and returns the contents buffer.

```js
const fileBuffer = await storage.list(fileUri)
```

## `move` - Copy or Move a file

- `sourceUri` (required) - Source file URI to copy
- `destinationUri` (required) - Destination URI where to copy the file to
- `keepOriginal` (required) - Boolean whether to keep the source
- `logPrefix` (optional) - Prefix for log lines

Moving provides easy access to copy and move actions between multiple storage types and providers. Switching between copying (non-destructive) and moving (deletes the source) is handled via the `keepOriginal` flag.

There are essentially three ways to move files:

1. `gs` to `gs` - Use the Google Cloud's native Storage option to move or copy a file
2. `s3` to `s3` - Use the AWS method for copying and deleting an object
3. `any` to `any` - This uses the internal methods to `load`, `save` and `delete` the files. Please note that this actually downloads the file (incurring bandwidth), rather than using the cloud provider's native methods for moving data.

## `save` - Save a file

- `uri` (required) - Destination URI to use for saving
- `buffer` (required) - File buffer to save
- `logPrefix` (optional) - Prefix for log lines
- `resumable` (optional) - Set Google Cloud transfer as `resumable`

Provide a URI and file buffer to save a file.

```js
await storage.save(fileUri, myBuffer)
```
