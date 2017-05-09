let router = require('../lib/MyExpress')()
const bodyParser = require('body-parser')
const sendJson = require('../lib/sendJson')
const saveUrl = require('./save')

router.use(sendJson())
router.use(bodyParser.urlencoded({ extended: false }))


router.post((req, res) => {
  // console.log(req.body)
  saveUrl(req.body.content).then(() => {
    res.json({
      info: '成功',
      status: 1
    })
  })
})

module.exports = router