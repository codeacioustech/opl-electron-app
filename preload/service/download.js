module.exports = {
	download: async url => fetch(url).then(r => r.blob())
}
