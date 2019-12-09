// components/musicList/musicList.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicList:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    playingId: -1
  },
  pageLifetimes:{
    show() {
      let playingId = parseInt(app.getPlayingMusicId())
      this.setData({
        playingId,
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(e){
      const ds = e.currentTarget.dataset
      const musicid = ds.musicid
      const index = ds.index
      this.setData({
        playingId: musicid
      })
      wx.navigateTo({
        url: `../../pages/player/player?musicId=${musicid}&index=${index}`,
      }) //这可能是一个异步的,应该就是一个异步的
    }
  }
})
