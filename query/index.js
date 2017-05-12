let router = require('../lib/MyExpress')()
const getProxy = require('../lib/getProxy')
const query = require('../lib/query')

router.use(query())

router.get((req, res) => {
  let q = req.query.q
  // console.log(req.body)
    getProxy({
        query: {
          q: q
        },
        url: 'http://dict.youdao.com/fsearch?q=vue',
        mime: 'application/xml',
        res: res
      })
})

module.exports = router