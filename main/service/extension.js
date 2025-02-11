const {fetchApi} = require('./fetchApi.js');

async function registerExtension() {
	try {
		await fetchApi('/extension/register')

		console.log('Extension registered successfully')
	} catch (e) {
		console.log('Failed to register the extension: ', `${e}`)
	}
}

async function updateIp() {
	try {
		await fetchApi('/extension/update')

		console.log('Extension update successfully')
	} catch (e) {
		console.log('Failed to update the extension: ', `${e}`)
	}
}

module.exports = {registerExtension, updateIp}
