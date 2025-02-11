const {ipcMain} = require('electron');
const {storage} = require('../storage/storage.js');
const {registerExtension} = require('../service/extension.js');
const {getExtensionId} = require("../worker/extension.js");

const register = () => {
	ipcMain.handle('digikey.storage.set', async (e, values) => await storage.set(values))
	ipcMain.handle('digikey.storage.get', async (e, keys) => await storage.get(keys))
	ipcMain.handle('digikey.storage.remove', async (e, keys) => await storage.remove(keys))
	ipcMain.handle('digikey.storage.clear', async () => await storage.clear())

	ipcMain.handle('digikey.extension.getId', async () => await getExtensionId())

	ipcMain.handle('digikey.extension.getName', async () => {
		const {userName} = await storage.get('userName')
		return userName
	})

	ipcMain.handle('digikey.extension.setName', async (e, userName) => {
		await storage.set({userName})
		await registerExtension()
	})
}

module.exports = {register}
