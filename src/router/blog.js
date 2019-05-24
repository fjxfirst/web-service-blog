const {getList, getDetail, newBlog, updateBlog, deletBlog} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resMode')
const handleBlogRouter = (req, res) => {
  const method = req.method
  const path = req.path
  const id = req.query.id || ''
  //获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // const listData = getList(author, keyword)
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })


  }
  //获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    // const detailData = getDetail(id)
    // return new SuccessModel(detailData)
    const result = getDetail(id)
    return result.then(detailData => {
      return new SuccessModel(detailData)
    })
  }
//新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    req.body.author = 'zhangsan'//todo 待删除
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
//更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    const result = updateBlog(id, req.body)
    return result.then(val => {
      return val ? new SuccessModel() : new ErrorModel('更新博客失败')
    })


  }
//删除一篇博客
  if (method === 'POST' && path === '/api/blog/del') {
    req.body.author = 'zhangsan'//todo 待删除
    const result = deletBlog(id,req.body.author)
    return result.then(val => {
      return val ? new SuccessModel() : new ErrorModel('删除博客失败')
    })
  }
}
module.exports = handleBlogRouter