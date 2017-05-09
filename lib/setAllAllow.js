
module.exports = (options) => {
  return (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
  }
}