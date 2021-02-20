module.exports = app => { //module.export导出的是一个函数，接收的参数是app
  const express = require('express')
  const router = express.Router({
    mergeParams: true //导入父级参数到子级配置
  })

  /**
   * 创建分类方法
   */
  router.post('/', async (req, res) => {
    //这里就需要对数据库进行处理
    const model = await req.Model.create(req.body) //增
    res.send(model) //把model发送回给客户端(node.js语法)
  })
  /**
   * 修改分类方法
   */
  router.put('/:id', async (req, res) => {
    //这里就需要对数据库进行处理
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body) //改，通过id去找，找到以后更新
    res.send(model) //把model发送回给客户端(node.js语法)
  })
  /**
   * 删除分类方法
   */
  router.delete('/:id', async (req, res) => {
    //这里就需要对数据库进行处理
    await req.Model.findByIdAndDelete(req.params.id, req.body) //改，通过id去找，找到以后更新
    res.send({
      success: true
    })
  })
  /**
   * 获取分类列表方法
   */
  router.get('/', async (req, res) => {
    //这里就需要对数据库进行处理
    let queryOptions = {}
    if (req.Model.modelName === 'Category') //如果模型是分类的话，加个populate增加关联
      queryOptions.populate = 'parent'
    // const items = await req.Model.find().populate('parent').limit(10) //查，populate关联取出，limit限制为10条
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items) //把model发送回给客户端(node.js语法)
  })
  /**
   * 获取单个分类详情方法
   */
  router.get('/:id', async (req, res) => {
    //这里就需要对数据库进行处理
    const model = await req.Model.findById(req.params.id) //查
    res.send(model) //把model发送回给客户端(node.js语法)
  })
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    //通过inflection插件转换单复数，以及首字母大写
    //中间件，对路由接口先做处理，相当于拦截器
    const modelName = require('inflection').classify(req.params.resource) //转换成类名
    req.Model = require(`../../models/${modelName}`) //给请求对象挂载一个属性Model，在后续就能使用req.Model去访问
    next()
  }, router) //地址路由，接口路由 做成动态参数，实现通用CRUD接口，通用接口最好写个前缀路径
}
