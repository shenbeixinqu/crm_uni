//authorize.js
function login(){
	uni.login({
		success: function(loginRes) {
			if (loginRes.code) {
				uni.getUserInfo({
					success: function(infoRes) {
						var users = JSON.parse(infoRes.rawData)
						uni.setStorageSync('userInfo', users)
						var platUserInfoMap = {}
						platUserInfoMap["encryptedData"] = infoRes.encryptedData;
						platUserInfoMap["iv"] = infoRes.iv;
						uni.request({
							url: 'http://shop.pangu.mobi/api/1.0/wxlogin',
							data: { 
								platCode: loginRes.code,
								platUserInfoMap: platUserInfoMap,
								superior_id:uni.getStorageSync('superior_id')
							},
							header: {
								"Content-Type": "application/json"
							},
							method: 'POST',
							dataType:'json',
							success:(res)=>{
								////console.log(res)
								uni.showToast({title:res.data.msg, icon:"none"})
								uni.setStorageSync("token", res.data.token)
								uni.setStorageSync("user_id", res.data.user_id)
							},
						})
					},
					fail: function() {
						////console.log('获取信息失败')
					}
				});
			} else {
				that.showInfo('登陆失败');
				////console.log('调用wx.login获取code失败');
			}
		}
	})
}

export default {login}