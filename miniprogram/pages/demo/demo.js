// pages/demo/demo.js
import regeneratorRuntime from "../../utils/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad(options) {
  //   // wx.cloud.callFunction({
  //   //   name:"login"
  //   // }).then(res=>{
  //   //   console.log(res)
  //   //   this.setData({
  //   //     openId:res.result.openid
  //   //   })
  //   // })

  //   let p1 = new Promise((resolve,reject)=>{
  //     setTimeout(()=>{
  //       console.log("p1")
  //       resolve()
  //     },2000)
  //   })
  //   let p2 = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       console.log("p2")
  //       resolve()
  //     }, 1000)
  //   })
  //   let p3 = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       console.log("p3")
  //       resolve()
  //     }, 3000)
  //   })
    
  //   Promise.all([p1,p2,p3]).then(res=>console.log(res))
  //     // .then(
      //   res=>{
      //     console.log(res)
      //   },
      //   err=>{
      //     console.log("失败")
      //     console.log(err)
      //   }
      // )
    // console.log(this.foo())
    // this.foo()
    
  },
  //  foo(){
  //   console.log("foo")
  //   this.timeout().then(res=>console.log(res))
  //   console.log('woxian')
  // },
  // timeout(){
  //  return new Promise((resolve,reject)=>{
  //     setTimeout(()=>{
  //       console.log(1)
  //       resolve('resolved')
  //     },1000)
  //   })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  getMusicInfo(){
    wx.cloud.callFunction({
      name:"tcbRouter",
      data:{
        $url:'music'
      }
    }).then(
      res=>console.log(res)
    )
  },
  getMovieInfo(){
    wx.cloud.callFunction({
      name: "tcbRouter",
      data: {
        $url: 'movie'
      }
    }).then(
      res => console.log(res)
    )
  },

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})