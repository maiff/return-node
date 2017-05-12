const query = require('../query')
const request = require('supertest')
const connect = require('../lib/MyExpress')
const assert = require('assert')


describe('get proxy', () => {
  it('get success', (done) => {
    let app = connect()
    app.use('/get', query)
    app.listen(0, function () {
      request(app)
      .get('/get?q=fuck')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        // console.log(res.text)
        // assert.equal(JSON.parse(res.text).status, 1)
        done()
      })
    })
  })
})