// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter=require('tcb-router')
const rp = require('request-promise')
const BASE_URL = 'http://musicapi.xiecheng.live'
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({event})
  app.router('playList',async (ctx , next)=>{
    ctx.body = await cloud.database().collection('playList')
                  .skip(event.start)
                  .limit(event.count)
                  .orderBy('createTime', 'desc')
                  .get()
  })

  app.router('musicList',async (ctx,next)=>{
    ctx.body = await rp(BASE_URL+'/playlist/detail?id='+event.playListId)
      .then(res=>{
        return JSON.parse(res)
      })
  })
  app.router("musicUrl" ,async (ctx,next)=>{
    ctx.body = await rp(BASE_URL+`/song/url?id=${event.musicId}`)
          .then(res=>res)
  })
  app.router('lyric',async (ctx , next)=>{
    ctx.body = await rp(BASE_URL+`/lyric?id=${event.musicId}`)
      .then(res => res)
  })
  return app.serve()

}