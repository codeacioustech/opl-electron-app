const {contextBridge, ipcRenderer} = require('electron');
const {extension} = require("./preload/bridge/invoke/extension.js");
const {scraper} = require("./preload/bridge/send/scraper.js");
const {scrapePage} = require("./preload/worker/scrapePage.js");
const {onDownload} = require("./preload/bridge/receive/download.js");

contextBridge.exposeInMainWorld('OPL', {
	getId: extension.getId,
	setName: extension.setName,
	getName: extension.getName,
	startScrape: scraper.start,
	stopScrape: scraper.stop,
	skipScrape: scraper.skip,
})

ipcRenderer.on('digikey.files.download', onDownload)

document.addEventListener('DOMContentLoaded', scrapePage)

window.addEventListener('opl:page:nav', scrapePage)

window.addEventListener('message', (event) => {
	if (event.source === window && event.data && (event.data.scope === 'digikey')) {
		switch (event.data.action) {
			case 'skipScrape':
				scraper.skip()
				break
			case 'stopScrape':
				scraper.stop()
				break
		}
	}
});
