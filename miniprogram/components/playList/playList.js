// components/playList/playList.js
Component({
  /**
   * 组件的属性列表
   */
  // 这是传递过来的一些数据
  properties: {
    playList:Object,
  },
  observers:{
    ['playList.playCount'](val){
      this.setData({
        count: this._tranNumber(val, 2)
      })
    }
  },
  /** 
   * 组件的初始数据
   */
  data: {
    count:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _tranNumber(num, point){
      let numStr = num.toString().split('.')[0]
      if(numStr.length<6){
        return numStr
      } else if (numStr.length>=6 && numStr.length<=8){
        let decimal = numStr.substring(numStr.length-4,numStr.length-4+point)
        return parseFloat(parseInt(num/10000) + '.'+decimal)+'万'
      } else if (numStr.length >= 9){
        let decimal = numStr.substring(numStr.length-8, numStr.length-8+ point)
        return parseFloat(parseInt(num / 10000000) + '.' + decimal) + '亿'
      }
    },
    goToMusicList(){
      wx.navigateTo({
        url: `../../pages/musicList/musicList?playListId=${this.properties.playList.id}`,
      })
      console.log(this.properties.playList.id)
    }
  }
})
