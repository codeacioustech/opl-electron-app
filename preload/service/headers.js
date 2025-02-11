const {extension} = require("../bridge/invoke/extension.js");
const {storage} = require("../bridge/invoke/storage.js");

const getHeaders = async () => {
	const extensionId = await extension.getId()
	const {VERSION, userName} = await storage.get(['VERSION', 'userName'])

	return ({
		'Accept': 'application/json',
		'X-Extension-ID': extensionId,
		'X-Extension-Version': VERSION,
		'X-Extension-Name': `${userName}`,
	});
}

module.exports = {getHeaders}
