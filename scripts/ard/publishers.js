// load utils
const undici = require('../../packages/undici')()

// init storage
const Storage = require('../../packages/storage-wrapper')
const storage = new Storage({
	gs: { projectId: process.env.GCP_PROJECT_ID },
	logging: true,
})

const ARD_API_URL = process.env.ARD_DELIVER_API || 'https://deliver-test.ard.de/organization-service/'
const ARD_API_HEADERS = { Authorization: 'Basic ' + Buffer.from(process.env.ARD_AUTH).toString('base64') }

const crawl = async () => {
	const output = []

	const { json: publishers } = await fetch(API_URL + 'publishers?page=0&size=500', { headers: API_HEADERS })

	for (const publisher of publishers.elements) {
		const { json: publisherInfo } = await fetch(publisher.href, { headers: API_HEADERS })

		const { json: institutionInfo } = await fetch(publisherInfo.institution.href, { headers: API_HEADERS })

		const details = {
			_type: publisherInfo._type,
			id: publisherInfo.id,
			externalId: publisherInfo.externalId,
			title: publisherInfo.title,
			institution: {
				_type: institutionInfo._type,
				id: institutionInfo.id,
				externalId: institutionInfo.externalId,
				title: institutionInfo.title,
				acronym: institutionInfo.acronym,
			},
		}

		output.push(details)
		console.log({ details })
	}

	await storage.save('tmp/ard-publishers.json', JSON.stringify(output))
}

crawl()
