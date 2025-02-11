class DigikeyDom {

	regionButton;
	productTable;
	popupButton;
	pagination;
	currentPage;
	nextPageButton;
	errorPage;
	staticProductCount;
	downloadLink;
	itemLinks;
	cookieBar;

	constructor() {
		this.setupRegionButton()
		this.setupProductTable()
		this.setupPopup()
		this.setupPopupButton()
		this.setupPagination()
		this.setupCurrentPage()
		this.setupNextPageButton()
		this.setupErrorPage()
		this.setupStaticProductCount()
		this.setupDownloadLink()
		this.setupItemLinks()
		this.setupCookieBar()
	}

	setupRegionButton() {
		this.regionButton = new DomElement(`.domain-suggest__flag[onclick*="'com'"]`)
	}

	setupProductTable() {
		this.productTable = new TestElement('data-table-0')
	}

	setupPopup() {
		this.popup = new TestElement('popup-content')
	}

	setupPopupButton() {
		this.popupButton = new TestElement('download-table-popup-trigger-button')
	}

	setupPagination() {
		this.pagination = new TestElement('pagination-container')
	}

	setupCurrentPage() {
		this.currentPage = new TestElement('pagination-container', el => el.querySelector('button:disabled'))
	}

	setupNextPageButton() {
		this.nextPageButton = new TestElement('btn-next-page')
	}

	setupErrorPage() {
		this.errorPage = new TestElement('error-page')
	}

	setupStaticProductCount() {
		this.staticProductCount = new TestElement('static-product-count')
	}

	setupDownloadLink() {
		this.downloadLink = new TestElement('download-table-button')
	}

	setupItemLinks() {
		this.itemLinks = new TestElement('data-table-product-number')
	}

	reloadPage(delay = 1_000) {
		setTimeout(() => window.location.href = `${window.location.href}`, delay)
	}

	setupCookieBar() {
		this.cookieBar = new DomElement('.onetrust-close-btn-handler')
	}
}

class DomElement {
	#selector;
	#callback

	constructor(selector, callback = undefined) {
		this.#selector = selector
		this.#callback = callback
	}

	getElement() {
		const element = this.find(this.#selector)

		return typeof this.#callback === 'function' ? this.#callback(element) : element
	}

	getElements() {
		const elements = this.findAll(this.#selector)

		return typeof this.#callback === 'function' ? elements.map(el => this.#callback(el)) : elements
	}

	find(selector) {
		return document.querySelector(selector)
	}

	findAll(selector) {
		return Array.from(document.querySelectorAll(selector))
	}

	isVisible() {
		return this.getElement() && this.getElement().offsetParent !== null
	}

	click() {
		this.getElement().click()
	}

	getText() {
		return this.getElement().textContent
	}

	getValue() {
		return this.getElement().value
	}
}

class TestElement extends DomElement {
	find(selector) {
		return super.find(`[data-testid="${selector}"]`)
	}

	findAll(selector) {
		return super.findAll(`[data-testid="${selector}"]`)
	}
}

module.exports = new DigikeyDom()
