const request = require('superagent')

module.exports = (options) => {
  let res = options.res
  request
    .get(options.url)
    .query(options.query)
    .end(function(err, getRes){
      err && console.log(err)
      // Calling the end function will send the request
      res.setHeader('Content-Type', options.mime || 'text/plain') 
      res.end(getRes.text)
    });
}