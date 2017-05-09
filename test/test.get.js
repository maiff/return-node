const get = require('../get/get')
let urlList = ['http://baidu.com','http://maiff.cn']
describe('get', () => {
  it('get success', (done) => {
    get().then((obj) => {
      console.log(obj)
      done()  
    },(err) => {
      done(err)
    })
  })
})