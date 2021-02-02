<template>
	<view class="content">
		<view class="top-part">
			<view class="head-part">
				<image class="return-btn" src="https://shop.pangu.mobi/static/mobile/return.png" mode="aspectFit" @tap="goBack()"></image>
				<view class="head-title">{{headTitle}}</view>
			</view>
		</view>
		<!-- 信息面板 -->
		<view class="box-part main">
			<image class="login-img" src="https://shop.pangu.mobi/static/mobile/loginImg.png" mode="aspectFit"></image>
			<!-- 登录 -->
			<view v-if="isShow==1" class="info-part">
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/username.png" mode="aspectFit"></image>
					<input class="row-input" type="text" v-model="account" placeholder="账号名称/手机号" placeholder-class="pla-class"/>
				</view>
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/password.png" mode="aspectFit"></image>
					<input class="row-input" type="password" maxlength="12" v-model="password" placeholder="密码" placeholder-class="pla-class"/>
				</view>
				<view class="bottom-btn" @tap="loginBy()">登录</view>
				<view class="bottom-row">
					<view class="row-des des-left" @tap="changePart(2)">没有账号，我要注册</view>
					<view class="row-des des-right" @tap="changePart(3)">忘记密码</view>
				</view>
			</view>
			<!-- 注册 -->
			<view v-if="isShow==2" class="info-part">
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/username.png" mode="aspectFit"></image>
					<input class="row-input" type="text" v-model="account2" placeholder="请输入8-12位数字字母组合的账号名称" placeholder-class="pla-class"/>
				</view>
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/phone.png" mode="aspectFit"></image>
					<input class="row-input" type="number" maxlength="11" v-model="phone2" placeholder="请输入手机号码" placeholder-class="pla-class"/>
				</view>
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/code.png" mode="aspectFit"></image>
					<input class="row-input" type="text" v-model="code2" placeholder="请输入验证码" placeholder-class="pla-class" style="margin-right:150rpx"/>
					<span class="row-span" @tap="getCode(2)">{{codeName2}}</span>
				</view>
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/password2.png" mode="aspectFit"></image>
					<input class="row-input" type="password" maxlength="12" v-model="password2" placeholder="请输入6-12位数字字母组合的密码" placeholder-class="pla-class"/>
				</view>
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/surepass.png" mode="aspectFit"></image>
					<input class="row-input" type="password" v-model="surepass2" placeholder="请确认密码" placeholder-class="pla-class"/>
				</view>
				<view class="bottom-btn" @tap="register()">注册</view>
				<view class="bottom-row">
					<view class="row-des des-center" @tap="changePart(1)">已有账号，我要登录</view>
				</view>
			</view>
			<!-- 密码找回 -->
			<view v-if="isShow==3" class="info-part">
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/phone.png" mode="aspectFit"></image>
					<input class="row-input" type="number" maxlength="11" v-model="phone3" placeholder="请输入手机号码" placeholder-class="pla-class"/>
				</view>
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/code.png" mode="aspectFit"></image>
					<input class="row-input" type="text" v-model="code3" placeholder="请输入验证码" placeholder-class="pla-class" style="margin-right:150rpx"/>
					<span class="row-span" @tap="getCode(3)">{{codeName3}}</span>
				</view>
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/password2.png" mode="aspectFit"></image>
					<input class="row-input" type="password" maxlength="12" v-model="password3" placeholder="请输入6-12位数字字母组合的密码" placeholder-class="pla-class"/>
				</view>
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/surepass.png" mode="aspectFit"></image>
					<input class="row-input" type="password" v-model="surepass3" placeholder="请确认密码" placeholder-class="pla-class"/>
				</view>
				<view class="bottom-btn" @tap="saveData()">保存</view>
				<view class="bottom-row">
					<view class="row-des des-center" @tap="changePart(1)">我要登录</view>
				</view>
			</view>
		</view>
		<view class="bottom-part">
			<image class="logo-img" src="https://shop.pangu.mobi/static/mobile/logo.png" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headTitle: '登录',
				isShow: 1,//1登录 2注册 3密码找回
				// 登录
				account: '',
				password: '',
				// 注册
				account2: '',
				phone2: '',
				code2: '',
				password2: '',
				surepass2: '',
				codeName2: '获取验证码',
				// 密码找回
				phone3: '',
				code3: '',
				password3: '',
				surepass3: '',
				codeName3: '获取验证码',
			}
		},
		onLoad(options) {
			if(options.isShow) {
				if(options.isShow==1) {
					this.headTitle = '登录'
				}else if(options.isShow==2) {
					this.headTitle = '注册'
				}else{
					this.headTitle = '密码找回'
				}
				this.isShow = options.isShow
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			changePart(num) {
				uni.redirectTo({
					url: '../login/login?isShow='+num
				});
			},
			// 登录
			async loginBy() {
				let that = this;
				if(!that.account) {
					that.showToast('请输入账号名称/手机号');
				}else if(!that.password) {
					that.showToast('请输入密码');
				}else if(that.password&&that.password.length<6) {
					that.showToast('密码不能少于6位');
				}else{
					let param = '?phone_num='+that.account+'&password='+that.password;
					let res = await that.$api.commonMethod('/login'+param,'GET');
					if(res.statusCode==200&&res.data.re_code==0) {
						that.showToast('登录成功');
						uni.setStorageSync('user_id', res.data.data.user_id);
						uni.setStorageSync('user_name', res.data.data.user_name);
						uni.setStorageSync('user_phone', res.data.data.user_phone);
						setTimeout(()=>{
							uni.redirectTo({
								url: '../mine/my_index'
							});
						},2000)
					}else{
						that.showToast(res.data.msg);
					}
				}
			},
			// 获取验证码
			async getCode(num) {
				let that = this;
				let mobilecheck = /^1[13456789]\d{9}$/;
				if((num==2&&!that.phone2)||(num==3&&!that.phone3)) {
					that.showToast('请输入手机号码');
				}else if(num==2&&!mobilecheck.test(that.phone2)||num==3&&!mobilecheck.test(that.phone3)) {
					that.showToast('请输入正确的电话号码');
				}else if((num==2&&that.phone2)||(num==3&&that.phone3)) {
					let name = num==2?that.codeName2:that.codeName3
					if(name=='获取验证码') {
						let phone_num = '', sms_kind = 0;// 0注册  1密码找回
						if(num==2) {// 注册
							phone_num = that.phone2;
							sms_kind = 0;
						}else if(num==3) {// 密码找回
							phone_num = that.phone3;
							sms_kind = 1;
						}
						let param = '?phone_num='+phone_num+'&sms_kind='+sms_kind;
						let res = await that.$api.commonMethod('/smscode'+param,'GET');
						if(res.statusCode==200&&res.data.re_code==0) {
							that.showToast('验证码发送成功');
							let second = 60
							let time = setInterval(()=>{
								second = second - 1
								name = second + 'S'
								if(num==2) {
									that.codeName2 = name
								}else{
									that.codeName3 = name
								}
							},1000)
							setTimeout(()=>{
								clearInterval(time)
								if(num==2) {
									that.codeName2 = '获取验证码'
								}else{
									that.codeName3 = '获取验证码'
								}
							},60000)
						}else{
							that.showToast(res.data.msg);
						}
					}
				}
			},
			// 注册
			async register() {
				let that = this;
				let zmszcheck = /^[A-Za-z0-9]+$/;
				let mobilecheck = /^1[13456789]\d{9}$/;
				if(!that.account2) {
					that.showToast('请输入账号名称');
				}else if(that.account2.length<8||that.account2.length>12) {
					that.showToast('请输入8-12位的账号名称');
				}else if(that.account2&&!zmszcheck.test(that.account2)) {
					that.showToast('账号名称格式不正确');
				}else if(!that.phone2) {
					that.showToast('请输入手机号码');
				}else if(that.phone2&&!mobilecheck.test(that.phone2)) {
					that.showToast('请输入正确的手机号码');
				}else if(!that.code2) {
					that.showToast('请输入验证码');
				}else if(!that.password2) {
					that.showToast('请输入密码');
				}else if(that.password2&&that.password2.length<6) {
					that.showToast('密码不能少于6位');
				}else if(that.password2&&!zmszcheck.test(that.password2)) {
					that.showToast('密码格式不正确');
				}else if(!that.surepass2) {
					that.showToast('请再次输入密码');
				}else if(that.password2!=that.surepass2) {
					that.showToast('两次密码不一致');
				}else{
					let param = '?name='+that.account2+'&phone_num='+that.phone2+'&code='+that.code2+'&pwd='+that.password2+'&re_pwd='+that.surepass2;
					let res = await that.$api.commonMethod('/register'+param,'GET');
					if(res.statusCode==200&&res.data.re_code==0) {
						that.showToast('注册成功，请登录');
						setTimeout(()=>{
							uni.redirectTo({
								url: '../login/login?isShow=1'
							});
						},2000)
					}else{
						that.showToast(res.data.msg);
					}
				}
			},
			// 密码找回
			async saveData() {
				let that = this;
				let zmszcheck = /^[A-Za-z0-9]+$/;
				let mobilecheck = /^1[13456789]\d{9}$/;
				if(!that.phone3) {
					that.showToast('请输入手机号码');
				}else if(that.phone3&&!mobilecheck.test(that.phone3)) {
					that.showToast('请输入正确的电话号码');
				}else if(!that.code3) {
					that.showToast('请输入验证码');
				}else if(!that.password3) {
					that.showToast('请输入密码');
				}else if(that.password3&&that.password3.length<6) {
					that.showToast('密码不能少于6位');
				}else if(that.password3&&!zmszcheck.test(that.password3)) {
					that.showToast('密码格式不正确');
				}else if(!that.surepass3) {
					that.showToast('请再次输入密码');
				}else if(that.password3!=that.surepass3) {
					that.showToast('两次密码不一致');
				}else{
					let param = '?phone_num='+that.phone3+'&code='+that.code3+'&new_pwd='+that.password3+'&re_new_pwd='+that.surepass3;
					let res = await that.$api.commonMethod('/reset_pwd'+param,'GET');
					if(res.statusCode==200&&res.data.re_code==0) {
						that.showToast('密码已重置，请登录');
						setTimeout(()=>{
							uni.redirectTo({
								url: '../login/login?isShow=1'
							});
						},2000)
					}else{
						that.showToast(res.data.msg);
					}
				}
			},
			showToast(title) {
				uni.showToast({
				    title: title,
					icon: 'none'
				});
			},
		}
	}
</script>

<style scoped>
	.top-part{width: 100%;height: 459rpx;background: url(../../static/loginBgtop.jpg) no-repeat;background-size: cover;}
	.head-part{height: 110rpx;position: relative;}
	.return-btn{width: 21rpx;height: 37rpx;margin: 65rpx 0 0 22rpx;position: absolute;}
	.head-title{font-size: 36rpx;color: #fff;text-align: center;padding-top: 60rpx;}
	.box-part{height: 950rpx;border-radius: 20rpx;box-shadow: 0 0 10rpx 1rpx #ffe5eb;position: relative;margin-top: -220rpx;background-color: #fff;}
	.login-img{width: 287rpx;height: 287rpx;position: absolute;left: 0;right: 0;margin: -144rpx auto 0;}
	.info-part{padding-top: 130rpx;}
	.row-item{width: 600rpx;height: 115rpx;margin: 0 auto;border-bottom: 1px solid #dbdbdb;padding-top: 65rpx;}
	.row-img{width: 32rpx;height: 36rpx;float: left;margin-right: 25rpx;margin-top: 5rpx;}
	.pla-class{font-size: 30rpx;color: #c2c2c2;}
	.bottom-btn{width: 600rpx;height: 90rpx;background-color: #f62f0e;color: #fff;font-size: 34rpx;text-align: center;margin: 55rpx auto 0;line-height: 90rpx;border-radius: 45rpx;}
	.bottom-row{position: absolute;bottom: 35rpx;width: 600rpx;margin: 0 auto;left: 0;right: 0;}
	.row-des{font-size: 24rpx;color: #666666;}
	.des-left{float: left;text-decoration: underline;}
	.des-right{float: right;}
	.des-center{text-align: center;text-decoration: underline;}
	.bottom-part{width: 100%;height: 115rpx;background: url(../../static/loginBgbottom.jpg) no-repeat;background-size: cover;margin-top: 30rpx;position: relative;}
	.logo-img{width: 146rpx;height: 42rpx;margin: 30rpx auto 0;position: absolute;left: 0;right: 0;}
	.row-span{font-size: 26rpx;color: #ea1313;float: right;margin-top: -40rpx;}
</style>