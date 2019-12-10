// pages/player/player.js
let musicList =[]
//正在播放歌曲的index
let nowPlayingIndex = 0
//获取全局唯一的背景音频管理器
const backgroundAudioManager = wx.getBackgroundAudioManager()

const app = getApp() //小程序自带的方法
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl:"",
    isPlaying: false,//true表示播放
    isLyricShow:false, //表示当前歌词是否显示
    lyric:'',
    isSame:false //表示是否点击的是同一首歌曲
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    musicList = wx.getStorageSync("musicList")
    nowPlayingIndex = parseInt(options.index)
    this._loadMusicDetail(options.musicId)
  },

  _loadMusicDetail(musicId){
    if(musicId===app.getPlayingMusicId()){
      this.setData({
        isSame:true,
      })
    }else{
      this.setData({
        isSame: false,
      })
    }
    if(!this.data.isSame){
      backgroundAudioManager.stop()
    }
    let music = musicList[nowPlayingIndex]
    console.log(music)
    wx.setNavigationBarTitle({
      title: music.name,
    })
    this.setData({
      picUrl:music.al.picUrl,
      isPlaying:false
    })
    app.setPlayingMusicId(musicId)
    wx.showLoading({
      title: '歌曲加载中',
    })
    wx.cloud.callFunction({
      name:'music',//哪一个云函数
      data:{ //传给云函数的event哪些数据
        musicId,
        $url:'musicUrl'//router后面设置的字符串
      }
    }).then(res=>{
        console.log(JSON.parse(res.result))
        let result = JSON.parse(res.result)
        if(!this.data.isSame){
          backgroundAudioManager.src=result.data[0].url
          backgroundAudioManager.title = music.name
          backgroundAudioManager.coverImgUrl = music.al.picUrl
          backgroundAudioManager.singer = music.ar[0].name
        }
        this.setData({
          isPlaying:true
        })
        wx.hideLoading()
        //加载歌词
        console.log(musicId)
        wx.cloud.callFunction({
          name:'music',
          data:{
            musicId,
            $url:'lyric'
          }
        }).then(res=>{
          let lyric = '暂无歌词'
          const lrc = JSON.parse(res.result).lrc
          if(lrc){
            lyric = lrc.lyric
          }
          this.setData({
            lyric
          })
        })
      })  

  },
  togglePlaying(){
    if(this.data.isPlaying){
      backgroundAudioManager.pause()
    }else{
      backgroundAudioManager.play()
    }
    this.setData({
      isPlaying:!this.data.isPlaying
    })
  },
  //不管是切换上一首，还是下一首，我都要取到当前歌曲的index，然后加一减一
  onPrev(){
    nowPlayingIndex-=1
    if(nowPlayingIndex<0){
      nowPlayingIndex=musicList.length-1
    }
    this._loadMusicDetail(musicList[nowPlayingIndex].id)

  },
  onNext(){
    nowPlayingIndex+=1
    if (nowPlayingIndex === musicList.length - 1){
      nowPlayingIndex = 0
    }
    this._loadMusicDetail(musicList[nowPlayingIndex].id)
  },
  onChangeLyricShow(){
    this.setData({
      isLyricShow:!this.data.isLyricShow
    })
  },
  timeUpdate(event){
    this.selectComponent('.lyric').update(event.detail.currentTime) //update需要事先在lyric组件中定义好
  },
  onPlay(){
    this.setData({
      isPlaying:true
    })
  },
  onPause(){
    this.setData({
      isPlaying: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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