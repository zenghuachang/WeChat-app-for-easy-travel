/**
 *
 * 配套视频教程请移步微信->小程序->灵动云课堂
 * 关注订阅号【huangxiujie85】，第一时间收到教程推送
 *
 * @link http://blog.it577.net
 * @author 黄秀杰
 */

var Bmob = require('../../../../utils/dietary/bmob.js');
var WxNotificationCenter = require('../../../../utils/dietary/WxNotificationCenter.js');

var that;

Page({
	data: {
		visual: 'hidden'
	},
	onLoad: function (options) {
		that = this;
		if (options.isSwitchAddress) {
			that.setData({
				isSwitchAddress: true
			});
		}
	},
	onShow: function () {
		that.getAddress();	
	},
	add: function () {//新增地址
		wx.navigateTo({
			url: '../add/add'
		});
	},
	getAddress: function () {
		var query = new Bmob.Query('Address');
		query.equalTo('user', Bmob.User.current());
		query.limit(Number.MAX_VALUE);
		query.find().then(function (results) {
			that.setData({
				addressList: results,
				visual: results.length ? 'hidden' : 'show'
			});
		});
	},
	edit: function (e) {  //编辑地址
		var index = e.currentTarget.dataset.index;
		var objectId = that.data.addressList[index].id;
		wx.navigateTo({
			url: '../add/add?objectId=' + objectId
		})
	},
	selectAddress: function (e) {//选择地址
		if (!that.data.isSwitchAddress) {
			return;
		}
		var index = e.currentTarget.dataset.index;
		WxNotificationCenter.postNotificationName("addressSelectedNotification", that.data.addressList[index].id);
		wx.navigateBack();
	}
})