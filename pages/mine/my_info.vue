<template>
	<view class="content">
		<view class="top-part">
			<view class="head-part">
				<image class="return-btn" src="https://shop.pangu.mobi/static/mobile/return.png" mode="aspectFit" @tap="goBack()"></image>
				<view class="head-title">{{showTitle}}</view>
			</view>
		</view>
		<!-- 信息面板 -->
		<view class="box-part main">
			<image class="login-img" src="https://shop.pangu.mobi/static/mobile/loginImg.png" mode="aspectFit"></image>
			<!-- 修改密码 -->
			<view v-if="show==1" class="info-part">
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/username.png" mode="aspectFit"></image>
					<input class="row-input" type="text" v-model="account" disabled placeholder="账号名称" placeholder-class="pla-class"/>
				</view>
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/password.png" mode="aspectFit"></image>
					<input class="row-input" type="password" v-model="oldpass" placeholder="请输入旧密码" placeholder-class="pla-class"/>
				</view>
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/password2.png" mode="aspectFit"></image>
					<input class="row-input" type="password" v-model="newpass" placeholder="请输入6-12位数字字母组合的新密码" placeholder-class="pla-class"/>
				</view>
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/surepass.png" mode="aspectFit"></image>
					<input class="row-input" type="password" v-model="surepass" placeholder="请再次输入新密码" placeholder-class="pla-class"/>
				</view>
				<view class="bottom-btn" @tap="savePassword()">确认修改</view>
			</view>
			<!-- 修改绑定号码 -->
			<view v-if="show==2" class="info-part">
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/username.png" mode="aspectFit"></image>
					<input class="row-input" type="text" v-model="account" disabled placeholder="账号名称" placeholder-class="pla-class"/>
				</view>
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/password2.png" mode="aspectFit"></image>
					<input class="row-input" type="password" v-model="password" placeholder="请输入密码" placeholder-class="pla-class"/>
				</view>
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/phone.png" mode="aspectFit"></image>
					<input class="row-input" type="number" v-model="phone" maxlength="11" placeholder="请输入新手机号码" placeholder-class="pla-class"/>
				</view>
				<view class="row-item">
					<image class="row-img" src="https://shop.pangu.mobi/static/mobile/code.png" mode="aspectFit"></image>
					<input class="row-input" type="text" v-model="code" placeholder="请输入验证码" placeholder-class="pla-class" style="margin-right:150rpx"/>
					<span class="row-span" @tap="getCode()">{{codeName}}</span>
				</view>
				<view class="bottom-btn" @tap="savePhone()">确认修改</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_id: '',
				show: 1,// 1修改密码 2修改绑定号码
				showTitle: '修改密码',
				account: '',
				// 修改密码
				oldpass: '',
				newpass: '',
				surepass: '',
				// 修改绑定号码
				password: '',
				phone: '',
				code: '',
				codeName: '获取验证码',
			}
		},
		onLoad(options) {
			// uni.setStorageSync('token','sahgxgahgshx')
			this.user_id = uni.getStorageSync('user_id');
			this.show = options.show;
			this.showTitle = this.show==1?'修改密码':'修改绑定号码';
			this.account = uni.getStorageSync('user_name');
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 修改密码
			async savePassword() {
				let that = this;
				let zmszcheck = /^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]{6,10}$/;
				let mobilecheck = /^1[345678]\d{9}$/;
				if(!that.oldpass) {
					that.showToast('请输入旧密码');
				}else if(!that.newpass) {
					that.showToast('请输入新密码');
				}else if(that.newpass&&that.newpass.length<6) {
					that.showToast('密码不能少于6位');
				}else if(that.newpass&&!zmszcheck.test(that.newpass)) {
					that.showToast('密码格式不正确');
				}else if(!that.surepass) {
					that.showToast('请再次输入新密码');
				}else if(that.newpass!=that.surepass) {
					that.showToast('两次密码不一致');
				}else{
					let msg = '';// 结果提示信息
					let param = '?user_id='+that.user_id+'&old_pwd='+that.oldpass+'&new_pwd='+that.newpass;
					let res = await that.$api.commonMethod('/change_pwd'+param,'GET');
					if(res.statusCode==200&&res.data.re_code==0) {
						uni.clearStorageSync();
						uni.redirectTo({
							url: './my_success?show=1'
						});
						uni.setStorageSync('infoMsg', '密码修改成功');
					}else{
						uni.redirectTo({
							url: './my_success?show=2'
						});
						uni.setStorageSync('infoMsg', res.data.msg);
					}
				}
			},
			// 获取验证码
			async getCode() {
				let that = this;
				let mobilecheck = /^1[345678]\d{9}$/;
				if(!that.phone) {
					that.showToast('请输入手机号码');
				}else if(!mobilecheck.test(that.phone)) {
					that.showToast('请输入正确的电话号码');
				}else{
					if(that.codeName=='获取验证码') {
						let param = '?phone_num='+that.phone+'&sms_kind=2';
						let res = await that.$api.commonMethod('/smscode'+param,'GET');
						if(res.statusCode==200&&res.data.re_code==0) {
							that.showToast('验证码发送成功');
							let second = 60
							let time = setInterval(()=>{
								second = second - 1
								that.codeName = second + 'S'
							},1000)
							setTimeout(()=>{
								clearInterval(time)
								that.codeName = '获取验证码'
							},60000)
						}else{
							that.showToast(res.data.msg);
						}
					}
				}
			},
			// 修改手机号
			async savePhone() {
				let that = this;
				let mobilecheck = /^1[345678]\d{9}$/;
				if(!that.password) {
					that.showToast('请输入密码');
				}else if(that.password&&that.password.length<6) {
					that.showToast('密码不能少于6位');
				}else if(!that.phone) {
					that.showToast('请输入手机号码');
				}else if(that.phone&&!mobilecheck.test(that.phone)) {
					that.showToast('请输入正确的手机号码');
				}else if(!that.code) {
					that.showToast('请输入验证码');
				}else{
					let msg = '';// 结果提示信息
					let param = '?phone_num='+that.phone+'&code='+that.code+'&pwd='+that.password;
					let res = await that.$api.commonMethod('/reset_phone_num'+param,'GET');
					if(res.statusCode==200&&res.data.re_code==0) {
						uni.clearStorageSync();
						uni.redirectTo({
							url: './my_success?show=1'
						});
						uni.setStorageSync('infoMsg', '手机号码修改成功');
					}else{
						uni.redirectTo({
							url: './my_success?show=2'
						});
						uni.setStorageSync('infoMsg', res.data.msg);
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
	.box-part{height: 900rpx;border-radius: 20rpx;box-shadow: 0 0 10rpx 1rpx #ffe5eb;position: relative;margin-top: -220rpx;background-color: #fff;}
	.login-img{width: 287rpx;height: 287rpx;position: absolute;left: 0;right: 0;margin: -144rpx auto 0;}
	.info-part{padding-top: 130rpx;}
	.row-item{width: 600rpx;height: 115rpx;margin: 0 auto;border-bottom: 1px solid #dbdbdb;padding-top: 65rpx;}
	.row-img{width: 32rpx;height: 36rpx;float: left;margin-right: 25rpx;margin-top: 5rpx;}
	.pla-class{font-size: 32rpx;color: #c2c2c2;}
	.bottom-btn{width: 600rpx;height: 90rpx;background-color: #f62f0e;color: #fff;font-size: 34rpx;text-align: center;margin: 165rpx auto 0;line-height: 90rpx;border-radius: 45rpx;}
	.row-span{font-size: 26rpx;color: #ea1313;float: right;margin-top: -40rpx;}
</style>