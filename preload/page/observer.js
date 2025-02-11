const dom = require('./dom.js');

const observePagination = function (){
	const observer = new MutationObserver(async mutations => {
		if (mutations.length === 2) {
			observer.disconnect()
			window.dispatchEvent(new CustomEvent('opl:page:nav'))
		}
	})

	const children = dom.pagination.getElement().children;

	[...children].forEach(child => observer.observe(child, {
		attributes: true,
		attributeFilter: ['disabled'],
		childList: true,
		characterData: true
	}))
};

module.exports = {observePagination}
