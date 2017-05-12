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

const lookup = require('./query')
app.use('/lookup', lookup)

app.listen(port, () => {
  console.log(`listen on ${port}`)
})
