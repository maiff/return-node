const saveRouter = require('../save/index')
const request = require('supertest')
const connect = require('../lib/MyExpress')
const assert = require('assert')

let urlList = ['http://baidu.com','http://maiff.cn']
describe('save', () => {
  it('save success', (done) => {
    let app = connect()
    app.use('/save', saveRouter)
    app.listen(0, function () {
      request(app)
      .post('/save')
      .type('form')
      .send({
        content: JSON.stringify(urlList)
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        // console.log(res.text)
        assert.equal(JSON.parse(res.text).status, 1)
        done()
      })
    })
  })
})