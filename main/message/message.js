const {BrowserWindow} = require('electron')

const messageBrowser = async (task, arguments) => BrowserWindow.getAllWindows()[0]?.webContents.send(task, arguments)

module.exports = {messageBrowser}
