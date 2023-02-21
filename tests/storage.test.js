/* eslint-disable sonarjs/no-duplicate-string */
/*

	by SWR Audio Lab
	tests with mocha and chai

*/

// Add eslint exceptions for chai
/* global describe it */

const { expect } = require('chai')
const Storage = require('../packages/storage')

// init storage
const storage = new Storage({
	gs: {
		projectId: process.env.GCP_PROJECT_ID,
	},
	s3: null,
	logging: false,
})

const exitWithError = (message) => {
	console.error(message)
	process.exit(1)
}

// check required env vars
if (!process.env.TEST_GS_BUCKET) exitWithError('TEST_GS_BUCKET not found')
if (!process.env.TEST_S3_BUCKET) exitWithError('TEST_S3_BUCKET not found')

// static buckets and paths
const DEMO_FILE_CONTENT = { hello: 'world' }
const GS_BUCKET = process.env.TEST_GS_BUCKET
const GS_PATH_A = 'unit-test/utils/file-a.json'
const GS_PATH_B = 'unit-test/utils/file-b.json'
const S3_BUCKET = process.env.TEST_S3_BUCKET
const S3_PATH_A = 'unit-test/utils/file-a.json'
const S3_PATH_B = 'unit-test/utils/file-b.json'
const LOCAL_FILE_PATH = './data/demo-file-for-storage-test.json'

// updateable paths
let GS_URI_A, GS_URI_B, S3_URI_A, S3_URI_B

// Test Strings Package
describe('Test storage.createUri - Create URI from bucket and path', () => {
	it('createUri.gs (A)', async () => {
		GS_URI_A = storage.createUri.gs(GS_BUCKET, GS_PATH_A)
		expect(GS_URI_A).to.be.a('string')
		expect(GS_URI_A).to.equal(`gs://${GS_BUCKET}/${GS_PATH_A}`)
	})
	it('createUri.gs (B)', async () => {
		GS_URI_B = storage.createUri.gs(GS_BUCKET, GS_PATH_B)
		expect(GS_URI_B).to.be.a('string')
		expect(GS_URI_B).to.equal(`gs://${GS_BUCKET}/${GS_PATH_B}`)
	})
	it('createUri.s3 (A)', async () => {
		S3_URI_A = storage.createUri.s3(S3_BUCKET, S3_PATH_A)
		expect(S3_URI_A).to.be.a('string')
		expect(S3_URI_A).to.equal(`s3://${S3_BUCKET}/${S3_PATH_A}`)
	})
	it('createUri.s3 (B)', async () => {
		S3_URI_B = storage.createUri.s3(S3_BUCKET, S3_PATH_B)
		expect(S3_URI_B).to.be.a('string')
		expect(S3_URI_B).to.equal(`s3://${S3_BUCKET}/${S3_PATH_B}`)
	})
})

describe('Test storage.save - Upload/save file to storage', () => {
	const file = Buffer.from(JSON.stringify(DEMO_FILE_CONTENT))

	it('save.gs', async () => {
		// run action
		const saved = await storage.save(GS_URI_A, file)
		const { metadata } = saved

		// check  result
		expect(metadata.bucket).to.equal(GS_BUCKET)
		expect(metadata.name).to.equal(GS_PATH_A)
		expect(metadata.kind).to.equal('storage#object')
		expect(metadata.contentType).to.equal('application/json')
		expect(metadata.crc32c).to.equal('romaxQ==')
	})

	it('save.s3', async () => {
		// DEV TODO
	})

	it('save.local', async () => {
		// run action
		const saved = await storage.save(LOCAL_FILE_PATH, file)

		// check result
		expect(saved).to.equal(undefined)
	})
})

const testFileDownload = (file) => {
	const string = file.toString('utf8')
	const jsonDecoded = JSON.parse(string)

	// check file
	expect(file).to.be.an.instanceOf(Buffer)
	expect(file.length).to.equal(17)

	// check converted file
	expect(string).to.be.a('string')
	expect(jsonDecoded.hello).to.equal('world')
}

describe('Test storage.load - Download file from storage', () => {
	it('load.gs', async () => {
		// load and parse file
		const file = await storage.load(GS_URI_A)
		testFileDownload(file)
	})

	it('load.s3', async () => {
		// DEV TODO
	})

	it('load.local', async () => {
		// load and parse file
		const file = await storage.load(LOCAL_FILE_PATH)
		testFileDownload(file)
	})
})

describe('Test storage.move - Copy file in storage', () => {
	it('move.gs (keepOriginal = true)', async () => {
		// load and parse file
		const file = await storage.move(GS_URI_A, GS_URI_B, true)

		// check  result
		expect(file.bucket.name).to.equal(GS_BUCKET)
		expect(file.name).to.equal(GS_PATH_B)
	})

	it('move.gs (keepOriginal = false)', async () => {
		// load and parse file
		const file = await storage.move(GS_URI_A, GS_URI_B, false)

		// check  result
		expect(file.bucket.name).to.equal(GS_BUCKET)
		expect(file.name).to.equal(GS_PATH_B)
	})

	it('move.s3', async () => {
		// DEV TODO
	})
})

describe('Test storage.delete - Remove file from storage', () => {
	it('delete.gs', async () => {
		// run action
		const deleted = await storage.delete(GS_URI_B)

		// check result
		expect(deleted.statusCode).to.equal(204)
		expect(deleted.request.href).to.include('https://storage.googleapis.com/')
		expect(deleted.request.href).to.include(GS_BUCKET)
		expect(deleted.request.href).to.include(encodeURIComponent(GS_PATH_B))
	})

	it('delete.s3', async () => {
		// DEV TODO
	})

	it('delete.local', async () => {
		// run action
		const deleted = await storage.delete(LOCAL_FILE_PATH)

		// check result
		expect(deleted).to.equal(undefined)
	})
})
