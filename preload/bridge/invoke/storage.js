const {ipcRenderer} = require('electron');

const storage = {
	set: async (values) => await ipcRenderer.invoke('digikey.storage.set', values),
	get: async (keys) => await ipcRenderer.invoke('digikey.storage.get', keys),
	remove: async (keys) => await ipcRenderer.invoke('digikey.storage.remove', keys),
	clear: async () => await ipcRenderer.invoke('digikey.storage.clear')
};

module.exports = {storage}
