const queryString=require('querystring')
const handleBlogRouter=require('./src/router/blog')
const handleUserRouter=require('./src/router/user')
const serverHandle=(req,res)=>{
  //设置返回格式JSON
  res.setHeader('Content-type','application/json')
  //获取path
  const url = req.url
  req.path = url.split('?')[0]
  //解析query
  req.query=queryString.parse(url.split('?')[1])
  const blogData=handleBlogRouter(req,res)
  if(blogData){
    res.end(JSON.stringify(blogData))
    return
  }
  const userData=handleUserRouter(req,res)
  if(blogData){
    res.end(JSON.stringify(userData))
    return
  }

  //如果未命中，返回404
  res.writeHead(404,{'Content-type':'text/plain'})
  res.write('404 Not Found\n')
  res.end()
}
module.exports=serverHandle
// process.env.NODE_ENV