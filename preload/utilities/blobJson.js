const createBlob = (obj) => new Blob([JSON.stringify(obj)], {type: 'application/json'})

module.exports = {createBlob}
