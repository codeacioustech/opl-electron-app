class Storage {

	store

	constructor() {
		this.store = undefined
	}

	async getStore() {
		if (!this.store) {
			const {default: Store} = await import('electron-store')
			this.store = new Store()
		}
		return this.store
	}

	async set(values) {
		const store = await this.getStore()
		store.set(values)
	}

	async get(keys) {
		const store = await this.getStore()

		keys = Array.isArray(keys) ? keys : [keys]

		return Object.fromEntries(keys.map(key => [key, store.get(key, undefined)]))
	}

	async remove(keys) {
		const store = await this.getStore()
		store.delete(keys)
	}

	async clear() {
		const store = await this.getStore();
		store.clear()
	}
}

const storage = new Storage()

module.exports = {storage}
