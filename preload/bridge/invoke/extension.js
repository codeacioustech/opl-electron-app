const {ipcRenderer} = require('electron');

const extension = {
	getId: async () => await ipcRenderer.invoke('digikey.extension.getId'),
	getName: async () => await ipcRenderer.invoke('digikey.extension.getName'),
	setName: async name => await ipcRenderer.invoke('digikey.extension.setName', name),
};

module.exports = {extension}
