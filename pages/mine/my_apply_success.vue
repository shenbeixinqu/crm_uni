<template>
	<view class="content">
		<!-- 成功 -->
		<view v-if="show==1" class="success-part">
			<image class="success-img" src="https://shop.pangu.mobi/static/mobile/success.jpg" mode="aspectFit"></image>
			<view class="success-text">提现申请已提交，等待管理员处理</view>
			<view class="success-des">{{withdraw_time}}</view>
			<view class="success-des">预计到账时间：{{payment_time}}</view>
			<view class="login-btn" @tap="goBack()">返回</view>
		</view>
		<!-- 失败 -->
		<view v-if="show==2" class="success-part">
			<image class="fail-img" src="https://shop.pangu.mobi/static/mobile/fail.jpg" mode="aspectFit"></image>
			<view class="success-text">提现申请失败，请稍后重试</view>
			<view class="login-btn fail-btn" @tap="goBack()">返回</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: 1,// 1成功 2失败
				payment_time: '',
				withdraw_time: '',
			}
		},
		onLoad(options) {
			this.show = options.show;
			let title = '', backColor = '';
			if(this.show==1) {
				title = '申请成功';
				backColor = '#fb2711';
				// title = '申请失败';
				// backColor = '#474747';
			}else{
				// title = '申请成功';
				// backColor = '#fb2711';
				title = '申请失败';
				backColor = '#474747';
			}
			uni.setNavigationBarTitle({
				title: title
			})
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: backColor,
			})
			let tixianObj = JSON.parse(uni.getStorageSync('tixianObj'));
			this.payment_time = tixianObj.payment_time;
			this.withdraw_time = tixianObj.withdraw_time;
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
		}
	}
</script>

<style scoped>
	.success-part{padding-top: 120rpx;}
	.success-img{width: 227rpx;height: 192rpx;margin: 0 auto;}
	.fail-img{width: 306rpx;height: 229rpx;margin: 0 auto;}
	.success-text{font-size: 32rpx;text-align: center;padding-top: 30rpx;}
	.success-des{font-size: 24rpx;color: #666666;text-align: center;padding-top: 20rpx;}
	.login-btn{width: 460rpx;height: 100rpx;font-size: 34rpx;background-color: #f62f0e;color: #fff;text-align: center;margin: 120rpx auto 0;line-height: 100rpx;border-radius: 50rpx;}
	.fail-btn{background-color: #474747;}
</style>