const handleUserRouter=(req,res)=>{
  const method = req.method
  const path = req.path
  //登录
  if (method === 'post' && path === '/api/user/login') {
    return {
      msg: '这是登录接口'
    }
  }
}
module.exports=handleUserRouter