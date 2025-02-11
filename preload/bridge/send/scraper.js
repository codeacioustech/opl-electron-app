const {ipcRenderer} = require('electron');

const scraper = {
	start: () => ipcRenderer.send('digikey.category.start'),
	stop: () => ipcRenderer.send('digikey.category.stop'),
	skip: () => ipcRenderer.send('digikey.category.skip'),
	finished: () => ipcRenderer.send('digikey.category.finished'),
};

module.exports = {scraper}
