'use strict'
const appData = require('../data.json')
// 处理数据
module.exports = {
  before (app) {
    app.get('/api/seller', function (req, res) {
      res.json({
        errno: 0,
        data: appData.seller
      })
    })

    app.get('/api/goods', function (req, res) {
      res.json({
        errno: 0,
        data: appData.goods
      })
    })

    app.get('/api/ratings', function (req, res) {
      res.json({
        errno: 0,
        data: appData.ratings
      })
    })
  }
}
