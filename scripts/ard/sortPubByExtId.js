/*

	by SWR audio lab

	sorts list of ard-publishers by external-id

*/

// init storage
const Storage = require('../../packages/storage-wrapper')

const storage = new Storage({
	gs: { projectId: process.env.GCP_PROJECT_ID },
	logging: true,
})

const sort = async () => {
	try {
		const input = await storage.load('tmp/ard-publishers.json')
		const publisher = JSON.parse(input)

		publisher.sort((a, b) => {
			return parseInt(a.externalId) - parseInt(b.externalId)
		})

		await storage.save('tmp/ard-publishers-ordered.json', JSON.stringify(publisher))
	} catch (error) {
		console.log(error)
	}
}

sort()
