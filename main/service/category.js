const {storage} = require('../storage/storage.js');
const {fetchApi} = require('./fetchApi.js');

async function getCategory() {
	try {
		return await fetchApi('/category/select')
	} catch (e) {
		console.log('Failed to pick a category to start scrape process. ', `${e}`)
	}
}

async function updateCategory() {
	try {
		const {categoryId, cState} = await storage.get(['categoryId', 'cState'])

		await fetchApi('/category/update', {id: categoryId, state: cState})

		console.log(`Category status updated: ${cState}`)
	} catch (e) {
		console.log(`Failed to update category status. `, `${e}`)
	}
}

module.exports = {getCategory, updateCategory}
