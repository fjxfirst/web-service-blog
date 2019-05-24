const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resMode')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000)) // 加上一天
  console.log(d.toGMTString())
  return d.toGMTString()
}

const handleUserRouter = (req, res) => {
  const method = req.method
  const path = req.path
  //登录
  if (method === 'GET' && path === '/api/user/login') {//todo 改回POST
    // const {username, password} = req.body
    const {username, password} = req.query
    const result = login(username, password)

    return result.then(data => {
      if (data.username) {
        /*操作cookie,设置username和path,path=/表示cookie要适用于根目录，
        如果没有设置path=/,默认为path=/api/user/login,只有在访问http://localhost:3000/api/user/login时
        或者http://localhost:3000/api/user/login/xxx时cookie才起作用，所以需要设置path=/,
        这样在访问任意http://localhost:3000/xxx...时cookie都会起作用，才能保证登录状态的正确验证*/
        res.setHeader('Set-Cookie', `username=${data.username};path=/;httpOnly;expires=${getCookieExpires()}`)
        return new SuccessModel('登录成功')
      }
      new ErrorModel('登录失败')
      // return data.username ? new SuccessModel('登录成功') : new ErrorModel('登录失败')
    })
  }
}
module.exports = handleUserRouter