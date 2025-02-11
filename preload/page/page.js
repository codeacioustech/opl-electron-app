const dom = require('./dom.js');
const {observePagination} = require('./observer.js');

const Page = {
	getCategoryId() {
		return +window.location.pathname.split('/').pop()
	},
	getTotalProducts() {
		return +dom.staticProductCount.getText().replace(/\D+/g, '')
	},
	getTotalPages() {
		return Math.ceil(this.getTotalProducts() / 100.0)
	},
	getCurrentPage() {
		return +dom.currentPage.getValue()
	},
	hasNextPage() {
		const cPage = this.getCurrentPage()
		const totalPages = this.getTotalPages()

		return cPage < totalPages && dom.nextPageButton.isVisible()
	},
	navNext() {
		if (this.hasNextPage()) {
			dom.nextPageButton.click()
			observePagination()
		}
		return false
	}
}

module.exports = {Page}
