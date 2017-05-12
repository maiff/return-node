const MyExpress = require('./lib/MyExpress')

const path = require('path')

const port = 30002
let app = MyExpress()

const allow = require('./lib/setAllAllow')
app.use(allow())

const save = require('./save')
app.use('/save', save)

const get = require('./get')
app.use('/get', get)

const get = require('./lookup')
app.use('/lookup', get)

app.listen(port, () => {
  console.log(`listen on ${port}`)
})
