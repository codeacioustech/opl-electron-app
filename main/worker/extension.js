const {storage} = require('../storage/storage.js');

const getExtensionId = async () => {
	const {extensionId} = await storage.get('extensionId')

	if (extensionId) return extensionId

	const extId = crypto.randomUUID()

	await storage.set({extensionId: extId})

	return extId
}

module.exports = {getExtensionId}
