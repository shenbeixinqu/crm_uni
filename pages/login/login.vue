<template>
	<view class="springboard">	
		<view class="">
		code:{{res}}
		</view>
		<view class="">
			用户信息 {{userInfo}}
		</view>
		<view>
			loading: {{loading}}
		</view>
		<!-- 跳板页面   这个界面主要用来 获取缓存的信息 如果没有缓存的信息则跳转去授权 如果有直接跳转去商城界面-->
	</view>
</template>

<script>
export default {
	data() {
		return {
			src:'',
			result:'',
			option:'',
			res:'',
			userInfo:'',
			token:'',
			openid:'',
			index:0,
			loading: true,
		};
	},
	methods:{
		getpower() {
			
			let url =
				"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wwe6a967e2bfd97adf&redirect_uri=http%3A%2F%2Fd8vxbn.natappfree.cc&response_type=code&scope=snsapi_userinfo#wechat_redirect"		
			window.location.href = url
		},
		sendCode(code){
			// uni.showToast({
			// 	title:code
			// })
			
			uni.request({
				url: 'HTTP://172.18.3.161:8098/api/wxlogin',
				method:'POST',
				data: {
					code: code
				},
				success: (userInfo) => {
					this.userInfo = userInfo.data
					// var token = "asdqwerqweasdafazxasafqwqrasdafgasdafa";
					var token = userInfo.data.token
					// uni.navigateTo({
					// 	// url:'/pages/index/index'
					// 	url:'/pages/mine/my_index'
					// });
					console.log("token1",token)
					if (token){
						this.token = token;
						console.log("token",this.token)
						this.$store
							.dispatch("user/storeToken",this.token)
							.then(() => {
							    uni.navigateTo({
									url:'/pages/index/index'
								});
								this.$store.dispatch("user/getInfo")
							})
							.catch(() => {
								uni.navigateTo({
									url:'/pages/mine/my_index'
								});
							})
						
					}
				}
			});
		},
	},
	onLoad(option) {
			// option.code = "ajsganjgkangaaskgagain"
			this.option = option
			if (option.code == null) {
				this.getpower()
			} else {
				this.res =  option.code
				// uni.showToast({
				// 	title:option.code
				// })
				this.sendCode(option.code)
			}
		},
	created() {
		this.loading = true
	}
		
	}
</script>

<style scoped>
	.springboard{
		height: 99vh;
		position: relative;
		text-align: center;
		background-size: cover;
		// background-image: url('http://zons.oss-cn-shenzhen.aliyuncs.com/upload/20200703/20200703/1593768723d3eb9a9233e52948740d7eb8c3062d14.jpg');
		// background-image: url('http://zons.oss-cn-shenzhen.aliyuncs.com/upload/20200703/20200703/1593768995d3eb9a9233e52948740d7eb8c3062d14.jpg');
	}
	.LoginBtn{
		width: 50%;
		border: 1px solid  #409eff;
		padding:20rpx  ;
		display: inline-block;
		background-color: #409eff ;
		color: #fff;
		border-radius: 10rpx;
	}
</style>