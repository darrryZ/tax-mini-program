// Mini-program app logic

const app = getApp();

App({
    onLaunch: function() {
        console.log('Mini program launched');
    },
    globalData: {
        userInfo: null
    },
    getUserInfo: function(cb) {
        const that = this;
        if (this.globalData.userInfo) {
            typeof cb == 'function' && cb(this.globalData.userInfo);
        } else {
            // Call login API and get user info
            wx.login({
                success: function() {
                    // Code to get user info
                }
            });
        }
    }
});