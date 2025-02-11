const {countdown} = require("../../page/countdown.js");
const {Page} = require("../../page/page.js");
const {download} = require("../../service/download.js");
const {upload} = require("../../service/upload.js");
const {scraper} = require("../send/scraper.js");

const onDownload = async (event, {url}) => {
	let blob

	try {
		blob = await download(url)
	} catch (e) {
		console.error('Error downloading CSV file: ', e)
		return
	}

	try {
		await upload(blob, 'csv')
	} catch (e) {
		console.error('Error uploading CSV file: ', e)
		return
	}

	if (Page.hasNextPage()) {
		await countdown(15, 'Next page')
		Page.navNext()
	} else {
		await countdown(15, 'Next category')
		await scraper.finished()
	}
}

module.exports = {onDownload}
