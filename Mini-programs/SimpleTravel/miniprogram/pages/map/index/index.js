//index.js
//获取应用实例
let app = getApp();
let wechat = require("../../../utils/map/wechat");
let amap = require("../../../utils/map/amap");
let markersData = [];
var getLocation = function (that) {
  amap.getRegeo()
    .then(d => {
      console.log(d);
      let { name, desc, latitude, longitude } = d[0];
      let { city } = d[0].regeocodeData.addressComponent;
      that.setData({
        city,
        latitude,
        longitude,
        textData: { name, desc }
      })
    })
    .catch(e => {
      console.log(e);
    })
}
Page({
  data: {
   markers: [],
    latitude: '',
    longitude: '',
    textData: {},
    city: '',
    markerId: 0,
    controls: [
      {
        id: 0,
        position: {
          left: 10,
          top: 200,
          width: 40,
          height: 40
        }, 
        clickable: true,
        iconPath: "/images/map/circle1.png"
      }
    ]
  },
  onLoad(e) {
   console.log("aaaa")
    wx.getSetting({
      success: (res) => {
        console.log(res.authSetting)
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          console.log("bbb")
          //非初始化进入该页面,且未授权
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
            success: function (res) {
              if (res.cancel) {
                that.setData({
                  isshowCIty: false
                })
                wx.showToast({
                  title: '授权失败',
                  icon: 'success',
                  duration: 1000
                })
              } else if (res.confirm) {
                console.log("cccc")
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用getLocationt的API
                      getLocation(this);
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
          getLocation(this);
        }
        else { //授权后默认加载
          getLocation(this);
        }
      }
    })

  },

  bindInput() {
    let { latitude, longitude, city } = this.data;
    let url = `/pages/map/inputtip/inputtip?city=${city}&lonlat=${longitude},${latitude}`;
    wx.navigateTo({ url });
  },

  makertap(e) {
    // console.log(e);
    let { markerId } = e;
    let { markers } = this.data;
    let marker = markers[markerId];
    // console.log(marker);
    this.showMarkerInfo(marker);
    this.changeMarkerColor(markerId);
  },
  showMarkerInfo(data) {
    let { name, address: desc } = data;
    this.setData({
      textData: { name, desc }
    })
  },
  changeMarkerColor(markerId) {
    let { markers } = this.data;
    markers.forEach((item, index) => {
      item.iconPath = "/images/map/marker.png";
      if (index == markerId) item.iconPath = "/images/map/marker_checked.png";
    })
    this.setData({ markers, markerId });
  },
  getRoute() {
    // 起点
    let { latitude, longitude, markers, markerId, city, textData } = this.data;
    let { name, desc } = textData;
    if (!markers.length) return;
    // 终点
    let { latitude: latitude2, longitude: longitude2 } = markers[markerId];
    let url = `/pages/map/routes/routes?longitude=${longitude}&latitude=${latitude}&longitude2=${longitude2}&latitude2=${latitude2}&city=${city}&name=${name}&desc=${desc}`;
    wx.navigateTo({ url });
  },
 
  clickcontrol(e)  {
   // console.log(e);
    console.log("回到用户当前定位点");
    let { controlId } = e;
    let mpCtx = wx.createMapContext("map");
    mpCtx.moveToLocation();
  },
  mapchange() {
    // console.log("改变视野");
  }
})
