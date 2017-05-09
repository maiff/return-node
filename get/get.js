const fse = require('fs-extra')

module.exports = function () {
  return fse.readJson('urlList.json')
}