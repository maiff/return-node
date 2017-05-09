let router = require('../lib/MyExpress')()
const sendJson = require('../lib/sendJson')

const get = require('./get')
router.use(sendJson())


router.get((req, res) => {
  // console.log(req.body)
  get().then((obj ) => {
    res.json(obj)
  })
})

module.exports = router