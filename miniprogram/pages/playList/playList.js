// miniprogram/pages/playList/playList.js
const MAX_LIMIT = 15
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgUrls:[
      {
        url: 'http://p1.music.126.net/oeH9rlBAj3UNkhOmfog8Hw==/109951164169407335.jpg',
      },
      {
        url: 'http://p1.music.126.net/xhWAaHI-SIYP8ZMzL9NOqg==/109951164167032995.jpg',
      },
      {
        url: 'http://p1.music.126.net/Yo-FjrJTQ9clkDkuUCTtUg==/109951164169441928.jpg',
      }
    ],
    playList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getPlayList()
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
    this.setData({
      playList:[]
    })
    this._getPlayList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getPlayList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  _getPlayList(){
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        $url:'playList', //这份值就是router后面的那个名称
        start: this.data.playList.length,
        count: MAX_LIMIT
      }
    }).then(res => {
      this.setData({
        playList: this.data.playList.concat(res.result.data)
      })
      wx.stopPullDownRefresh()//当我数据请求成功以后，去停止当前下拉刷新的动作
      wx.hideLoading()
    })
  }
})