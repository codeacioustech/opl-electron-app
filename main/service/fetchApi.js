const {app} = require('electron');
const {api} = require('../../endpoint.js');
const {storage} = require('../storage/storage.js');
const {getExtensionId} = require('../worker/extension.js');

const fetchApi = async (route, body = undefined, headers = {}) => {
	route = route.replace(/^\//, '')

	const method = body === undefined ? 'GET' : 'POST';

	if (body !== undefined) {
		if (body instanceof FormData) {
			delete headers['Content-Type']
		} else {
			body = new URLSearchParams(body)
			headers['Content-Type'] = 'application/x-www-form-urlencoded'
		}
	}

	const {userName} = await storage.get('userName')

	headers = {
		'Accept': 'application/json',
		'X-Extension-ID': await getExtensionId(),
		'X-Extension-Version': app.getVersion(),
		'X-Extension-Name': `${userName}`,
		...headers,
	}

	const response = await fetch(`${api}/${route}`, {method, headers, body})

	if (response.status !== 200) {
		throw new Error(`${response.status} ${response.statusText} - ${response.responseText}`)
	}

	const {data = undefined} = await response.json()

	return data
}

module.exports = {fetchApi}
