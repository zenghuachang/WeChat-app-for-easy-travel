var city = require('../../../utils/weather/city.js');
var app = getApp()
Page({
  data: {
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    // tHeight: 0,
    // bHeight: 0,
    cityList: [],

    // 需要显示的城市
    showItems: null,
   // cityObj:[],

    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    city: "",
    hotcityList: [{ cityCode: 110000, city: '北京市' }, { cityCode: 310000, city: '上海市' }, { cityCode: 440100, city: '广州市' }, { cityCode: 440300, city: '深圳市' }, { cityCode: 330100, city: '杭州市' }, { cityCode: 320100, city: '南京市' }, { cityCode: 420100, city: '武汉市' }, { cityCode: 410100, city: '郑州市' }, { cityCode: 120000, city: '天津市' }, { cityCode: 610100, city: '西安市' }, { cityCode: 510100, city: '成都市' }, { cityCode: 500000, city: '重庆市' }]
  },
  onLoad: function () {
    // 生命周期函数--监听页面加载
    var searchLetter = city.searchLetter;
    var cityList = city.cityList();
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp)
    }
    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      cityList: cityList,
      showItems: cityList,
    })

  },
 
  clickLetter: function (e) {
    console.log(e.currentTarget.dataset.letter)
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  //选择城市
  bindCity: function (e) {
   // console.log("bindCity");
    let dataset = e.currentTarget.dataset;
    let city = dataset.city;
    let pages = getCurrentPages()
    console.log(pages);
    let len = pages.length
    let indexPage = pages[len - 2]
    indexPage.setData({ 
      // 是否切换了城市
      cityChanged: true,
      // 需要查询的城市
      searchCity: city,
      })
    wx.navigateBack({})

  },
  //选择热门城市
  bindHotCity: function (e) {
    let dataset = e.currentTarget.dataset;
    let city = dataset.city;
    let pages = getCurrentPages()
    console.log(pages);
    let len = pages.length
    let indexPage = pages[len - 2]
    indexPage.setData({
      // 是否切换了城市
      cityChanged: true,
      // 需要查询的城市
      searchCity: city,
    })
    wx.navigateBack({})
  },
  //点击热门城市回到顶部
  hotCity: function () {
    this.setData({
      scrollTop: 0,
    })
  }
})