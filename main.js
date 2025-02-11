const {app, session} = require('electron');
const {register: onInvoke} = require('./main/event/onInvoke.js')
const {register: onMessage} = require('./main/event/onMessage.js');
const {onDownload} = require("./main/event/onDownload.js");
const {storage} = require("./main/storage/storage.js");
const {createMainWindow} = require('./main/worker/window.js');

onInvoke()

onMessage()

app.whenReady().then(async () => {
	try {
		await storage.set({'VERSION': app.getVersion()})

		session.defaultSession.on('will-download', onDownload)

		await createMainWindow()
	} catch (e) {
		console.error('Error during app initialization: ', e)
	}
})

app.on('window-all-closed', () => app.quit())
