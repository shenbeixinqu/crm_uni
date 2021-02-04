<template>
	<view class="content">
		<view class="top-part">
			<view class="head-part">
				<!-- <view class="head-title">盘古分销商城</view> -->
			</view>
		</view>
		<view class="box-part">
			<image src="https://shop.pangu.mobi/static/mobile/login_new_bg.png" class="bg"></image>
			<view class="login-box">
				<view class="login-p1">您尚未登录</view>
				<view class="login-p2">登录后体验更多功能</view>
				
				
				<!-- 在微信小程序里时显示 -->
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="getUserInfo" @getuserinfo="getUserInfo">
					<!-- <image src="https://shop.pangu.mobi/static/mobile/login_new.png" class="login-btn"></image> -->
					<view class="bd-btn d-center">
						<image src="https://shop.pangu.mobi/static/mobile/weixin.png" class="baidulogo"></image>
						<view class="baidutext">微信用户一键登录</view>
					</view>
				</button>
				<!-- #endif -->
				<!-- 在百度小程序里时显示 -->
				<!-- #ifdef MP-BAIDU -->
				<button open-type="getUserInfo" @getuserinfo="baiduGetInfo">
					<!-- <image src="https://shop.pangu.mobi/static/mobile/login_new.png" class="login-btn"></image> -->
					<view class="bd-btn d-center">
						<image src="https://shop.pangu.mobi/static/mobile/baidu.png" class="baidulogo"></image>
						<view class="baidutext">百度用户一键登录</view>
					</view>
				</button>
				<!-- #endif -->
			</view>
		</view>
		<foot-part @openLogin="openLogin"></foot-part>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				path:'',   //path为1:从底部添加线索跳转   为2:从产品页跳转
				proid:'',
				code:''
			}
		},
		onLoad(options){
			this.path=options.path
			this.proid=options.id
			////console.log(this.path)
		},
		methods:{
			// #ifdef MP-WEIXIN
			getUserInfo:function(){
				let that=this;
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
										url: that.$burl+'/wxlogin',
										data: { 
											platCode: loginRes.code,
											platUserInfoMap: platUserInfoMap,
											superior_id:uni.getStorageSync('superior_id'),
											type:'1'
										},
										header: {
											"Content-Type": "application/json"
										},
										method: 'POST',
										dataType:'json',
										success:(res)=>{
											that.login=true
											uni.showToast({title:res.data.msg, icon:"none"})
											uni.setStorageSync("token", res.data.token)
											uni.setStorageSync("user_id", res.data.user_id)
											uni.setStorageSync("status", res.data.status)
											uni.setStorageSync("type", "1")
											////console.log('status---'+uni.getStorageSync("status"))
											if(that.path==2){
												uni.navigateBack()
											}else if(that.path==1){
												uni.redirectTo({
												    url: '../index/index'
												});
											}else{
												uni.redirectTo({
												    url: '../index/index'
												});
											}
										},
									})
								},
								fail: function() {
									//('获取信息失败')
								}
							});
						} else {
							that.showInfo('登陆失败');
							////console.log('调用wx.login获取code失败');
						}
					}
				})
			},
			// #endif
			// #ifdef MP-BAIDU
			baiduGetInfo(e){
				let that=this
				let users=e.detail.userInfo
				uni.setStorageSync('userInfo', users)
				var platUserInfoMap = {}
				platUserInfoMap["encryptedData"] = e.detail.encryptedData;
				platUserInfoMap["iv"] = e.detail.iv;
				uni.login({
					success:function(res){
						if(res.code){
							uni.request({
								url: that.$burl+'/wxlogin',
								data: { 
									platCode: res.code,
									platUserInfoMap: platUserInfoMap,
									superior_id:uni.getStorageSync('superior_id'),
									type:'2'
								},
								header: {
									"Content-Type": "application/json"
								},
								method: 'POST',
								dataType:'json',
								success:(res)=>{
									////console.log(res)
									that.login=true
									uni.showToast({title:res.data.msg, icon:"none"})
									uni.setStorageSync("token", res.data.token)
									uni.setStorageSync("user_id", res.data.user_id)
									uni.setStorageSync("status", res.data.status)
									uni.setStorageSync("type", '2')
									that.nickname=uni.getStorageSync("userInfo").nickName
									that.headpic=uni.getStorageSync("userInfo").avatarUrl
									if(that.path==2){
										uni.navigateBack()
									}
									if(that.path==1){
										uni.redirectTo({
										    url: '../index/index'
										});
									}else{
										uni.redirectTo({
										    url: '../index/index'
										});
									}
								},
							})
						}
					},
					fail(err) {
						uni.showToast({title:'登陆失败', icon:"none"})
					}
				})
			},
			// #endif
		}
	}
</script>

<style>
	.d-left{display: flex;justify-content:left;align-items:center;}
	.d-center{display: flex;justify-content: center;align-items: center;}
	.d-between{display: flex; justify-content: space-between;align-items:center;}
	.top-part{width: 100%;height: 327rpx; background: url(../../static/loginBgtop.jpg) no-repeat;background-size: cover;}
	.head-part{height: 110rpx;position: relative;}
	.head-title{font-size: 36rpx;color: #fff;text-align: center;padding-top: 60rpx;}
	.box-part{ position: relative;}
	.bg{ position: absolute; top:0; width:100%; height: 840rpx;}
	.login-box{ width:672rpx; height: 561rpx; background: url(../../static/login_newbg.png) no-repeat;background-size: cover; margin:auto; position: absolute; top:-250rpx; left:5%;}
	.login-p1{ color: #333333; font-size: 35rpx; text-align: center; margin-top:40%;}
	.login-p2{ color: #333333; font-size: 28rpx; text-align: center; margin-top:24rpx;}
	.login-btn{ width:471rpx; height: 91rpx; margin:auto; overflow: none; padding:0;}
	button{ margin-top:20rpx; border:none; width:471rpx; padding:0; background: white;}
	button::after {
	   border: none;
	}
	.bd-btn{ width:471rpx; height: 85rpx; margin:auto; overflow: none; padding:0; background: #fa1c12; border-radius:20rpx;}
	.baidulogo{ width:42rpx; height:35rpx; margin-right:10rpx;}
	.baidutext{ color:white; font-size: 28rpx; margin-top:5rpx;}
</style>
