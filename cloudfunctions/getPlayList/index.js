// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const rp = require('request-promise')
const URL = 'http://musicapi.xiecheng.live/personalized'
const playListCollection = db.collection('playList')
const MAX_LIMIT = 100
// 云函数入口函数
exports.main = async (event, context) => {
  // const list = await playListCollection.get() || []//这是异步操作取到当前集合里的所有数据，数据库已有的数据
//playList是从服务器端获取到的数据，跟数据库的数据有交集，但是这个新一点
  const countResult = await playListCollection.count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / MAX_LIMIT)  
  const tasks = []
  for(let i=0;i<batchTimes;++i){
    let promise = playListCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get() //
    tasks.push(promise)
  }
  let list ={
    data:[]
  }
  if(tasks.length>0){
      list = (await Promise.all(tasks)).reduce((acc,cur)=>{
        return {
          data: acc.data.concat(cur.data)
        }
    })//tasks是一个数组，里面存的都是promise对象
  }

  const playList = await rp(URL).then((res)=>{
    return JSON.parse(res).result
  })  

  const newData = []//如果playList里面有list里面没有的数据，就放在这里面

  for(let i = 0,len1=playList.length;i<len1;++i){
    //创建一个标志位
    let flag = true //用来判断当前数据是否重复，true表示不重复
    for (let j = 0, len2=list.data.length; j<len2;++j){
      if(playList[i].id === list.data[j].id){
        flag = false
        break //结束循环
      }
    }
    if(flag){
      newData.push(playList[i])
    }
  }

  for (let i = 0; i < newData.length;++i){
    await playListCollection.add({
        data:{
          ...newData[i],
          createTime:db.serverDate(),//获取服务器上的系统时间
        }
      }).then(res=>{
        console.log("插入成功")
      }).catch(err=>{
        console.log(err)
      })
  }  
  return newData.length
}