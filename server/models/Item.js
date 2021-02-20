const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {type: String},
  icon: {type: String}
})

module.exports = mongoose.model('Item', schema) //实例化这个Category并导出
