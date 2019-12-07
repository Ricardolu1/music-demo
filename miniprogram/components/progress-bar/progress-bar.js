// components/progress-bar/progress-bar.js
let movableAreaWidth = 0
let movableViewWidth = 0
const backgroundAudioManager = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showTime:{
      currentTime:'00:00',
      totalTime:'00:00',
    },
    movavleDis:0,
    progress:0
  },
  lifetimes:{
    ready(){//组件在页面布局完成以后去执行，得在dom渲染完成以后再去获取dom节点的一些信息
      this._getMovavleDis()
      this._bindBGMEvent()
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _getMovavleDis(){
      const query = this.createSelectorQuery()//返回一个对象，通过这个对象可以获取到当前元素的宽度
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      query.exec(rect=>{
        console.log(rect)
        movableAreaWidth = rect[0].width
        movableViewWidth = rect[1].width
        console.log(movableAreaWidth, movableViewWidth)
      })
    },
    _bindBGMEvent(){
      backgroundAudioManager.onPlay(()=>{
        console.log('onPlay')
      }),
      backgroundAudioManager.onStop(()=>{
        console.log('onStop')
      }),
      backgroundAudioManager.onPause(()=>{
        console.log('onPause')
      }),
      backgroundAudioManager.onWaiting(()=>{
        console.log('onWaiting') //监听音频加载中事件。当音频因为数据不足，需要停下来加载时会触发
      }),
      backgroundAudioManager.onCanplay(()=>{
        console.log('onCanplay') //监听的音乐进入到一个可以播放的状态,这是获取时长
        console.log(backgroundAudioManager.duration) //获取到是个概率事件，有时会undefined,但是等一秒好像又能获取到
        if (typeof backgroundAudioManager.duration!=="undefined"){
          this._setTime()
        }else{ //当前音乐的总时长
          setTimeout(()=>{
            this._setTime()
          },1000)
        }
      }),
      backgroundAudioManager.onTimeUpdate(()=>{
        console.log('onTimeUpdate') //监听当前音乐播放的进度，只有小程序在前台执行的时候，才会触发对应的回调函数，如果我在接电话，这样小程序就切换到后台，这是后买你的回调函数不会执行    
        const currentTime = backgroundAudioManager.currentTime
        const duration = backgroundAudioManager.duration
        const currentTimeFmt = this._dateFormat(currentTime)
        this.setData({
          movableDis:(movableAreaWidth-movableViewWidth)*currentTime/duration,
          progress:currentTime / duration *100,
          "showTime.currentTime": `${currentTimeFmt.min}:${currentTimeFmt.sec}`
        })

      }),
      backgroundAudioManager.onPlay(()=>{
        console.log('onPlay')
      }),
      backgroundAudioManager.onEnded(()=>{
        console,log('onEnded') //当我们播放完当前歌曲，是不是需要自动进入下一首歌曲，我们就会用到这个事件
      }),
      backgroundAudioManager.onError((res)=>{
        console.log(res.errMsg) 
        console.log(res.errCode) 
        wx.showToast({
          title: '错误'+res.errCode,
        })
      })
    },
    _setTime(){
      const duration = backgroundAudioManager.duration//是一个以秒为单位的时间
      console.log(duration)
      const durationFmt = this._dateFormat(duration)
      console.log(durationFmt)
      this.setData({
        "showTime.totalTime":`${durationFmt.min}:${durationFmt.sec}`
      })
    },
    //格式化时间
    _dateFormat(sec){
      f
      const min = parseInt(sec/60)
      sec = parseInt(sec % 60)
      return {
        min: this._parse0(min),
        sec: this._parse0(sec)
      }
    },
    //补0
    _parse0(sec){
      return sec<10 ? '0'+sec: sec
    }
  }
})
