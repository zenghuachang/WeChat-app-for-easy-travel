//logs.js
let util = require('../../../utils/map/util.js');
let wechat = require("../../../utils/map/wechat");
let amap = require("../../../utils/map/amap");
Page({
  data: {
    steps: [],
  },
  onLoad() {
    let steps = wx.getStorageSync("steps");
    this.setData({ steps })
  },
});
