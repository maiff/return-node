const request = require('superagent')

module.exports = (options) => {
  return new Promise((resolve, reject) => {
      request
        .get(options.url)
        .query(options.query)
        .end(function(err, res){
          err && reject(err)
          resolve(res.text)
        })
  })
}