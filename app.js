//app.js
App({
    onLaunch: function () {
        var self = this;
        wx.getSystemInfo({
            success: function (res) {
                console.log(res.windowWidth, "页面宽度");
                console.log(res.windowHeight,"页面高度");
                self.globalData.window = {
                    width:res.windowWidth,
                    height:res.windowHeight
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
        })
    },
    globalData: {
        userInfo: null,
        window: {
            width: 0,
            height: 0
        }
    }
})