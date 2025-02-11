const {ipcMain} = require('electron');
const {startScrape, stopScrape, finishScrape, skipScrape} = require('../worker/scraper.js');

const register = () => {
	ipcMain.on('digikey.category.start', startScrape)
	ipcMain.on('digikey.category.stop', stopScrape)
	ipcMain.on('digikey.category.skip', skipScrape)
	ipcMain.on('digikey.category.finished', finishScrape)
}

module.exports = {register}
