const save = require('../save/save')
let urlList = ['http://baidu.com','http://maiff.cn']
describe('save', () => {
  it('save success', (done) => {
    save(JSON.stringify(urlList)).then(done,(err) => {
      console.log(err)
    })
  })
})