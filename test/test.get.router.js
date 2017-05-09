const getRouter = require('../get/index')
const request = require('supertest')
const connect = require('../lib/MyExpress')
const assert = require('assert')

let urlList = ['http://baidu.com','http://maiff.cn']
describe('get', () => {
  it('get success', (done) => {
    let app = connect()
    app.use('/get', getRouter)
    app.listen(0, function () {
      request(app)
      .get('/get')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        console.log(res.text)
        // assert.equal(JSON.parse(res.text).status, 1)
        done()
      })
    })
  })
})