const merge = require('deepmerge').all
const modules = require('require-glob').sync(`config/eslint/*.cjs`)
const configs = Object.getOwnPropertyNames(modules).map(name => modules[name])
module.exports = merge(configs)
