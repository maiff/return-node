let router = require('../lib/MyExpress')()
const getProxy = require('../lib/getProxy')
const query = require('../lib/query')
const sendJson = require('../lib/sendJson')
router.use(query())
router.use(sendJson())
var parseString = require('xml2js').parseString

router.get((req, res) => {
  let q = req.query.q
  // console.log(req.body)
    getProxy({
        query: {
          q: q
        },
        url: 'http://dict.youdao.com/fsearch?q=vue'
      }).then((text) => {
        return new Promise(function(resolve, reject){
          parseString(text, function (err, result) {
            err && reject(err)
            resolve(result)
          });
        })
      }, (err) => {
        console.log(err)
      }).then((obj) => {
        // console.log(obj)
        res.json(obj)
      }, (err) => {
        console.log(err)
      })
})

module.exports = router