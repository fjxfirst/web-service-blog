const {getList, getDetail, newBlog, updateBlog, deletBlog} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resMode')
//统一的登录验证函数
const loginCheck=(req)=>{
  if(!req.session.username){
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method
  const path = req.path
  const id = req.query.id || ''

  //获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    if(req.query.isadmin){
      //管理员界面
      const loginCheckResult =loginCheck(req)
      if(loginCheckResult){
        //未登录
        return loginCheckResult
      }
      //强制查询自己的博客
      author=req.session.username
    }
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })


  }

  //获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const result = getDetail(id)
    return result.then(detailData => {
      return new SuccessModel(detailData)
    })
  }

  //新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    const loginCheckResult=loginCheck(req)
    if(loginCheckResult){
      //未登录
      return loginCheckResult
    }
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  //更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    const loginCheckResult=loginCheck(req)
    if(loginCheckResult){
      //未登录
      return loginCheckResult
    }
    const result = updateBlog(id, req.body)
    return result.then(val => {
      return val ? new SuccessModel() : new ErrorModel('更新博客失败')
    })


  }

  //删除一篇博客
  if (method === 'POST' && path === '/api/blog/del') {
    const loginCheckResult=loginCheck(req)
    if(loginCheckResult){
      //未登录
      return loginCheckResult
    }
    const author=req.session.username
    const result = deletBlog(id, author)
    return result.then(val => {
      return val ? new SuccessModel() : new ErrorModel('删除博客失败')
    })
  }
}
module.exports = handleBlogRouter