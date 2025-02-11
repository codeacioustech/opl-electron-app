const dom = require('../page/dom.js');
const {Page} = require('../page/page.js');
const {updateOverlay} = require('../page/infobar.js');
const {countdown} = require('../page/countdown.js');
const {createBlob} = require("../utilities/blobJson.js");
const {storage} = require("../bridge/invoke/storage.js");
const {upload} = require("../service/upload.js");
const {scraper} = require("../bridge/send/scraper.js");

async function scrapePage() {

	if (window.location.host !== 'www.digikey.com') {
		console.log('Not on Digikey!')
		return
	}

	if (dom.cookieBar.isVisible()) {
		dom.cookieBar.click()
	}

	if (dom.regionButton.isVisible()) {
		dom.regionButton.click()
	}

	const {categoryId: expectedId, cTitle} = await storage.get(['categoryId', 'cTitle'])

	const isError = dom.errorPage.isVisible()
	const hasPopup = dom.popupButton.isVisible()

	if (isError || !hasPopup) {

		const regex = new RegExp(`/${expectedId}$`)

		if (regex.test(window.location.pathname)) {
			await countdown(120, `Skipping '${cTitle}'`)

			await scraper.skip()
		} else {
			await countdown(60, `Resuming '${cTitle}'`)

			await scraper.start()
		}

		return
	}

	const categoryId = Page.getCategoryId()
	const cPage = Page.getCurrentPage()
	const cItems = Page.getTotalProducts()
	const totalPages = Page.getTotalPages()
	const cPageUrl = window.location.href.replace(window.location.origin, '')

	if (!expectedId || categoryId !== expectedId) {
		await countdown(60, `Incorrect category page. <br>Redirecting`)

		await scraper.start()

		return
	}

	await updateOverlay(categoryId, cTitle, cPage, totalPages, cPageUrl)

	await storage.set({cPage, cPageUrl, cItems})

	const rows  = dom.itemLinks.getElements()
	const items = [...rows].map(el => ({product_id: el.getAttribute('data-product-id'), product_url: el.getAttribute('href')}))

	try {
		await upload(createBlob(items), 'json')
	} catch (e) {
		console.log('JSON upload failed: ', e)
	}

	dom.popupButton.click()

	setTimeout(async () => {
		if (dom.popup.isVisible()) {
			dom.downloadLink.click()
		} else {
			await countdown(15, 'Download popup did not open. Reloading page')
			dom.reloadPage(100)
		}
	}, 1_000)
}

module.exports = {scrapePage}
