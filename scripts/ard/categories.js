// load utils
const undici = require('../../packages/undici')()
const createHashedId = require('../../utils/ard/createHashedId')

// init storage
const Storage = require('../../packages/storage-wrapper')
const storage = new Storage({
	gs: { projectId: process.env.GCP_PROJECT_ID },
	logging: true,
})

const ARD_API_URL = 'https://ard-kk-ii.team-wdrmediathek.de/files/mdt_tree.json'
const CORE_PREFIX_GENRE = 'urn:ard:category-genre:'
const CORE_PREFIX_SUBGENRE = 'urn:ard:category-subgenre:'

const crawl = async () => {
	const list = []

	const { json: categories } = await undici(ARD_API_URL)

	const remapItem = (item) => {
		// remap children if available
		const children = item.children ? item.children.map(remapItem) : null

		// set main or sub prefix
		const prefix = item.children ? CORE_PREFIX_GENRE : CORE_PREFIX_SUBGENRE

		// build item
		const category = {
			id: `${prefix}${createHashedId(item.normId)}`,
			externalId: item.normId,
			title: item.vokabelName,
			isAudio: item.audio === 'TRUE',
			isVideo: item.video === 'TRUE',
			children,
		}

		// add to list and tree
		if (!list.find((listItem) => listItem.id === category.id)) list.push({...category, children: undefined})
		return category
	}

	const tree = categories.map(remapItem)

	await storage.save('data/ard/categories.json', JSON.stringify({ tree, list }, null, '\t'))
}

crawl()
