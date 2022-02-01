/*

	SWR audio lab

	exports an ard-publisher list as json file

*/

// load utils
const undici = require('../../packages/undici')()

// init storage
const Storage = require('../../packages/storage-wrapper')

const storage = new Storage({
	gs: { projectId: process.env.GCP_PROJECT_ID },
	logging: true,
})

const ARD_API_URL = process.env.ARD_DELIVER_API || 'https://deliver-test.ard.de/organization-service/'
const ARD_API_HEADERS = { Authorization: `Basic ${Buffer.from(process.env.ARD_AUTH).toString('base64')}` }

const crawl = async () => {
	const output = []

	try {
		const { string: publisherString } = await undici(`${ARD_API_URL}publishers?page=0&size=500`, {
			headers: ARD_API_HEADERS,
		})

		const publishers = JSON.parse(publisherString)

		for await (const publisher of publishers.elements) {
			const { string: publisherInfoString } = await undici(publisher.href, {
				headers: ARD_API_HEADERS,
			})
			const publisherInfo = JSON.parse(publisherInfoString)

			const { string: institutionInfoString } = await undici(publisherInfo.institution.href, {
				headers: ARD_API_HEADERS,
			})
			const institutionInfo = JSON.parse(institutionInfoString)

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
			console.log(details)
		}

		await storage.save('tmp/ard-publishers.json', JSON.stringify(output))
	} catch (error) {
		console.log(error)
	}
}

crawl()
