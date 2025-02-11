const {constants} = require('../constants.js');
const {site} = require('../../endpoint.js');
const {getCategory, updateCategory} = require('../service/category.js');
const {updateIp} = require('../service/extension.js');
const {storage} = require('../storage/storage.js');

const startScrape = async () => {
	await updateIp()

	const category = await getCategory()

	if (category) {
		const {id, title, url, last_url} = category

		const link = new URL(last_url ?? url, site)

		link.searchParams.has('s') || link.searchParams.set('s', constants.Page1)

		await storage.set({categoryId: +id, cTitle: title, cState: 'active'})

		const {openUrl} = require('./window.js')

		await openUrl(link.href)
	} else {
		console.log('No category found to process scraping.')

		await storage.remove(['categoryId', 'cTitle', 'cState', 'cPage', 'cPageUrl', 'cItems'])
	}
}

const stopScrape = async () => {
	const {closeUrl} = require('./window.js')

	await closeUrl()

	const {categoryId} = await storage.get('categoryId')

	if (categoryId) {
		await storage.set({cState: 'paused'})

		await updateCategory()
	}

	await storage.remove(['categoryId', 'cTitle', 'cState', 'cPage', 'cPageUrl', 'cItems'])
}

const skipScrape = async () => {
	const {categoryId} = await storage.get('categoryId')

	if (categoryId) {
		await storage.set({cState: 'skipped'})

		await updateCategory()
	}

	await storage.remove(['categoryId', 'cTitle', 'cState', 'cPage', 'cPageUrl', 'cItems'])

	await startScrape()
}

const finishScrape = async () => {
	const {categoryId} = await storage.get(['categoryId'])

	if (categoryId) {
		await storage.set({cState: 'finished'})

		await updateCategory()
	}

	await storage.remove(['categoryId', 'cTitle', 'cState', 'cPage', 'cPageUrl', 'cItems'])

	await startScrape()
}

module.exports = {startScrape, stopScrape, skipScrape, finishScrape}
