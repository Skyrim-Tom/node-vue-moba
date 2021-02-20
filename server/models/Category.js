const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {type: String},
  parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'} //关联Category模型，集合关联，方便关联查找
})

module.exports = mongoose.model('Category', schema) //实例化这个Category并导出
