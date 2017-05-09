module.exports = (options) => {
  return (req, res, next) => {
    res.json = (obj) => {
      res.setHeader('Content-Type', 'application/json')
      let json
      if (obj instanceof Error) {
        res.statusCode = 500
        json = JSON.stringify({error: obj.message})
      } else {
        json = obj && JSON.stringify(obj)
      }
      res.end(json)
    }
    next()
  }
}