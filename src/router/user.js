const {login}=require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resMode')
const handleUserRouter=(req,res)=>{
  const method = req.method
  const path = req.path
  //登录
  if (method === 'POST' && path === '/api/user/login') {
    const {username,password}=req.body
    const result=login(username,password)

    return result.then(data=>{
      return data.username?new SuccessModel('登录成功'):new ErrorModel('登录失败')
    })
  }
}
module.exports=handleUserRouter