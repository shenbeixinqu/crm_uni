<template>
	<view class="content">
		<!-- 修改成功 -->
		<view v-if="show==1" class="success-part">
			<image class="success-img" src="https://shop.pangu.mobi/static/mobile/success.jpg" mode="aspectFit"></image>
			<view class="success-text">{{tipTitle}}</view>
			<view class="login-btn" @tap="goLogin()">重新登录</view>
		</view>
		<!-- 修改失败 -->
		<view v-if="show==2" class="success-part">
			<image class="fail-img" src="https://shop.pangu.mobi/static/mobile/fail.jpg" mode="aspectFit"></image>
			<view class="success-text">{{tipTitle}}</view>
			<view class="login-btn fail-btn" @tap="goIndex()">返回</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: 2,
				tipTitle: '',
			}
		},
		onLoad(options) {
			this.show = options.show;
			this.tipTitle = uni.getStorageSync('infoMsg');
			let title = '', backColor = '';
			if(this.show==1) {
				title = '修改成功';
				backColor = '#fb2711';
			}else{
				title = '修改失败';
				backColor = '#474747';
			}
			uni.setNavigationBarTitle({
				title: title
			})
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: backColor,
			})
		},
		methods: {
			// 跳转登录
			goLogin() {
				uni.redirectTo({
					url: '../login/login'
				});
			},
			// 返回
			goIndex() {
				uni.redirectTo({
					url: './my_index'
				});
			},
		}
	}
</script>

<style scoped>
	.success-part{padding-top: 300rpx;}
	.success-img{width: 227rpx;height: 192rpx;margin: 0 auto;}
	.fail-img{width: 306rpx;height: 229rpx;margin: 0 auto;}
	.success-text{font-size: 32rpx;text-align: center;padding-top: 30rpx;}
	.login-btn{width: 460rpx;height: 100rpx;font-size: 34rpx;background-color: #f62f0e;color: #fff;text-align: center;margin: 40rpx auto 0;line-height: 100rpx;border-radius: 50rpx;}
	.fail-btn{background-color: #474747;}
</style>