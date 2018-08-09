const fs = require('fs')
module.exports = function (urlJson) {
  return new Promise((resolve, reject) => {
    fs.writeFile('./urlList.json', urlJson, function (err) {
      err && reject(err)
      resolve()
    })
  })
}
