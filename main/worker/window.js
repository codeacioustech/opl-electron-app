const path = require('path');
const {BrowserWindow} = require('electron');

let mainWindow = null

const createMainWindow = async () => {
	mainWindow = new BrowserWindow({
		title: 'OPL Scraper Desktop App',
		webPreferences: {
			preload: path.join(path.dirname(path.dirname(__dirname)), 'preload.js'),
			contextIsolation: true,
			nodeIntegration: false,
			sandbox: false,
		},
	});

	mainWindow.maximize()
	mainWindow.webContents.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
	mainWindow.webContents.openDevTools()

	await mainWindow.loadFile('index.html')

	mainWindow.on('closed', async () => {
		const {stopScrape} = require("./scraper.js")

		await stopScrape()

		mainWindow = null
	});

	return mainWindow
}

const getMainWindow = async () => mainWindow || await createMainWindow()

const openUrl = async (url) => {
	const win = await getMainWindow()

	await win.loadURL(url)
}

const closeUrl = async () => {
	const win = await getMainWindow()

	await win.loadFile('index.html')
}

module.exports = {createMainWindow, getMainWindow, openUrl, closeUrl}
