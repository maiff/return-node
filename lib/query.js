const qs = require('qs')

module.exports = (options) => {
  return (req, res, next) => {
    let url = req.url
    let query = qs.parse(url.slice(2))
    req.query = query
    next()
  }
}