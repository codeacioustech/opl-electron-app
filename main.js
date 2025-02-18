const {app, session} = require('electron');
const {register: onInvoke} = require('./main/event/onInvoke.js')
const {register: onMessage} = require('./main/event/onMessage.js');
const {onDownload} = require("./main/event/onDownload.js");
const {storage} = require("./main/storage/storage.js");
const {createMainWindow} = require('./main/worker/window.js');
const {checkForUpdates} = require("./main/updates/checker.js");
const path = require("path");

onInvoke()

onMessage()

app.whenReady().then(async () => {
	try {
		// Bug: '*.icns' on Mac (darwin) is not working
		const ico = process.platform === 'win32' ? 'ico' : process.platform === 'darwin' ? 'png' : 'png';
		const iconPath = path.join((__dirname), 'assets', 'scraping.' + ico);

		if (process.platform === 'darwin') app.dock.setIcon(iconPath)

		await storage.set({'VERSION': app.getVersion()})

		session.defaultSession.on('will-download', onDownload)

		const win = await createMainWindow()

		if (process.platform !== 'darwin') win.setIcon(iconPath)
	} catch (e) {
		console.error('Error during app initialization: ', e)
	}
})

app.on('window-all-closed', () => app.quit())

// Check for update every 10 minutes
checkForUpdates().finally(() => setInterval(checkForUpdates, 10 * 60 * 1000))
