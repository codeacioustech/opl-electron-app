const {storage} = require("../bridge/invoke/storage.js");
const {api} = require("../../endpoint.js");
const {getHeaders} = require("./headers.js");

const upload = async (blob, ext) => {
	const form = new FormData()

	const {categoryId, cPage, cPageUrl, cItems} = await storage.get(['categoryId', 'cPage', 'cPageUrl', 'cItems'])

	form.append('file', blob, `digikey-${categoryId}-${cPage}.${ext}`)
	form.append('category_id', categoryId)
	form.append('page', cPage)
	form.append('page_url', cPageUrl)
	form.append('item_count', cItems)

	const response = await fetch(`${api}/upload`, {
		method: 'POST',
		headers: await getHeaders(),
		body: form
	})

	if (response.status !== 200) {
		throw new Error(`${response.status} ${response.statusText} - ${response.responseText}`)
	}
}

module.exports = {upload}
