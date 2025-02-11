const {messageBrowser} = require('../message/message.js')

const onDownload = async (event, asset) => {
	event.preventDefault()

	await messageBrowser('digikey.files.download', {url: asset.getURL(), filename: asset.getFilename()})
}

module.exports = {onDownload}
