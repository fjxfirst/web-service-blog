const getList=(author,keyword)=>{
  return [
    {
      id:1,
      title:'标题1',
      content:'内容1',
      createTime:1546610491112,
      author:'feng'
    },
    {
      id:2,
      title:'标题2',
      content:'内容2',
      createTime:1546610491412,
      author:'si'
    }
  ]
}
const getDetail=(id)=>{
  return {
    id:2,
    title:'标题2',
    content:'内容2',
    createTime:1546610491412,
    author:'si'
  }
}
module.exports={
  getList,
  getDetail
}