const {dialog} = require('electron');
const {autoUpdater} = require("electron-updater");

let isChecking = false
let isInitialised = false
let isDownloaded = false

const onUpdateAvailable = () => {
	dialog.showMessageBox({
		type: 'info',
		title: 'Update Available',
		message: 'A new update is available. Downloading in the background...',
	})
		.then(() => undefined)
}

const onUpdateReady = () => {
	isDownloaded = true

	dialog.showMessageBox({
		type: 'info',
		title: 'Update Ready',
		message: 'The update has been downloaded. Restart the app to apply it.',
		buttons: ['Restart Now', 'Later']
	})
		.then(({response}) => {
			if (response === 0) {
				autoUpdater.quitAndInstall()
			}
		})
}

const checkForUpdates = async () => {

	if (isChecking) return

	if (isDownloaded) {
		onUpdateReady()
		return
	}

	try {
		isChecking = true
		autoUpdater.autoDownload = true

		if (!isInitialised) {
			isInitialised = true

			autoUpdater.on('update-available', onUpdateAvailable)
			autoUpdater.on('update-downloaded', onUpdateReady)
			autoUpdater.on('error', (e) => console.log('Automatic update error:', e))
		}

		await autoUpdater.checkForUpdatesAndNotify()
	} catch (e) {
		console.log('Automatic update error:', e)
	} finally {
		isChecking = false
	}
}

module.exports = {checkForUpdates}
