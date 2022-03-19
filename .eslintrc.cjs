const deepmerge = require('deepmerge').all
const glob = require('require-glob').sync

module.exports = deepmerge(Object.values(glob('eslint/*.cjs')))
