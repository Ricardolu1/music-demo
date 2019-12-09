// components/lyric/lyric.js
let lyricHeight = 0
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLyricShow:{
      type:Boolean
    },
    lyric:String
  },
  observers:{
    lyric(lyric){
      if (lyric ==='暂无歌词'){
        this.setData({
          lrcList:[
            {
              lrc:lyric,
              time:0
            }
          ],
          nowLyricIndex:lrcList.length
        })
      }else{
        //这个参数lyric的值就是page的data中,lyric变动后的值
        this._parseLyric(lyric)
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    lrcList:[],
    nowLyricIndex:0, //当前选中歌词的索引
    scrollTop:0 //滚动条滚动的高度
  },
  lifetimes:{
    ready(){
      //所有手机的宽度在小程序里面都是750rpx，水平方向分为750份
      wx.getSystemInfo({
        success(res) {
          //求出1rpx的大小
          lyricHeight =  res.screenWidth / 750 * 64
        },
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    update(currentTime){
      let lrcList = this.data.lrcList
      if (lrcList.length===0){ //说明当前没有歌词
        return
      } 
      if (currentTime > lrcList[lrcList.length-1].time){
        if (this.data.nowLyricIndex !== lrcList.length){
          this.setData({
            nowLyricIndex:lrcList.length,
            scrollTop:lrcList.length*lyricHeight 
          })
        }
      }
      for(let i=0; i<lrcList.length; i++){
        if(currentTime <=lrcList[i].time){
          this.setData({
            nowLyricIndex: i-1,//时间小于第三个歌词的话，我选中的应该是第二个歌词，所以是i-1
            scrollTop: (i - 1) * lyricHeight
          })
        break //当前歌词如果已经高亮显示，我就直接break，结束循环
        }
      }
    },
    _parseLyric(sLyric){
      //歌词的字符串是用换行来分隔的
      let line = sLyric.split('\n')
      
      let _lrcList = []
      line.forEach(el=>{
        let time = el.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g)
        if(time!==null){
          let lrc = el.split(time)[1]
          let timeReg = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/)
           //返回的是一个数组
          //把事件转换成秒
          let time2Seconds = parseInt(timeReg[1])*60 + parseInt(timeReg[2])+parseInt(timeReg[3])/1000
          _lrcList.push({
            lrc, //歌词
            time: time2Seconds //歌词对应的以秒为单位的时间
          })
        }
      })
      this.setData({
        lrcList:_lrcList
      })
    }
  }
})
