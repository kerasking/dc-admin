//app.js
const util = require('/utils/util.js');

App({
    onLaunch: function () {
        var self = this;
        wx.getSystemInfo({
            success: function (res) {
                console.log(res.windowWidth, "页面宽度");
                console.log(res.windowHeight, "页面高度");
                self.globalData.window = {
                    width: res.windowWidth,
                    height: res.windowHeight
                };
            }
        });
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            console.log(res.userInfo, "微信用户信息");
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        });
        self.login();

    },
    login: function () {
        var self = this;
        var clientId = "";
        var userType = "1";
        var authorization = "";
        wx.login({
            success: function (res) {
                if (res.code) {
                    console.log(res, "wx.login");
                    clientId = res.code;
                    authorization = "Basic " + util.base64encode(clientId + ":" + userType);
                    wx.request({
                        url: 'https://example/user/login',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded',
                            'Authorization': authorization
                        },
                        method: 'POST',
                        data: {
                            'grant_type': 'password',
                            'username': res.code,
                            'password': 'azar'
                        },
                        success: function (res) {
                            console.log(res.data, "user/login");
                            wx.setStorageSync('token', res.data.access_token);
                            wx.setStorageSync('openid', res.data.openid);
                        }
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            },
            fail: function () {
                console.log("wx.login网络错误");
            }
        });
    },
    mag: {
        apiHost: 'https://example',
        'token': wx.getStorageSync('token'),
        request: function (url, method, data, suc, fail) {
            var me = this;
            wx.request({
                url: me.apiHost + url,
                data: data,
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + wx.getStorageSync('token')
                },
                method: method || 'GET',
                success: function (res) {
                    if (suc) {
                        suc(res);
                    }
                },
                fail: function (res) {
                    if (fail) {
                        fail(res);
                    }
                }
            });
        },
        alert: function (msg) {
            wx.showModal({
                title: '提示',
                content: msg,
                success: function (res) {
                }
            });
        },
        toast: function (msg) {
            wx.showToast({
                title: msg,
                icon: 'success',
                duration: 1000
            });
        },
        loading: function (msg, duration) {
            if (!duration) {
                duration = 2000;
            }
            wx.showToast({
                title: msg,
                icon: 'loading',
                duration: duration
            });
        }
    },
    globalData: {
        userInfo: null,
        window: {
            width: 0,
            height: 0
        }
    }
})